import time

from agents.intent_classifier import IntentClassifier
from agents.query_parser import QueryParser
from agents.general_agent import GeneralAgent
from agents.orientation_agent import OrientationAgent
from agents.career_agent import CareerAgent
from agents.followup_agent import FollowUpAgent
from agents.conversation_agent import ConversationAgent

from services.search_service import SearchService
from services.formatter_service import FormatterService
from services.prompt_builder import PromptBuilder
from services.llm_service import LLMService
from services.filiere_service import FiliereService


class RouterAgent:

    def __init__(self, db):

        self.db = db

        self.classifier = IntentClassifier()

        self.parser = QueryParser()

        self.search_service = SearchService(db)

        self.formatter = FormatterService()

        self.prompt_builder = PromptBuilder()

        self.llm = LLMService()

        self.general = GeneralAgent()

        self.orientation = OrientationAgent(db)

        self.career = CareerAgent(db)

        self.followup = FollowUpAgent()

        self.conversation = ConversationAgent()

    # ======================================================
    # Traitement principal
    # ======================================================

    def process(

        self,

        message: str,

        db=None,

        filiere_id=None

    ):

        start = time.time()

        user_id = 1

        # ======================================================
        # Sauvegarde du message
        # ======================================================

        self.conversation.add_user_message(

            user_id,

            message

        )

        history = self.conversation.get_context(

            user_id

        )

        # ======================================================
        # Charger automatiquement la filière courante
        # ======================================================

        current_filiere = None

        if filiere_id is not None:

            try:

                current_filiere = FiliereService(

                    self.db

                ).get_filiere(

                    filiere_id

                )

                if current_filiere:

                    print("=" * 80)
                    print("FILIÈRE CONTEXTUELLE")
                    print(current_filiere.libelle_diplome)
                    print("=" * 80)

            except Exception as e:

                print(e)

        print("=" * 80)
        print("Message :", message)
        print("Historique :")
        print(history)

        intent = self.classifier.classify(message)

        print("Intent :", intent)

        # ======================================================
        # Sauvegarder le dernier intent
        # ======================================================

        self.conversation.set_last_intent(

            user_id,

            intent

        )

        # ======================================================
        # FOLLOW-UP
        # ======================================================

        message_lower = message.lower()

        followup_words = [

            # Références à la conversation
            "et après",
            "après",
            "ensuite",
            "continue",
            "explique",
            "développe",
            "developpe",
            "plus de détails",
            "pourquoi",

            # Comparaison
            "compare",
            "compare-les",
            "compare les",
            "comparaison",

            # Références aux résultats
            "la première",
            "la deuxieme",
            "la deuxième",
            "la troisieme",
            "la troisième",
            "celle",
            "celle-ci",
            "celle là",
            "celle-là",

            # Questions sur une filière
            "compétence",
            "compétences",
            "connaissance",
            "connaissances",
            "matière",
            "matières",
            "module",
            "modules",
            "cours",
            "métier",
            "métiers",
            "emploi",
            "débouché",
            "débouchés",
            "langue",
            "description",
            "bac",
            "admission",
            "accès",
            "concours",
            "durée",
            "présentiel",
            "distance",
            "alternance",
            "poursuite",
            "master",
            "doctorat"

        ]

        last_results = self.conversation.get_last_results(

            user_id

        )

        is_followup = (

            len(last_results) > 0

            and

            any(

                word in message_lower

                for word in followup_words

            )

        )

        print("Last results :", len(last_results))
        print("FollowUp :", is_followup)

        if is_followup:

            print("FollowUp détecté")

            response = self.followup.process(

                history=history,

                last_results=last_results,

                message=message

            )

            self.conversation.add_assistant_message(

                user_id,

                response["answer"]

            )

            return response

        # ======================================================
        # RECHERCHE
        # ======================================================

        if intent == "search":

            keywords = self.parser.parse(

                message

            )

            print("Keywords :", keywords)

            # ---------------- Recherche SQL ----------------

            t0 = time.time()

            filieres = self.search_service.search(

                keywords

            )

            print(

                "Search :",

                round(time.time() - t0, 2),

                "s"

            )

            print(

                "Résultats trouvés :",

                len(filieres)

            )

            if len(filieres) == 0:

                response = {

                    "type": "answer",

                    "answer":

                    "Je n'ai trouvé aucune filière correspondant à votre recherche.",

                    "results": []

                }

                self.conversation.add_assistant_message(

                    user_id,

                    response["answer"]

                )

                return response

            # ---------------- Formatter ----------------

            t1 = time.time()

            results = self.formatter.format(

                filieres[:2]

            )

            self.conversation.set_last_results(

                user_id,

                results

            )

            print(

                "Formatter :",

                round(time.time() - t1, 2),

                "s"

            )

            # ---------------- Prompt ----------------

            t2 = time.time()

            prompt = self.prompt_builder.build(

                history=history,

                results=results,

                question=message

            )

            print(

                "Prompt :",

                round(time.time() - t2, 2),

                "s"

            )

            print(

                "Prompt :",

                len(prompt),

                "caractères"

            )

            # ---------------- LLM ----------------

            t3 = time.time()

            answer = self.llm.generate(

                prompt

            )

            print(

                "LLM :",

                round(time.time() - t3, 2),

                "s"

            )

            print(

                "Temps total :",

                round(time.time() - start, 2),

                "secondes"

            )

            response = {

                "type": "answer",

                "answer": answer,

                "results": results

            }

            self.conversation.add_assistant_message(

                user_id,

                answer

            )

            return response

        # ======================================================
        # ORIENTATION
        # ======================================================

        if intent == "orientation":

            t0 = time.time()

            response = self.orientation.process(

                message

            )

            self.conversation.set_last_results(

                user_id,

                response.get(

                    "results",

                    []

                )

            )

            print(

                "Orientation :",

                round(time.time() - t0, 2),

                "s"

            )

            print(

                "Temps total :",

                round(time.time() - start, 2),

                "secondes"

            )

            self.conversation.add_assistant_message(

                user_id,

                response["answer"]

            )

            return response

        # ======================================================
        # CARRIÈRE
        # ======================================================

        if intent == "career":

            t0 = time.time()

            response = self.career.process(

                message

            )

            self.conversation.set_last_results(

                user_id,

                response.get(

                    "results",

                    []

                )

            )

            print(

                "Career :",

                round(time.time() - t0, 2),

                "s"

            )

            print(

                "Temps total :",

                round(time.time() - start, 2),

                "secondes"

            )

            self.conversation.add_assistant_message(

                user_id,

                response["answer"]

            )

            return response

        # ======================================================
        # GÉNÉRAL
        # ======================================================

        response = self.general.process(

            message=message,

            history=history,

            filiere=current_filiere

        )

        self.conversation.add_assistant_message(

            user_id,

            response["answer"]

        )

        print(

            "Temps total :",

            round(time.time() - start, 2),

            "secondes"

        )

        return response