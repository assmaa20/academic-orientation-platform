from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_

from database.database import get_db
from models.filiere import Filiere
from schemas.filiere import FiliereResponse
from services.filiere_service import FiliereService

router = APIRouter(
    prefix="/filieres",
    tags=["Filières"]
)


# ==========================================================
# Liste des filières
# ==========================================================

@router.get(
    "",
    response_model=list[FiliereResponse]
)
def get_filieres(

    search: str | None = Query(None),

    page: int = Query(1, ge=1),

    limit: int = Query(20, ge=1, le=100),

    db: Session = Depends(get_db)

):

    query = db.query(Filiere)

    if search:

        query = query.filter(

            or_(

                Filiere.code_filiere.ilike(f"%{search}%"),

                Filiere.libelle_diplome.ilike(f"%{search}%"),

                Filiere.discipline.ilike(f"%{search}%"),

                Filiere.metiers.ilike(f"%{search}%"),

                Filiere.description.ilike(f"%{search}%")

            )

        )

    offset = (page - 1) * limit

    filieres = (

        query

        .offset(offset)

        .limit(limit)

        .all()

    )

    return filieres


# ==========================================================
# Une filière
# ==========================================================

@router.get("/{filiere_id}")
def get_filiere(

    filiere_id: int,

    db: Session = Depends(get_db)

):

    service = FiliereService(db)

    filiere = service.get_filiere(filiere_id)

    if not filiere:

        raise HTTPException(

            status_code=404,

            detail="Filière introuvable."

        )

    return filiere