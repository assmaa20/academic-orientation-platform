from collections import defaultdict


class ConversationMemory:

    def __init__(self, max_messages=10):

        self.max_messages = max_messages

        self.memory = defaultdict(
            lambda: {
                "messages": [],
                "last_results": [],
                "last_intent": None
            }
        )

    # ==========================================================
    # Ajouter un message
    # ==========================================================

    def add_message(self, user_id, role, content):

        self.memory[user_id]["messages"].append({

            "role": role,

            "content": content

        })

        if len(self.memory[user_id]["messages"]) > self.max_messages:

            self.memory[user_id]["messages"] = \
                self.memory[user_id]["messages"][-self.max_messages:]

    # ==========================================================
    # Historique
    # ==========================================================

    def get_history(self, user_id):

        return self.memory[user_id]["messages"]

    # ==========================================================
    # Contexte texte
    # ==========================================================

    def build_context(self, user_id):

        history = self.get_history(user_id)

        if not history:

            return ""

        context = ""

        for message in history:

            if message["role"] == "user":

                context += f"Utilisateur : {message['content']}\n"

            else:

                context += f"Assistant : {message['content']}\n"

        return context

    # ==========================================================
    # Derniers résultats SQL
    # ==========================================================

    def set_last_results(self, user_id, results):

        self.memory[user_id]["last_results"] = results

    def get_last_results(self, user_id):

        return self.memory[user_id]["last_results"]

    # ==========================================================
    # Dernier intent
    # ==========================================================

    def set_last_intent(self, user_id, intent):

        self.memory[user_id]["last_intent"] = intent

    def get_last_intent(self, user_id):

        return self.memory[user_id]["last_intent"]

    # ==========================================================
    # Effacer
    # ==========================================================

    def clear(self, user_id):

        self.memory[user_id] = {

            "messages": [],

            "last_results": [],

            "last_intent": None

        }