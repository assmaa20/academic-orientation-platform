from sqlalchemy.orm import Session

from models.filiere import Filiere


class FiliereRepository:

    def __init__(self, db: Session):

        self.db = db

    # =====================================================
    # Une filière par son id
    # =====================================================

    def get_by_id(self, filiere_id: int):

        return (

            self.db.query(Filiere)

            .filter(Filiere.id == filiere_id)

            .first()

        )