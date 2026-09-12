from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.database import get_db
from services.university_service import UniversityService


router = APIRouter(
    prefix="/universities",
    tags=["Universités"]
)


# ==========================================================
# Liste des universités
# ==========================================================

@router.get("")
def get_universities(
    db: Session = Depends(get_db)
):

    service = UniversityService(db)

    return service.get_universities()


# ==========================================================
# Détails d'une université
# ==========================================================

@router.get("/{university_id}")
def get_university(
    university_id: int,
    db: Session = Depends(get_db)
):

    service = UniversityService(db)

    university = service.get_university(
        university_id
    )

    if university is None:

        raise HTTPException(
            status_code=404,
            detail="Université introuvable."
        )

    return university


# ==========================================================
# Statistiques
# ==========================================================

@router.get("/{university_id}/statistics")
def get_statistics(
    university_id: int,
    db: Session = Depends(get_db)
):

    service = UniversityService(db)

    if not service.university_exists(
        university_id
    ):

        raise HTTPException(
            status_code=404,
            detail="Université introuvable."
        )

    return service.get_statistics(
        university_id
    )


# ==========================================================
# Filières
# ==========================================================

@router.get("/{university_id}/programs")
def get_programs(
    university_id: int,
    db: Session = Depends(get_db)
):

    service = UniversityService(db)

    if not service.university_exists(
        university_id
    ):

        raise HTTPException(
            status_code=404,
            detail="Université introuvable."
        )

    return service.get_programs(
        university_id
    )


# ==========================================================
# Disciplines
# ==========================================================

@router.get("/{university_id}/disciplines")
def get_disciplines(
    university_id: int,
    db: Session = Depends(get_db)
):

    service = UniversityService(db)

    if not service.university_exists(
        university_id
    ):

        raise HTTPException(
            status_code=404,
            detail="Université introuvable."
        )

    return service.get_disciplines(
        university_id
    )


# ==========================================================
# Métiers
# ==========================================================

@router.get("/{university_id}/jobs")
def get_jobs(
    university_id: int,
    db: Session = Depends(get_db)
):

    service = UniversityService(db)

    if not service.university_exists(
        university_id
    ):

        raise HTTPException(
            status_code=404,
            detail="Université introuvable."
        )

    return service.get_jobs(
        university_id
    )


# ==========================================================
# Langues
# ==========================================================

@router.get("/{university_id}/languages")
def get_languages(
    university_id: int,
    db: Session = Depends(get_db)
):

    service = UniversityService(db)

    if not service.university_exists(
        university_id
    ):

        raise HTTPException(
            status_code=404,
            detail="Université introuvable."
        )

    return service.get_languages(
        university_id
    )