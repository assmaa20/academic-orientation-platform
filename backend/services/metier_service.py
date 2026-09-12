from collections import Counter
from sqlalchemy.orm import Session

from models.filiere import Filiere


class MetierService:

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
    # Découper une chaîne (séparée par ;)
    # ==========================================================

    def _split(

        self,

        value

    ):

        if not value:

            return []

        return [

            item.strip()

            for item in str(value).split(";")

            if item.strip()

        ]

    # ==========================================================
    # Valeurs uniques d'un champ
    # ==========================================================

    def _unique(

        self,

        filieres,

        field

    ):

        return sorted(

            {

                getattr(

                    filiere,

                    field

                )

                for filiere in filieres

                if getattr(

                    filiere,

                    field

                )

            }

        )

    # ==========================================================
    # Valeurs uniques après découpage
    # ==========================================================

    def _explode_unique(

        self,

        filieres,

        field

    ):

        values = set()

        for filiere in filieres:

            values.update(

                self._split(

                    getattr(

                        filiere,

                        field

                    )

                )

            )

        return sorted(values)

    # ==========================================================
    # Compter les occurrences
    # ==========================================================

    def _counter(

        self,

        filieres,

        field

    ):

        counter = Counter()

        for filiere in filieres:

            counter.update(

                self._split(

                    getattr(

                        filiere,

                        field

                    )

                )

            )

        return counter

    # ==========================================================
    # Toutes les filières d'un métier
    # ==========================================================

    def _filieres_by_job(

        self,

        job_name: str

    ):

        result = []

        for filiere in self._all_filieres():

            jobs = self._split(

                filiere.metiers

            )

            if job_name in jobs:

                result.append(

                    filiere

                )

        return result

    # ==========================================================
    # Liste de tous les métiers
    # ==========================================================

    def get_jobs(self):

        counter = self._counter(

            self._all_filieres(),

            "metiers"

        )

        jobs = []

        for job, total in sorted(

            counter.items(),

            key=lambda x: (-x[1], x[0])

        ):

            jobs.append(

                {

                    "id": job,

                    "name": job,

                    "programs": total

                }

            )

        return jobs

    # ==========================================================
    # Vérifier si un métier existe
    # ==========================================================

    def job_exists(

        self,

        job_name: str

    ):

        return len(

            self._filieres_by_job(

                job_name

            )

        ) > 0

    # ==========================================================
    # Détails d'un métier
    # ==========================================================

    def get_job(

        self,

        job_name: str

    ):

        filieres = self._filieres_by_job(

            job_name

        )

        if not filieres:

            return None

        universities = self._unique(

            filieres,

            "code_universite"

        )

        disciplines = self._unique(

            filieres,

            "discipline"

        )

        languages = self._unique(

            filieres,

            "langue"

        )

        degrees = self._unique(

            filieres,

            "libelle_diplome"

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

                    "university": filiere.code_universite,

                    "session": filiere.session,

                    "year": filiere.annee

                }

            )

        return {

            "id": job_name,

            "name": job_name,

            "programs_count": len(filieres),

            "universities_count": len(universities),

            "disciplines_count": len(disciplines),

            "languages_count": len(languages),

            "degrees_count": len(degrees),

            "universities": universities,

            "disciplines": disciplines,

            "languages": languages,

            "degrees": degrees,

            "programs": programs

        }

    # ==========================================================
    # Statistiques d'un métier
    # ==========================================================

    def get_statistics(

        self,

        job_name: str

    ):

        filieres = self._filieres_by_job(

            job_name

        )

        if not filieres:

            return None

        universities = self._unique(

            filieres,

            "code_universite"

        )

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

            "universities": len(universities),

            "disciplines": len(disciplines),

            "degrees": len(degrees),

            "languages": len(languages),

            "subjects": len(subjects),

            "competencies": len(competencies),

            "further_studies": len(studies),

            "bac_series": len(bac_series),

            "presentiel": sum(

                1

                for filiere in filieres

                if str(filiere.presentiel).strip().upper()

                in ["OUI", "YES", "TRUE", "1"]

            ),

            "distance": sum(

                1

                for filiere in filieres

                if str(filiere.distance).strip().upper()

                in ["OUI", "YES", "TRUE", "1"]

            ),

            "alternance": sum(

                1

                for filiere in filieres

                if str(filiere.alternance).strip().upper()

                in ["OUI", "YES", "TRUE", "1"]

            )

        }

    # ==========================================================
    # Filières d'un métier
    # ==========================================================

    def get_programs(

        self,

        job_name: str

    ):

        filieres = self._filieres_by_job(

            job_name

        )

        if not filieres:

            return []

        programs = []

        for filiere in filieres:

            programs.append(

                {

                    "id": filiere.id,

                    "code_universite": filiere.code_universite,

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

                    "marche_travail": filiere.marche_travail,

                    "metiers": filiere.metiers,

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

                program["code_universite"],

                program["discipline"] or "",

                program["diplome"] or "",

                program["code_filiere"] or ""

            )

        )

        return programs

    # ==========================================================
    # Universités proposant ce métier
    # ==========================================================

    def get_universities(

        self,

        job_name: str

    ):

        filieres = self._filieres_by_job(

            job_name

        )

        if not filieres:

            return []

        universities = {}

        for filiere in filieres:

            code = filiere.code_universite

            if code not in universities:

                universities[code] = {

                    "code": code,

                    "programs": 0

                }

            universities[code]["programs"] += 1

        return sorted(

            universities.values(),

            key=lambda university: (

                -university["programs"],

                university["code"]

            )

        )

    # ==========================================================
    # Langues d'enseignement
    # ==========================================================

    def get_languages(

        self,

        job_name: str

    ):

        filieres = self._filieres_by_job(

            job_name

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


    # ==========================================================
    # Disciplines
    # ==========================================================

    def get_disciplines(

        self,

        job_name: str

    ):

        filieres = self._filieres_by_job(

            job_name

        )

        if not filieres:

            return []

        counter = Counter(

            filiere.discipline

            for filiere in filieres

            if filiere.discipline

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