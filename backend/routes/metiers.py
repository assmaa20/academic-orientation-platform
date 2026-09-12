from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.database import get_db
from services.metier_service import MetierService


router = APIRouter(

    prefix="/metiers",

    tags=["Métiers"]

)


# ==========================================================
# Liste des métiers
# ==========================================================

@router.get("")
def get_jobs(

    db: Session = Depends(get_db)

):

    service = MetierService(db)

    return service.get_jobs()


# ==========================================================
# Détails d'un métier
# ==========================================================

@router.get("/{job_name}")
def get_job(

    job_name: str,

    db: Session = Depends(get_db)

):

    service = MetierService(db)

    job = service.get_job(

        job_name

    )

    if job is None:

        raise HTTPException(

            status_code=404,

            detail="Métier introuvable."

        )

    return job


# ==========================================================
# Statistiques
# ==========================================================

@router.get("/{job_name}/statistics")
def get_statistics(

    job_name: str,

    db: Session = Depends(get_db)

):

    service = MetierService(db)

    if not service.job_exists(

        job_name

    ):

        raise HTTPException(

            status_code=404,

            detail="Métier introuvable."

        )

    return service.get_statistics(

        job_name

    )


# ==========================================================
# Filières
# ==========================================================

@router.get("/{job_name}/programs")
def get_programs(

    job_name: str,

    db: Session = Depends(get_db)

):

    service = MetierService(db)

    if not service.job_exists(

        job_name

    ):

        raise HTTPException(

            status_code=404,

            detail="Métier introuvable."

        )

    return service.get_programs(

        job_name

    )


# ==========================================================
# Universités
# ==========================================================

@router.get("/{job_name}/universities")
def get_universities(

    job_name: str,

    db: Session = Depends(get_db)

):

    service = MetierService(db)

    if not service.job_exists(

        job_name

    ):

        raise HTTPException(

            status_code=404,

            detail="Métier introuvable."

        )

    return service.get_universities(

        job_name

    )


# ==========================================================
# Disciplines
# ==========================================================

@router.get("/{job_name}/disciplines")
def get_disciplines(

    job_name: str,

    db: Session = Depends(get_db)

):

    service = MetierService(db)

    if not service.job_exists(

        job_name

    ):

        raise HTTPException(

            status_code=404,

            detail="Métier introuvable."

        )

    return service.get_disciplines(

        job_name

    )


# ==========================================================
# Langues
# ==========================================================

@router.get("/{job_name}/languages")
def get_languages(

    job_name: str,

    db: Session = Depends(get_db)

):

    service = MetierService(db)

    if not service.job_exists(

        job_name

    ):

        raise HTTPException(

            status_code=404,

            detail="Métier introuvable."

        )

    return service.get_languages(

        job_name

    )