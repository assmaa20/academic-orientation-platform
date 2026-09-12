from repositories.filiere_repository import FiliereRepository


class FiliereService:

    def __init__(self, db):

        self.repository = FiliereRepository(db)

    # ==========================================================
    # Une filière
    # ==========================================================

    def get_filiere(self, filiere_id: int):

        return self.repository.get_by_id(filiere_id)