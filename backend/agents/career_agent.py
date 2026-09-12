from agents.query_parser import QueryParser

from services.search_service import SearchService
from services.formatter_service import FormatterService
from services.prompt_builder import PromptBuilder
from services.llm_service import LLMService


class CareerAgent:

    def __init__(self, db):

        self.parser = QueryParser()

        self.search = SearchService(db)

        self.formatter = FormatterService()

        self.prompt_builder = PromptBuilder()

        self.llm = LLMService()

    def process(self, message):

        # ===============================
        # Extraction des mots-clés
        # ===============================

        keywords = self.parser.parse(message)

        # ===============================
        # Recherche des filières
        # ===============================

        filieres = self.search.search(

            keywords,

            limit=3

        )

        if len(filieres) == 0:

            return {

                "type": "career",

                "answer":
                "Je n'ai trouvé aucune filière correspondant à ce métier.",

                "results": []

            }

        results = self.formatter.format(filieres)

        # ===============================
        # Prompt spécialisé carrière
        # ===============================

        prompt = f"""
Tu es un conseiller d'orientation universitaire.

Un étudiant souhaite connaître le parcours
pour exercer le métier suivant :

{message}

Voici les filières trouvées :

"""

        for i, f in enumerate(results, start=1):

            prompt += f"""

=========================

FILIÈRE {i}

Diplôme :
{f["diplome"]}

Discipline :
{f["discipline"]}

Compétences :
{f["competences"]}

Métiers :
{f["metiers"]}

Poursuite d'études :
{f["poursuite_etudes"]}

"""

        prompt += """

Réponds en français.

Explique :

- quelles filières choisir

- pourquoi elles sont adaptées

- quelles compétences seront acquises

- quels métiers sont accessibles

- termine par un conseil.
"""

        answer = self.llm.generate(prompt)

        return {

            "type": "career",

            "answer": answer,

            "results": results

        }