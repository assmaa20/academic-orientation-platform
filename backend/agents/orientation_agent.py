from agents.query_parser import QueryParser

from services.search_service import SearchService
from services.formatter_service import FormatterService


class OrientationAgent:

    def __init__(self, db):

        self.parser = QueryParser()

        self.search = SearchService(db)

        self.formatter = FormatterService()

    def process(self, message):

        keywords = self.parser.parse(message)

        # Recherche des filières
        filieres = self.search.search(

            keywords,

            limit=5

        )

        if len(filieres) == 0:

            return {

                "type": "orientation",

                "answer": (
                    "Je n'ai trouvé aucune filière correspondant à votre demande. "
                    "Essayez de préciser votre série du bac, votre domaine d'intérêt "
                    "ou le métier que vous souhaitez exercer."
                ),

                "results": []

            }

        results = self.formatter.format(filieres)

        answer = (
            "J'ai trouvé plusieurs filières pouvant correspondre à votre profil. "
            "Vous pouvez consulter les résultats ci-dessous. "
            "Si vous me donnez votre série du baccalauréat "
            "(SM, PC, SVT, SES, etc.), votre moyenne et vos centres d'intérêt, "
            "je pourrai vous proposer une orientation plus précise."
        )

        return {

            "type": "orientation",

            "answer": answer,

            "results": results

        }