import pandas as pd

from sqlalchemy.orm import Session

from database.database import SessionLocal
from models.filiere import Filiere


# Lecture du fichier Excel
df = pd.read_excel("database/dataset_final.xlsx")

print(f"{len(df)} lignes trouvées.")

db: Session = SessionLocal()

# Vider la table avant import
db.query(Filiere).delete()
db.commit()

for _, row in df.iterrows():

    filiere = Filiere(

        # ==========================================
        # Identifiants
        # ==========================================

        code_universite=row["code universite"],

        code_etablissement=str(row["Code de l’établissement"]),

        code_filiere=str(row["Code de la filière"]),

        code_diplome=str(row["code diplome"]),

        # ==========================================
        # Informations générales
        # ==========================================

        libelle_diplome=str(row["Libellé de diplome"]),

        discipline=str(row["libelle_discipline"]),

        langue=str(row["langue"]),

        session=str(row["session"]),

        duree_accreditation=str(row["duree_accreditation"]),

        annee=str(row["annee"]),

        annee_validite=str(row["annee_validite_accreditation"]),

        # ==========================================
        # Description
        # ==========================================

        description=str(row["DESCRIPTIONFR"]),

        competences=str(row["competence_acquerir"]),

        connaissances=str(row["conaissance_acquerir"]),

        matieres=str(row["MATIERE"]),

        marche_travail=str(row["MARCHETRAVAILLE"]),

        metiers=str(row["METIER"]),

        poursuite_etudes=str(row["poursuite_etudes"]),

        series_bac=str(row["SERIES_BAC"]),

        # ==========================================
        # Modalités d'accès
        # ==========================================

        acces_dossier=str(row["modalie_acces_etude_dossier"]),

        acces_concours=str(row["modalite_acces_concours_ecrit"]),

        acces_autre=str(row["modalite_acces_autre"]),

        acces_autres_annees=str(row["modalit_acces_autre_annees"]),

        # ==========================================
        # Enseignement
        # ==========================================

        presentiel=str(row["mode_enseignement_presentiel"]),

        distance=str(row["mode_enseignement_distance"]),

        alternance=str(row["mode_enseignement_alternance"]),

        # ==========================================
        # Tronc commun
        # ==========================================

        id_tronc_commun=str(row["id_tronc_commun_harmonise"]),

        libelle_tronc_commun=str(row["libelle_tronc_commun_harmonise"])

    )

    db.add(filiere)

db.commit()

db.close()

print("Import terminé avec succès !")