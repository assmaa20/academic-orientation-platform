from models.filiere import Filiere


class SearchService:

    def __init__(self, db):

        self.db = db

        # Importance des colonnes
        self.weights = {

            "libelle_diplome": 10,

            "discipline": 8,

            "metiers": 7,

            "competences": 6,

            "description": 5,

            "connaissances": 4,

            "matieres": 4,

            "marche_travail": 3,

            "series_bac": 2,

            "langue": 1

        }

    # ==========================================================
    # Calcul du score
    # ==========================================================

    def compute_score(self, filiere, keywords):

        score = 0

        for keyword in keywords:

            keyword = keyword.lower()

            for field, weight in self.weights.items():

                value = getattr(filiere, field, "")

                if value is None:
                    continue

                value = str(value).lower()

                # correspondance exacte

                if keyword == value:

                    score += weight * 3

                # mot présent

                elif keyword in value:

                    score += weight

        return score

    # ==========================================================
    # Recherche principale
    # ==========================================================

    def search(self, keywords, limit=5):

        if not keywords:

            return []

        # On charge toutes les filières
        filieres = self.db.query(Filiere).all()

        scored = []

        for filiere in filieres:

            score = self.compute_score(

                filiere,

                keywords

            )

            if score > 0:

                scored.append(

                    (

                        score,

                        filiere

                    )

                )

        # Tri décroissant

        scored.sort(

            key=lambda x: x[0],

            reverse=True

        )

        return scored[:limit]