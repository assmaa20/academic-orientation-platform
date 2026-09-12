from sqlalchemy import text


class SimilaritySearchService:

    def __init__(self, db):
        self.db = db

    def search(self, keyword):

        sql = text("""

        SELECT
            id,
            code_filiere,
            libelle_diplome,
            discipline,
            langue,
            metiers,

            GREATEST(
                similarity(COALESCE(discipline,''), :keyword),
                similarity(COALESCE(description,''), :keyword),
                similarity(COALESCE(competences,''), :keyword),
                similarity(COALESCE(metiers,''), :keyword)
            ) AS score

        FROM filieres

        ORDER BY score DESC

        LIMIT 10

        """)

        result = self.db.execute(sql, {"keyword": keyword})

        rows = result.mappings().all()

        return rows