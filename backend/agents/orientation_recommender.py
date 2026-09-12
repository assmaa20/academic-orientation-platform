from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

import numpy as np
import re


class OrientationRecommender:

    # ==========================================================
    # Initialisation
    # ==========================================================

    def __init__(self):

        self.vectorizer = TfidfVectorizer(

            lowercase=True,

            strip_accents="unicode",

            ngram_range=(1, 2),

            max_features=20000,

            min_df=2

        )

        # Cache

        self.index_ready = False

        self.documents = []

        self.filieres = []

        self.matrix = None

    # ==========================================================
    # Nettoyage
    # ==========================================================

    def clean(

        self,

        text

    ):

        if text is None:

            return ""

        text = str(text).lower()

        text = text.replace("\n", " ")

        text = text.replace("\r", " ")

        text = re.sub(r"\s+", " ", text)

        return text.strip()

    # ==========================================================
    # Répéter un texte pour lui donner plus d'importance
    # ==========================================================

    def weight(

        self,

        text,

        factor

    ):

        text = self.clean(text)

        if not text:

            return ""

        return " ".join(

            [text] * factor

        )

    # ==========================================================
    # Construire le document d'une filière
    # ==========================================================

    def build_document(

        self,

        filiere

    ):

        document = []

        # Diplôme

        document.append(

            self.weight(

                filiere.libelle_diplome,

                5

            )

        )

        # Discipline

        document.append(

            self.weight(

                filiere.discipline,

                5

            )

        )

        # Description

        document.append(

            self.weight(

                filiere.description,

                2

            )

        )

        # Compétences

        document.append(

            self.weight(

                filiere.competences,

                8

            )

        )

        # Connaissances

        document.append(

            self.weight(

                filiere.connaissances,

                5

            )

        )

        # Matières

        document.append(

            self.weight(

                filiere.matieres,

                8

            )

        )

        # Métiers

        document.append(

            self.weight(

                filiere.metiers,

                7

            )

        )

        # Marché du travail

        document.append(

            self.weight(

                filiere.marche_travail,

                6

            )

        )

        # Bac

        document.append(

            self.weight(

                filiere.series_bac,

                3

            )

        )

        return " ".join(document)

    # ==========================================================
    # Construction de l'index TF-IDF
    # ==========================================================

    def build_index(

        self,

        filieres

    ):

        print()

        print("=" * 80)

        print("Construction de l'index TF-IDF...")

        self.documents = []

        self.filieres = filieres

        for filiere in filieres:

            self.documents.append(

                self.build_document(

                    filiere

                )

            )

        self.matrix = self.vectorizer.fit_transform(

            self.documents

        )

        self.index_ready = True

        print(

            "Nombre de filières :",

            len(self.documents)

        )

        print(

            "Dimensions TF-IDF :",

            self.matrix.shape

        )

        print("=" * 80)

        print()

    # ==========================================================
    # Construire le document du profil utilisateur
    # ==========================================================

    def build_profile_document(

        self,

        profile

    ):

        words = []

        # ======================================================
        # Centres d'intérêt (très important)
        # ======================================================

        for interest in profile.get(

            "interets",

            []

        ):

            interest = self.clean(

                interest

            )

            words.extend(

                [interest] * 10

            )

        # ======================================================
        # Type de bac
        # ======================================================

        bac = self.clean(

            profile.get(

                "bac",

                ""

            )

        )

        words.extend(

            [bac] * 4

        )

        # ======================================================
        # Niveau souhaité
        # ======================================================

        niveau = self.clean(

            profile.get(

                "niveau",

                ""

            )

        )

        words.extend(

            [niveau] * 6

        )

        # ======================================================
        # Langue
        # ======================================================

        langue = self.clean(

            profile.get(

                "langue",

                ""

            )

        )

        words.extend(

            [langue] * 2

        )

        # ======================================================
        # Mode d'étude
        # ======================================================

        mode = self.clean(

            profile.get(

                "mode",

                ""

            )

        )

        words.append(

            mode

        )

        return " ".join(words)

    # ==========================================================
    # Vérifier la compatibilité
    # ==========================================================

    def is_compatible(

        self,

        profile,

        filiere

    ):

        # ======================================================
        # IMPORTANT
        #
        # On ne filtre PLUS sur :
        #   - bac
        #   - langue
        #   - mode
        #
        # Ils donneront simplement des BONUS.
        #
        # Le seul filtre obligatoire est le niveau.
        # ======================================================

        niveau = self.clean(

            profile.get(

                "niveau",

                ""

            )

        )

        diplome = self.clean(

            filiere.libelle_diplome

        )

        if niveau == "licence":

            return "licence" in diplome

        elif niveau == "master":

            return "master" in diplome

        elif niveau == "ingénieur":

            return (

                "ingénieur" in diplome

                or

                "ingenieur" in diplome

            )

        # Si aucun niveau n'est précisé,
        # on accepte toutes les filières.

        return True

    # ==========================================================
    # Vérifier si un texte contient un mot
    # ==========================================================

    def contains(

        self,

        text,

        keyword

    ):

        text = self.clean(text)

        keyword = self.clean(keyword)

        if not text:

            return False

        if not keyword:

            return False

        return keyword in text

    # ==========================================================
    # Calcul des bonus
    # ==========================================================

    def compute_bonus(

        self,

        profile,

        filiere

    ):

        bonus = 0

        reasons = []

        document = self.build_document(

            filiere

        )

        # ======================================================
        # BAC
        # ======================================================

        bac = self.clean(

            profile.get(

                "bac",

                ""

            )

        )

        if bac and self.contains(

            filiere.series_bac,

            bac

        ):

            bonus += 15

            reasons.append(

                "Baccalauréat compatible"

            )

        # ======================================================
        # LANGUE
        # ======================================================

        langue = self.clean(

            profile.get(

                "langue",

                ""

            )

        )

        if langue and self.contains(

            filiere.langue,

            langue

        ):

            bonus += 8

            reasons.append(

                "Langue souhaitée"

            )

        # ======================================================
        # MODE D'ETUDE
        # ======================================================

        mode = self.clean(

            profile.get(

                "mode",

                ""

            )

        )

        if mode == "présentiel":

            if self.clean(filiere.presentiel):

                bonus += 5

                reasons.append(

                    "Présentiel"

                )

        elif mode == "distance":

            if self.clean(filiere.distance):

                bonus += 5

                reasons.append(

                    "À distance"

                )

        elif mode == "alternance":

            if self.clean(filiere.alternance):

                bonus += 5

                reasons.append(

                    "Alternance"

                )

        # ======================================================
        # CENTRES D'INTERET
        # ======================================================

        for interest in profile.get(

            "interets",

            []

        ):

            interest = self.clean(

                interest

            )

            if self.contains(

                document,

                interest

            ):

                bonus += 12

                reasons.append(

                    interest.title()

                )

        # ======================================================
        # COMPETENCES
        # ======================================================

        competences = self.clean(

            filiere.competences

        )

        if len(

            competences

        ) > 300:

            bonus += 4

        # ======================================================
        # MATIERES
        # ======================================================

        matieres = self.clean(

            filiere.matieres

        )

        if len(

            matieres

        ) > 300:

            bonus += 4

        # ======================================================
        # METIERS
        # ======================================================

        metiers = self.clean(

            filiere.metiers

        )

        if len(

            metiers

        ) > 150:

            bonus += 4

        # ======================================================
        # MARCHE DU TRAVAIL
        # ======================================================

        marche = self.clean(

            filiere.marche_travail

        )

        if len(

            marche

        ) > 150:

            bonus += 3

        # ======================================================
        # DESCRIPTION COMPLETE
        # ======================================================

        description = self.clean(

            filiere.description

        )

        if len(

            description

        ) > 700:

            bonus += 3

        # ======================================================
        # DISCIPLINE
        # ======================================================

        discipline = self.clean(

            filiere.discipline

        )

        for interest in profile.get(

            "interets",

            []

        ):

            if self.contains(

                discipline,

                interest

            ):

                bonus += 6

        # ======================================================
        # SUPPRESSION DES DOUBLONS
        # ======================================================

        reasons = list(

            dict.fromkeys(

                reasons

            )

        )

        return bonus, reasons

    # ==========================================================
    # Vectoriser le profil utilisateur
    # ==========================================================

    def vectorize_profile(

        self,

        profile

    ):

        if not self.index_ready:

            raise Exception(

                "Index TF-IDF non construit."

            )

        profile_document = self.build_profile_document(

            profile

        )

        return self.vectorizer.transform(

            [

                profile_document

            ]

        )

    # ==========================================================
    # Calcul des scores
    # ==========================================================

    def compute_scores(

        self,

        profile

    ):

        profile_vector = self.vectorize_profile(

            profile

        )

        similarities = cosine_similarity(

            profile_vector,

            self.matrix

        )[0]

        results = []

        compatibles = 0

        for index, similarity in enumerate(

            similarities

        ):

            filiere = self.filieres[index]

            # ==========================================
            # Compatibilité
            # ==========================================

            if not self.is_compatible(

                profile,

                filiere

            ):

                continue

            compatibles += 1

            # ==========================================
            # Bonus
            # ==========================================

            bonus, reasons = self.compute_bonus(

                profile,

                filiere

            )

            # ==========================================
            # Score sémantique
            # ==========================================

            semantic_score = similarity * 70

            # ==========================================
            # Score final
            # ==========================================

            final_score = (

                semantic_score +

                bonus

            )

            final_score = min(

                round(final_score),

                100

            )

            # ==========================================
            # Raisons automatiques
            # ==========================================

            if profile.get(

                "niveau"

            ):

                reasons.append(

                    "Niveau correspondant"

                )

            reasons = list(

                dict.fromkeys(

                    reasons

                )

            )

            results.append(

                {

                    "filiere": filiere,

                    "score": final_score,

                    "semantic": round(

                        semantic_score,

                        2

                    ),

                    "bonus": bonus,

                    "similarity": similarity,

                    "reasons": reasons

                }

            )

        print()

        print("=" * 80)

        print(

            "Filières compatibles :",

            compatibles

        )

        print(

            "Résultats :",

            len(results)

        )

        print("=" * 80)

        print()

        return results

    # ==========================================================
    # Classement
    # ==========================================================

    def rank(

        self,

        profile

    ):

        results = self.compute_scores(

            profile

        )

        results.sort(

            key=lambda x: (

                x["score"],

                x["semantic"],

                x["bonus"]

            ),

            reverse=True

        )

        return results

    # ==========================================================
    # Normalisation des scores
    # ==========================================================

    def normalize_scores(

        self,

        results

    ):

        if not results:

            return results

        scores = [

            r["score"]

            for r in results

        ]

        minimum = min(scores)

        maximum = max(scores)

        # Tous les scores identiques

        if maximum == minimum:

            for r in results:

                r["score"] = 100

            return results

        for r in results:

            r["score"] = round(

                (

                    r["score"] - minimum

                )

                /

                (

                    maximum - minimum

                )

                * 100

            )

        return results

    # ==========================================================
    # Suppression des doublons
    # ==========================================================

    def remove_duplicates(

        self,

        results

    ):

        unique = {}

        final = []

        for item in results:

            filiere = item["filiere"]

            key = (

                self.clean(

                    filiere.libelle_diplome

                ),

                self.clean(

                    filiere.discipline

                )

            )

            if key not in unique:

                unique[key] = True

                final.append(item)

        return final

    # ==========================================================
    # Recommandation finale
    # ==========================================================

    def recommend(

        self,

        profile,

        filieres,

        top_k=10

    ):

        # ---------------------------------------
        # Construction de l'index
        # ---------------------------------------

        if (

            not self.index_ready

            or

            len(self.filieres) != len(filieres)

        ):

            self.build_index(

                filieres

            )

        # ---------------------------------------
        # Classement
        # ---------------------------------------

        results = self.rank(

            profile

        )

        # ---------------------------------------
        # Normalisation
        # ---------------------------------------

        results = self.normalize_scores(

            results

        )

        # ---------------------------------------
        # Suppression des doublons
        # ---------------------------------------

        results = self.remove_duplicates(

            results

        )

        # ---------------------------------------
        # Seuil intelligent
        # ---------------------------------------

        if results:

            meilleur_score = results[0]["score"]

            seuil = max(

                meilleur_score - 35,

                25

            )

        else:

            seuil = 0

        filtered = [

            r

            for r in results

            if r["score"] >= seuil

        ]

        # ---------------------------------------
        # Tri final
        # ---------------------------------------

        filtered.sort(

            key=lambda x: (

                x["score"],

                x["semantic"],

                x["bonus"]

            ),

            reverse=True

        )

        # ---------------------------------------
        # Statistiques
        # ---------------------------------------

        print()

        print("=" * 80)

        print(

            "Meilleur score :",

            filtered[0]["score"]

            if filtered else 0

        )

        print(

            "Seuil :", seuil

        )

        print(

            "Recommandations finales :",

            len(filtered)

        )

        print("=" * 80)

        print()

        # ---------------------------------------
        # Top K
        # ---------------------------------------

        return filtered[:top_k]