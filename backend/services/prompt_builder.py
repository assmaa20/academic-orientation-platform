class PromptBuilder:

    def shorten(self, text, max_length=250):

        if not text:
            return ""

        text = str(text).replace("\n", " ").strip()

        if len(text) <= max_length:
            return text

        return text[:max_length] + "..."

    def build(self, history, results, question):

        question_lower = question.lower()

        # ==========================================
        # Choix des informations à envoyer au LLM
        # ==========================================

        if any(word in question_lower for word in [
            "métier", "metier", "emploi",
            "travail", "carrière", "career"
        ]):

            fields = [
                "diplome",
                "discipline",
                "metiers"
            ]

        elif any(word in question_lower for word in [
            "compétence", "competence",
            "apprendre", "acquérir",
            "acquerir", "savoir"
        ]):

            fields = [
                "diplome",
                "competences"
            ]

        elif any(word in question_lower for word in [
            "matière", "matiere",
            "cours", "module", "modules"
        ]):

            fields = [
                "diplome",
                "matieres"
            ]

        elif any(word in question_lower for word in [
            "bac",
            "admission",
            "accès",
            "acces",
            "concours",
            "condition"
        ]):

            fields = [
                "diplome",
                "series_bac",
                "acces_dossier",
                "acces_concours"
            ]

        elif any(word in question_lower for word in [
            "langue",
            "anglais",
            "français",
            "francais"
        ]):

            fields = [
                "diplome",
                "langue"
            ]

        elif any(word in question_lower for word in [
            "master",
            "doctorat",
            "poursuite",
            "études",
            "etudes"
        ]):

            fields = [
                "diplome",
                "poursuite_etudes"
            ]

        else:

            fields = [

                "diplome",

                "discipline",

                "description",

                "metiers"

            ]

        labels = {

            "diplome": "Diplôme",
            "discipline": "Discipline",
            "description": "Description",
            "competences": "Compétences",
            "connaissances": "Connaissances",
            "matieres": "Matières",
            "metiers": "Métiers",
            "langue": "Langue",
            "series_bac": "Série du Bac",
            "acces_dossier": "Accès par dossier",
            "acces_concours": "Accès par concours",
            "acces_autre": "Autres modalités",
            "poursuite_etudes": "Poursuite d'études"

        }

        context = ""

        for i, filiere in enumerate(results, start=1):

            context += f"\n========== FILIÈRE {i} ==========\n"

            for field in fields:

                value = filiere.get(field)

                if not value:
                    continue

                if field == "description":
                    value = self.shorten(value, 250)

                elif field == "competences":
                    value = self.shorten(value, 180)

                elif field == "connaissances":
                    value = self.shorten(value, 180)

                elif field == "matieres":
                    value = self.shorten(value, 180)

                elif field == "marche_travail":
                    value = self.shorten(value, 180)

                elif field == "metiers":
                    value = self.shorten(value, 180)

                elif field == "poursuite_etudes":
                    value = self.shorten(value, 180)

                context += f"\n{labels[field]} :\n{value}\n"

        prompt = f"""
Tu es OFM AI.

Tu es un conseiller d'orientation universitaire marocain.

Tu aides les étudiants à choisir leur filière universitaire.

Tu dois répondre uniquement avec les informations fournies.

Ne jamais inventer d'information.

Si une information est absente, indique simplement que tu ne la connais pas.

Sois clair, professionnel et concis.

============================
HISTORIQUE DE LA CONVERSATION
============================

{history}

============================
FILIÈRES TROUVÉES
============================

{context}

============================
QUESTION ACTUELLE
============================

{question}

============================
RÉPONSE
============================

Réponds en français.

Si la question fait référence à un échange précédent
(exemple : "et après ?", "compare-les",
"la première", "celle-ci"...),
utilise l'historique pour comprendre le contexte.

Ne répète pas tout le contexte.

Réponds naturellement comme un conseiller d'orientation.
"""

        return prompt