from sqlalchemy.orm import Session
from sqlalchemy import func

from models.filiere import Filiere


# ==========================================================
# Universités marocaines
# ==========================================================

UNIVERSITIES = {

    3: {

        "nom": "Université Mohammed V",

        "ville": "Rabat"

    },

    4: {

        "nom": "Université Hassan II",

        "ville": "Casablanca"

    },

    6: {

        "nom": "Université Cadi Ayyad",

        "ville": "Marrakech"

    },

    7: {

        "nom": "Université Ibn Zohr",

        "ville": "Agadir"

    },

    8: {

        "nom": "Université Sidi Mohamed Ben Abdellah",

        "ville": "Fès"

    },

    9: {

        "nom": "Université Abdelmalek Essaâdi",

        "ville": "Tétouan"

    },

    10: {

        "nom": "Université Moulay Ismaïl",

        "ville": "Meknès"

    },

    11: {

        "nom": "Université Chouaïb Doukkali",

        "ville": "El Jadida"

    },

    12: {

        "nom": "Université Sultan Moulay Slimane",

        "ville": "Béni Mellal"

    },

    13: {

        "nom": "Université Mohammed Premier",

        "ville": "Oujda"

    },

    14: {

        "nom": "Université Ibn Tofail",

        "ville": "Kénitra"

    },

    15: {

        "nom": "Université Al Akhawayn",

        "ville": "Ifrane"

    },

    555: {

        "nom": "Université privée",

        "ville": "Maroc"

    }

}


# ==========================================================
# Service
# ==========================================================

