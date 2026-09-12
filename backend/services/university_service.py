from collections import Counter
from collections import defaultdict

from sqlalchemy.orm import Session

from models.filiere import Filiere


class UniversityService:

    def __init__(
        self,
        db: Session
    ):
        self.db = db

    # ==========================================================
    # Toutes les filières
    # ==========================================================

    def _all_filieres(self):

        return (
            self.db
            .query(Filiere)
            .all()
        )

    # ==========================================================
    # Filières d'une université
    # ==========================================================

    def _filieres_by_university(
        self,
        university_id: int
    ):

        return (
            self.db
            .query(Filiere)
            .filter(
                Filiere.code_universite == university_id
            )
            .all()
        )

    # ==========================================================
    # Regroupement par université
    # ==========================================================

    def _group_by_university(self):

        groups = defaultdict(list)

        for filiere in self._all_filieres():

            groups[
                filiere.code_universite
            ].append(filiere)

        return groups

    # ==========================================================
    # Découpage des listes
    # ==========================================================

    def _split(self, value):

        if not value:
            return []

        separators = [
            ";",
            ",",
            "|",
            "/",
            "\n"
        ]

        values = [str(value)]

        for separator in separators:

            temp = []

            for item in values:

                temp.extend(
                    item.split(separator)
                )

            values = temp

        return [

            item.strip()

            for item in values

            if item.strip()

        ]

    # ==========================================================
    # Valeurs uniques
    # ==========================================================

    def _unique(
        self,
        filieres,
        attribute
    ):

        values = set()

        for filiere in filieres:

            value = getattr(
                filiere,
                attribute,
                None
            )

            if value:

                values.add(
                    str(value).strip()
                )

        return sorted(values)

    # ==========================================================
    # Valeurs uniques éclatées
    # ==========================================================

    def _explode_unique(
        self,
        filieres,
        attribute
    ):

        values = set()

        for filiere in filieres:

            value = getattr(
                filiere,
                attribute,
                None
            )

            values.update(
                self._split(value)
            )

        return sorted(values)

    # ==========================================================
    # Comptage des valeurs
    # ==========================================================

    def _counter(
        self,
        filieres,
        attribute
    ):

        counter = Counter()

        for filiere in filieres:

            value = getattr(
                filiere,
                attribute,
                None
            )

            for item in self._split(value):

                counter[item] += 1

        return counter

    # ==========================================================
    # Liste des universités
    # ==========================================================

    def get_universities(self):

        groups = self._group_by_university()

        universities = []

        for university_id, filieres in groups.items():

            disciplines = self._unique(
                filieres,
                "discipline"
            )

            degrees = self._unique(
                filieres,
                "libelle_diplome"
            )

            languages = self._unique(
                filieres,
                "langue"
            )

            universities.append(

                {

                    "id": university_id,

                    "code": university_id,

                    "programs": len(filieres),

                    "disciplines": len(disciplines),

                    "degrees": len(degrees),

                    "languages": languages

                }

            )

        universities.sort(

            key=lambda university: university["code"]

        )

        return universities

    # ==========================================================
    # Vérifier si une université existe
    # ==========================================================

    def university_exists(

        self,

        university_id: int

    ):

        return (

            self.db

            .query(Filiere)

            .filter(

                Filiere.code_universite == university_id

            )

            .first()

            is not None

        )

    # ==========================================================
    # Détails d'une université
    # ==========================================================

    def get_university(

        self,

        university_id: int

    ):

        filieres = self._filieres_by_university(

            university_id

        )

        if not filieres:

            return None

        disciplines = self._unique(

            filieres,

            "discipline"

        )

        degrees = self._unique(

            filieres,

            "libelle_diplome"

        )

        languages = self._unique(

            filieres,

            "langue"

        )

        programs = []

        for filiere in filieres:

            programs.append(

                {

                    "id": filiere.id,

                    "code_filiere": filiere.code_filiere,

                    "diploma": filiere.libelle_diplome,

                    "discipline": filiere.discipline,

                    "language": filiere.langue,

                    "session": filiere.session,

                    "year": filiere.annee

                }

            )

        return {

            "id": university_id,

            "code": university_id,

            "programs_count": len(filieres),

            "disciplines_count": len(disciplines),

            "degrees_count": len(degrees),

            "languages_count": len(languages),

            "disciplines": disciplines,

            "degrees": degrees,

            "languages": languages,

            "programs": programs

        }

    # ==========================================================
    # Statistiques d'une université
    # ==========================================================

    def get_statistics(

        self,

        university_id: int

    ):

        filieres = self._filieres_by_university(

            university_id

        )

        if not filieres:

            return None

        disciplines = self._unique(

            filieres,

            "discipline"

        )

        degrees = self._unique(

            filieres,

            "libelle_diplome"

        )

        languages = self._unique(

            filieres,

            "langue"

        )

        jobs = self._explode_unique(

            filieres,

            "metiers"

        )

        subjects = self._explode_unique(

            filieres,

            "matieres"

        )

        competencies = self._explode_unique(

            filieres,

            "competences"

        )

        studies = self._explode_unique(

            filieres,

            "poursuite_etudes"

        )

        bac_series = self._explode_unique(

            filieres,

            "series_bac"

        )

        return {

            "programs": len(filieres),

            "disciplines": len(disciplines),

            "degrees": len(degrees),

            "languages": len(languages),

            "jobs": len(jobs),

            "subjects": len(subjects),

            "competencies": len(competencies),

            "further_studies": len(studies),

            "bac_series": len(bac_series),

            "presentiel": sum(

                1

                for f in filieres

                if str(f.presentiel).strip().upper()

                in ["OUI", "YES", "TRUE", "1"]

            ),

            "distance": sum(

                1

                for f in filieres

                if str(f.distance).strip().upper()

                in ["OUI", "YES", "TRUE", "1"]

            ),

            "alternance": sum(

                1

                for f in filieres

                if str(f.alternance).strip().upper()

                in ["OUI", "YES", "TRUE", "1"]

            )

        }

    # ==========================================================
    # Toutes les filières d'une université
    # ==========================================================

    def get_programs(

        self,

        university_id: int

    ):

        filieres = self._filieres_by_university(

            university_id

        )

        if not filieres:

            return []

        programs = []

        for filiere in filieres:

            programs.append(

                {

                    "id": filiere.id,

                    "code_filiere": filiere.code_filiere,

                    "code_diplome": filiere.code_diplome,

                    "diplome": filiere.libelle_diplome,

                    "discipline": filiere.discipline,

                    "langue": filiere.langue,

                    "session": filiere.session,

                    "annee": filiere.annee,

                    "description": filiere.description,

                    "competences": filiere.competences,

                    "connaissances": filiere.connaissances,

                    "matieres": filiere.matieres,

                    "metiers": filiere.metiers,

                    "marche_travail": filiere.marche_travail,

                    "poursuite_etudes": filiere.poursuite_etudes,

                    "series_bac": filiere.series_bac,

                    "acces_dossier": filiere.acces_dossier,

                    "acces_concours": filiere.acces_concours,

                    "acces_autre": filiere.acces_autre,

                    "acces_autres_annees": filiere.acces_autres_annees,

                    "presentiel": filiere.presentiel,

                    "distance": filiere.distance,

                    "alternance": filiere.alternance

                }

            )

        programs.sort(

            key=lambda program: (

                program["discipline"] or "",

                program["diplome"] or "",

                program["code_filiere"] or ""

            )

        )

        return programs
    
    # ==========================================================
    # Disciplines d'une université
    # ==========================================================

    def get_disciplines(

        self,

        university_id: int

    ):

        filieres = self._filieres_by_university(

            university_id

        )

        if not filieres:

            return []

        counter = self._counter(

            filieres,

            "discipline"

        )

        disciplines = []

        for discipline, total in sorted(

            counter.items(),

            key=lambda x: (-x[1], x[0])

        ):

            disciplines.append(

                {

                    "name": discipline,

                    "programs": total

                }

            )

        return disciplines

    # ==========================================================
    # Métiers d'une université
    # ==========================================================

    def get_jobs(

        self,

        university_id: int

    ):

        filieres = self._filieres_by_university(

            university_id

        )

        if not filieres:

            return []

        counter = self._counter(

            filieres,

            "metiers"

        )

        jobs = []

        for job, total in sorted(

            counter.items(),

            key=lambda x: (-x[1], x[0])

        ):

            jobs.append(

                {

                    "name": job,

                    "programs": total

                }

            )

        return jobs

    # ==========================================================
    # Langues d'enseignement
    # ==========================================================

    def get_languages(

        self,

        university_id: int

    ):

        filieres = self._filieres_by_university(

            university_id

        )

        if not filieres:

            return []

        counter = self._counter(

            filieres,

            "langue"

        )

        languages = []

        for language, total in sorted(

            counter.items(),

            key=lambda x: (-x[1], x[0])

        ):

            languages.append(

                {

                    "language": language,

                    "programs": total

                }

            )

        return languages