from services.llm_service import LLMService


class GeneralAgent:

    def __init__(self):

        self.llm = LLMService()

    def process(

        self,

        message: str,

        history: str = "",

        filiere=None

    ):

        message_lower = message.lower().strip()

        # ======================================
        # Salutations
        # ======================================

        greetings = [

            "bonjour",
            "salut",
            "bonsoir",
            "hello",
            "hi"

        ]

        if message_lower in greetings:

            return {

                "type": "general",

                "answer":

                (
                    "Bonjour 👋\n\n"
                    "Je suis **OFM AI**, votre assistant d'orientation universitaire.\n\n"
                    "Je peux vous aider à :\n"
                    "• Trouver une filière\n"
                    "• Comparer plusieurs formations\n"
                    "• Découvrir les métiers\n"
                    "• Choisir une orientation\n"
                    "• Répondre à des questions générales simples\n\n"
                    "Comment puis-je vous aider ? 😊"
                )

            }

        # ======================================
        # Remerciements
        # ======================================

        thanks = [

            "merci",
            "merci beaucoup",
            "thanks"

        ]

        if message_lower in thanks:

            return {

                "type": "general",

                "answer":

                "Avec plaisir 😊 N'hésitez pas si vous avez d'autres questions."

            }

        # ======================================
        # Présentation
        # ======================================

        if (

            "qui es-tu" in message_lower

            or

            "qui es tu" in message_lower

        ):

            return {

                "type": "general",

                "answer":

                (
                    "Je suis **OFM AI**, un assistant spécialisé dans l'orientation universitaire au Maroc.\n\n"
                    "Je peux vous aider à rechercher des filières, comparer des formations, découvrir les métiers et répondre à des questions générales simples."
                )

            }

        # ======================================
        # Hors domaine
        # ======================================

        out_of_scope = [

            "politique",
            "président",
            "president",
            "élection",
            "election",
            "guerre",
            "religion",
            "médecin",
            "medecin",
            "médicament",
            "medicament",
            "maladie",
            "cancer",
            "tribunal",
            "justice"

        ]

        if any(word in message_lower for word in out_of_scope):

            return {

                "type": "general",

                "answer":

                (
                    "Je suis principalement spécialisé dans **l'orientation universitaire au Maroc**.\n\n"
                    "Pour les questions médicales, juridiques ou politiques, je vous conseille de consulter une source spécialisée."
                )

            }

        # ======================================
        # Contexte de la filière
        # ======================================

        filiere_context = ""

        if filiere:

            filiere_context = f"""

FILIÈRE ACTUELLE

Nom :
{filiere.libelle_diplome}

Discipline :
{filiere.discipline}

Description :
{filiere.description}

Compétences :
{filiere.competences}

Connaissances :
{filiere.connaissances}

Métiers :
{filiere.metiers}

Marché du travail :
{filiere.marche_travail}

Poursuite d'études :
{filiere.poursuite_etudes}

Langue :
{filiere.langue}

Admission :
{filiere.acces_autre}

"""

        # ======================================
        # Prompt
        # ======================================

        prompt = f"""
Tu es OFM AI.

Tu es un assistant spécialisé dans l'orientation universitaire au Maroc.

Tu peux également répondre aux questions générales simples.

Si une filière est fournie ci-dessous, considère qu'elle est le sujet principal de la conversation.

Les questions comme :

- Est-ce difficile ?
- Quels sont les débouchés ?
- Quels métiers ?
- Quelle poursuite d'études ?
- Quelle langue ?
- Quels modules ?

font toujours référence à cette filière.

Si aucune filière n'est fournie,
réponds normalement.

Tu peux également utiliser l'historique
pour compléter les questions incomplètes.

{filiere_context}

Historique :

{history}

Question actuelle :

{message}

Réponds uniquement à la dernière question.
"""

        print("=" * 80)
        print(prompt)
        print("=" * 80)

        answer = self.llm.generate(prompt)

        return {

            "type": "general",

            "answer": answer

        }