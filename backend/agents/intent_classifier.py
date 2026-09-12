class IntentClassifier:

    def __init__(self):

        self.search_keywords = [

            "cherche",
            "recherche",
            "trouver",
            "filière",
            "filiere",
            "formation",
            "licence",
            "master",
            "doctorat",
            "diplôme",
            "diplome",
            "école",
            "ecole",
            "université",
            "universite",
            "ingénieur",
            "ingenieur"

        ]

        self.orientation_keywords = [

            "bac",
            "baccalauréat",
            "baccalaureat",
            "note",
            "moyenne",
            "orientation",
            "orienter",
            "quelle filière",
            "quelle filiere",
            "quel choix",
            "conseil"

        ]

        self.career_keywords = [

            "devenir",
            "métier",
            "metier",
            "emploi",
            "travail",
            "carrière",
            "carriere",
            "profession",
            "job"

        ]

        self.chat_keywords = [

            "bonjour",
            "salut",
            "bonsoir",
            "hello",
            "hi",
            "merci",
            "merci beaucoup",
            "au revoir",
            "bye",
            "qui es-tu",
            "qui es tu",
            "comment vas-tu",
            "comment vas tu",
            "ça va",
            "ca va",
            "que peux-tu faire",
            "que peux tu faire"

        ]

    def classify(self, message: str):

        message = message.lower().strip()

        # =====================================
        # Conversation
        # =====================================

        if any(word in message for word in self.chat_keywords):

            return "chat"

        # =====================================
        # Carrière
        # =====================================

        if "devenir" in message:

            return "career"

        # =====================================
        # Recherche de filière
        # =====================================

        if any(word in message for word in self.search_keywords):

            return "search"

        # =====================================
        # Orientation
        # =====================================

        if any(word in message for word in self.orientation_keywords):

            return "orientation"

        # =====================================
        # Métier
        # =====================================

        if any(word in message for word in self.career_keywords):

            return "career"

        # =====================================
        # Tout le reste
        # =====================================

        return "general"