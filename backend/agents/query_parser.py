import re


class QueryParser:

    def __init__(self):

        # ===========================
        # Synonymes
        # ===========================

        self.synonyms = {

            # Intelligence Artificielle
            "ia": "intelligence artificielle",
            "ai": "intelligence artificielle",
            "intelligence artificielle": "intelligence artificielle",

            # Machine Learning
            "machine learning": "machine learning",
            "ml": "machine learning",

            # Deep Learning
            "deep learning": "deep learning",
            "dl": "deep learning",

            # Data
            "big data": "big data",
            "data science": "data science",
            "data scientist": "data science",

            # Cybersécurité
            "cyber": "cybersécurité",
            "cyber sécurité": "cybersécurité",
            "cybersecurite": "cybersécurité",
            "cybersécurité": "cybersécurité",

            # Réseaux
            "reseaux": "réseaux",
            "réseaux": "réseaux",
            "network": "réseaux",

            # Cloud
            "cloud computing": "cloud",
            "cloud": "cloud",

            # Génie
            "genie informatique": "génie informatique",
            "génie informatique": "génie informatique"
        }

        # ===========================
        # Mots ignorés
        # ===========================

        self.stopwords = {

            "je",
            "veux",
            "cherche",
            "recherche",
            "une",
            "un",
            "des",
            "de",
            "du",
            "la",
            "le",
            "les",
            "pour",
            "dans",
            "avec",
            "en",
            "et",
            "ou",
            "au",
            "aux",
            "est",
            "qui",
            "quelle",
            "quelles",
            "quel",
            "quels",
            "avoir",
            "faire",
            "après",
            "apres",
            "sur",
            "vers",
            "par",
            "comme"

        }

    # =====================================================

    def normalize(self, text):

        text = text.lower()

        text = text.replace("é", "e")
        text = text.replace("è", "e")
        text = text.replace("ê", "e")
        text = text.replace("à", "a")
        text = text.replace("â", "a")
        text = text.replace("î", "i")
        text = text.replace("ï", "i")
        text = text.replace("ô", "o")
        text = text.replace("ù", "u")
        text = text.replace("û", "u")
        text = text.replace("ç", "c")

        return text

    # =====================================================

    def parse(self, message):

        message = self.normalize(message)

        keywords = []

        # ===================================
        # Expressions composées
        # ===================================

        for expression, canonical in self.synonyms.items():

            if self.normalize(expression) in message:

                keywords.append(canonical)

                message = message.replace(
                    self.normalize(expression),
                    " "
                )

        # ===================================
        # Découpage
        # ===================================

        words = re.findall(r"\b[a-z0-9]+\b", message)

        for word in words:

            if word in self.stopwords:

                continue

            keywords.append(word)

        # ===================================
        # Suppression des doublons
        # ===================================

        final = []

        for word in keywords:

            if word not in final:

                final.append(word)

        return final