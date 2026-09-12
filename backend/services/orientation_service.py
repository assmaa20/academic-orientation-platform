from agents.orientation_recommender import OrientationRecommender

from models.filiere import Filiere


class OrientationService:

    def __init__(self, db):

        self.db = db

        self.recommender = OrientationRecommender()

    # ==========================================================
    # Toutes les filières
    # ==========================================================

    def get_all_filieres(self):

        return (

            self.db

            .query(Filiere)

            .all()

        )

    # ==========================================================
    # Recommandation
    # ==========================================================

    def recommend(

        self,

        profile

    ):

        filieres = self.get_all_filieres()

        recommendations = self.recommender.recommend(

            profile=profile,

            filieres=filieres,

            top_k=10

        )

        print("=" * 80)
        print("Nombre de recommandations :", len(recommendations))

        for r in recommendations:

            print(

              r["filiere"].id,

              r["filiere"].libelle_diplome,

              r["score"]

            )

        print("=" * 80)
        
        results = []

        for item in recommendations:

            filiere = item["filiere"]

            results.append({

                "id": filiere.id,

                "score": item["score"],

                "reasons": item["reasons"],

                "libelle_diplome": getattr(

                    filiere,

                    "libelle_diplome",

                    ""

                ),

                "discipline": getattr(

                    filiere,

                    "discipline",

                    ""

                ),

                "description": getattr(

                    filiere,

                    "description",

                    ""

                ),

                "langue": getattr(

                    filiere,

                    "langue",

                    ""

                ),

                "series_bac": getattr(

                    filiere,

                    "series_bac",

                    ""

                ),

                "metiers": getattr(

                    filiere,

                    "metiers",

                    ""

                ),

                "code_universite": getattr(

                    filiere,

                    "code_universite",

                    None

                )

            })

        return results