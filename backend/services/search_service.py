from sqlalchemy import or_

from models.filiere import Filiere


class SearchService:

    def __init__(self, db):

        self.db = db

    def search(self, keywords, limit=5):

        if not keywords:

            return []

        filieres = self.db.query(Filiere).all()

        scored = []

        for filiere in filieres:

            score = 0

            # Tout le texte utile de la filière
            text = " ".join([

                str(filiere.libelle_diplome or ""),
                str(filiere.discipline or ""),
                str(filiere.description or ""),
                str(filiere.competences or ""),
                str(filiere.connaissances or ""),
                str(filiere.matieres or ""),
                str(filiere.marche_travail or ""),
                str(filiere.metiers or ""),
                str(filiere.series_bac or "")

            ]).lower()

            for keyword in keywords:

                keyword = keyword.lower()

                if keyword in text:

                    score += 1

                    # Bonus selon l'endroit où apparaît le mot

                    if keyword in str(filiere.libelle_diplome or "").lower():
                        score += 5

                    if keyword in str(filiere.discipline or "").lower():
                        score += 5

                    if keyword in str(filiere.metiers or "").lower():
                        score += 4

                    if keyword in str(filiere.description or "").lower():
                        score += 3

                    if keyword in str(filiere.competences or "").lower():
                        score += 2

            if score > 0:

                scored.append(

                    (

                        score,

                        filiere

                    )

                )

        scored.sort(

            key=lambda x: x[0],

            reverse=True

        )

        return scored[:limit]