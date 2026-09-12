import pandas as pd

FILE_PATH = "../database/dataset_final.xlsx"

df = pd.read_excel(FILE_PATH)


def get_stats():

    return {

        "filieres": len(df),

        "universites": df["code universite"].nunique(),

        "diplomes": df["code diplome"].nunique(),

        "metiers": df["METIER"].nunique()

    }

from sqlalchemy import text
from database.database import engine

def get_recent_filieres():

    with engine.connect() as conn:

        result = conn.execute(

            text("""

            SELECT
                nom_filiere,
                nom_universite,
                diplome,
                discipline

            FROM filieres

            ORDER BY id

            LIMIT 6

            """)

        )

        return [

            dict(row._mapping)

            for row in result

        ]