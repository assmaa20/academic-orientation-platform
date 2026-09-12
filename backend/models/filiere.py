from sqlalchemy import Column, Integer, String, Text

from database.database import Base


class Filiere(Base):

    __tablename__ = "filieres"

    id = Column(Integer, primary_key=True, index=True)

    # ==========================
    # Identifiants
    # ==========================

    code_universite = Column(Integer)

    code_etablissement = Column(String(100))

    code_filiere = Column(String(100))

    code_diplome = Column(String(100))

    # ==========================
    # Informations générales
    # ==========================

    libelle_diplome = Column(String(255))

    discipline = Column(String(255))

    langue = Column(String(100))

    session = Column(String(100))

    duree_accreditation = Column(String(100))

    annee = Column(String(50))

    annee_validite = Column(String(50))

    # ==========================
    # Description
    # ==========================

    description = Column(Text)

    competences = Column(Text)

    connaissances = Column(Text)

    matieres = Column(Text)

    marche_travail = Column(Text)

    metiers = Column(Text)

    poursuite_etudes = Column(Text)

    series_bac = Column(Text)

    # ==========================
    # Modalités d'accès
    # ==========================

    acces_dossier = Column(Text)

    acces_concours = Column(Text)

    acces_autre = Column(Text)

    acces_autres_annees = Column(Text)

    # ==========================
    # Enseignement
    # ==========================

    presentiel = Column(String(20))

    distance = Column(String(20))

    alternance = Column(String(20))

    # ==========================
    # Tronc commun
    # ==========================

    id_tronc_commun = Column(String(100))

    libelle_tronc_commun = Column(Text)