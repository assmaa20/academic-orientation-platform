from services.conversation_memory import ConversationMemory


# ==========================================================
# Une seule mémoire partagée par toute l'application
# ==========================================================

memory = ConversationMemory()


class ConversationAgent:

    def __init__(self):

        self.memory = memory

    # ==========================================================
    # Messages
    # ==========================================================

    def add_user_message(self, user_id, message):

        self.memory.add_message(

            user_id=user_id,

            role="user",

            content=message

        )

    def add_assistant_message(self, user_id, message):

        self.memory.add_message(

            user_id=user_id,

            role="assistant",

            content=message

        )

    # ==========================================================
    # Historique
    # ==========================================================

    def get_history(self, user_id):

        return self.memory.get_history(user_id)

    def get_context(self, user_id):

        return self.memory.build_context(user_id)

    # ==========================================================
    # Dernier intent
    # ==========================================================

    def set_last_intent(self, user_id, intent):

        self.memory.set_last_intent(

            user_id,

            intent

        )

    def get_last_intent(self, user_id):

        return self.memory.get_last_intent(

            user_id

        )

    # ==========================================================
    # Derniers résultats SQL
    # ==========================================================

    def set_last_results(self, user_id, results):

        self.memory.set_last_results(

            user_id,

            results

        )

    def get_last_results(self, user_id):

        return self.memory.get_last_results(

            user_id

        )

    # ==========================================================
    # Effacer la conversation
    # ==========================================================

    def clear(self, user_id):

        self.memory.clear(user_id)