class UniversityService:

    def __init__(

        self,

        db: Session

    ):

        self.db = db


    # ======================================================
    # Requête de base
    # ======================================================

    def _query(

        self,

        university_id

    ):

        return (

            self.db

            .query(Filiere)

            .filter(

                Filiere.code_universite == university_id

            )

        )


    # ======================================================
    # Toutes les universités
    # ======================================================

    def get_universities(

        self

    ):

        universities = []

        codes = (

            self.db

            .query(

                Filiere.code_universite

            )

            .distinct()

            .all()

        )

        for row in codes:

            code = row[0]

            query = self._query(code)

            filieres = query.all()

            if not filieres:

                continue

            info = UNIVERSITIES.get(

                code,

                {

                    "nom": f"Université {code}",

                    "ville": "Inconnue"

                }

            )

            disciplines = {

                f.discipline

                for f in filieres

                if f.discipline

            }

            languages = {

                f.langue

                for f in filieres

                if f.langue

            }

            universities.append(

                {

                    "id": code,

                    "nom": info["nom"],

                    "ville": info["ville"],

                    "programs": len(filieres),

                    "disciplines": len(

                        disciplines

                    ),

                    "languages": ", ".join(

                        sorted(

                            languages

                        )

                    )

                }

            )

        universities.sort(

            key=lambda u: u["nom"]

        )

        return universities


    # ======================================================
    # Une université
    # ======================================================

    def get_university(

        self,

        university_id

    ):

        filieres = self._query(

            university_id

        ).all()

        if not filieres:

            return None

        info = UNIVERSITIES.get(

            university_id,

            {

                "nom": f"Université {university_id}",

                "ville": "Inconnue"

            }

        )

        disciplines = sorted({

            f.discipline

            for f in filieres

            if f.discipline

        })

        languages = sorted({

            f.langue

            for f in filieres

            if f.langue

        })

        return {

            "id": university_id,

            "nom": info["nom"],

            "ville": info["ville"],

            "programs": len(filieres),

            "disciplines": disciplines,

            "languages": languages

        }

    # ======================================================
    # Statistiques d'une université
    # ======================================================

    def get_statistics(

        self,

        university_id

    ):

        filieres = self._query(

            university_id

        ).all()

        if not filieres:

            return {}

        # --------------------------------------------------
        # Disciplines
        # --------------------------------------------------

        disciplines = {

            f.discipline.strip()

            for f in filieres

            if f.discipline

        }

        # --------------------------------------------------
        # Langues
        # --------------------------------------------------

        languages = {

            f.langue.strip()

            for f in filieres

            if f.langue

        }

        # --------------------------------------------------
        # Diplômes
        # --------------------------------------------------

        diplomas = {

            f.libelle_diplome.strip()

            for f in filieres

            if f.libelle_diplome

        }

        # --------------------------------------------------
        # Matières
        # --------------------------------------------------

        subjects = set()

        for f in filieres:

            if not f.matieres:

                continue

            for subject in f.matieres.split(";"):

                subject = subject.strip()

                if subject:

                    subjects.add(

                        subject

                    )

        # --------------------------------------------------
        # Métiers
        # --------------------------------------------------

        jobs = set()

        for f in filieres:

            if not f.metiers:

                continue

            for job in f.metiers.split(";"):

                job = job.strip()

                if job:

                    jobs.add(

                        job

                    )

        # --------------------------------------------------
        # Séries Bac
        # --------------------------------------------------

        bac_series = set()

        for f in filieres:

            if not f.series_bac:

                continue

            for bac in f.series_bac.split(";"):

                bac = bac.strip()

                if bac:

                    bac_series.add(

                        bac

                    )

        # --------------------------------------------------
        # Modes d'enseignement
        # --------------------------------------------------

        presentiel = sum(

            1

            for f in filieres

            if str(

                f.presentiel

            ).lower() in [

                "oui",

                "true",

                "1"

            ]

        )

        distance = sum(

            1

            for f in filieres

            if str(

                f.distance

            ).lower() in [

                "oui",

                "true",

                "1"

            ]

        )

        alternance = sum(

            1

            for f in filieres

            if str(

                f.alternance

            ).lower() in [

                "oui",

                "true",

                "1"

            ]

        )

        # --------------------------------------------------
        # Résultat
        # --------------------------------------------------

        return {

            "programs": len(

                filieres

            ),

            "disciplines": len(

                disciplines

            ),

            "languages": len(

                languages

            ),

            "degrees": len(

                diplomas

            ),

            "subjects": len(

                subjects

            ),

            "jobs": len(

                jobs

            ),

            "bac_series": len(

                bac_series

            ),

            "presentiel": presentiel,

            "distance": distance,

            "alternance": alternance,

            "disciplines_list": sorted(

                disciplines

            ),

            "languages_list": sorted(

                languages

            ),

            "degrees_list": sorted(

                diplomas

            ),

            "subjects_list": sorted(

                subjects

            ),

            "jobs_list": sorted(

                jobs

            ),

            "bac_series_list": sorted(

                bac_series

            )

        }

    # ======================================================
    # Filières
    # ======================================================

    def get_programs(

        self,

        university_id

    ):

        filieres = self._query(

            university_id

        ).all()

        results = []

        for filiere in filieres:

            results.append(

                {

                    "id": filiere.id,

                    "code": filiere.code_filiere,

                    "diplome": filiere.libelle_diplome,

                    "discipline": filiere.discipline,

                    "langue": filiere.langue,

                    "description": filiere.description,

                    "bac": filiere.series_bac,

                    "presentiel": filiere.presentiel,

                    "distance": filiere.distance,

                    "alternance": filiere.alternance,

                    "acces_dossier": filiere.acces_dossier,

                    "acces_concours": filiere.acces_concours,

                    "acces_autre": filiere.acces_autre,

                    "acces_autres_annees": filiere.acces_autres_annees

                }

            )

        results.sort(

            key=lambda x: (

                x["diplome"] or ""

            )

        )

        return results


    # ======================================================
    # Disciplines
    # ======================================================

    def get_disciplines(

        self,

        university_id

    ):

        filieres = self._query(

            university_id

        ).all()

        disciplines = sorted(

            {

                f.discipline.strip()

                for f in filieres

                if f.discipline

            }

        )

        return [

            {

                "name": discipline

            }

            for discipline in disciplines

        ]


    # ======================================================
    # Métiers
    # ======================================================

    def get_jobs(

        self,

        university_id

    ):

        filieres = self._query(

            university_id

        ).all()

        jobs = set()

        for filiere in filieres:

            if not filiere.metiers:

                continue

            for job in filiere.metiers.split(";"):

                job = job.strip()

                if job:

                    jobs.add(

                        job

                    )

        return [

            {

                "name": job

            }

            for job in sorted(

                jobs

            )

        ]


    # ======================================================
    # Matières
    # ======================================================

    def get_subjects(

        self,

        university_id

    ):

        filieres = self._query(

            university_id

        ).all()

        subjects = set()

        for filiere in filieres:

            if not filiere.matieres:

                continue

            for subject in filiere.matieres.split(";"):

                subject = subject.strip()

                if subject:

                    subjects.add(

                        subject

                    )

        return [

            {

                "name": subject

            }

            for subject in sorted(

                subjects

            )

        ]


    # ======================================================
    # Langues
    # ======================================================

    def get_languages(

        self,

        university_id

    ):

        filieres = self._query(

            university_id

        ).all()

        languages = sorted(

            {

                f.langue.strip()

                for f in filieres

                if f.langue

            }

        )

        return [

            {

                "name": language

            }

            for language in languages

        ]
    
    # ======================================================
    # Recherche
    # ======================================================

    def search(

        self,

        query

    ):

        if not query:

            return self.get_universities()

        query = query.lower()

        results = []

        for university in self.get_universities():

            if (

                query in university["nom"].lower()

                or

                query in university["ville"].lower()

            ):

                results.append(

                    university

                )

        return results


    # ======================================================
    # Filtres
    # ======================================================

    def filter(

        self,

        city=None,

        language=None,

        degree=None

    ):

        universities = self.get_universities()

        results = []

        city = city.lower() if city else None

        language = language.lower() if language else None

        degree = degree.lower() if degree else None

        for university in universities:

            query = self._query(

                university["id"]

            )

            filieres = query.all()

            # -----------------------------------------
            # Ville
            # -----------------------------------------

            if city:

                if city not in university["ville"].lower():

                    continue

            # -----------------------------------------
            # Langue
            # -----------------------------------------

            if language:

                found = False

                for filiere in filieres:

                    if (

                        filiere.langue

                        and

                        language in filiere.langue.lower()

                    ):

                        found = True

                        break

                if not found:

                    continue

            # -----------------------------------------
            # Diplôme
            # -----------------------------------------

            if degree:

                found = False

                for filiere in filieres:

                    if (

                        filiere.libelle_diplome

                        and

                        degree in filiere.libelle_diplome.lower()

                    ):

                        found = True

                        break

                if not found:

                    continue

            # -----------------------------------------
            # Recalcul des statistiques
            # -----------------------------------------

            disciplines = {

                f.discipline

                for f in filieres

                if f.discipline

            }

            languages = {

                f.langue

                for f in filieres

                if f.langue

            }

            results.append(

                {

                    "id": university["id"],

                    "nom": university["nom"],

                    "ville": university["ville"],

                    "programs": len(filieres),

                    "disciplines": len(

                        disciplines

                    ),

                    "languages": ", ".join(

                        sorted(

                            languages

                        )

                    )

                }

            )

        results.sort(

            key=lambda x: x["nom"]

        )

        return results