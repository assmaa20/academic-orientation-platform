from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import get_db

from utils.auth import get_current_user

from schemas.profile_schema import (
    ProfileUpdateRequest,
    PasswordUpdateRequest,
)

from services.profile_service import ProfileService


router = APIRouter()


# ==========================================================
# Profil utilisateur
# ==========================================================

@router.get("")
def get_profile(

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user)

):

    service = ProfileService(db)

    return service.get_profile(current_user.id)


# ==========================================================
# Modifier le profil
# ==========================================================

@router.put("")
def update_profile(

    data: ProfileUpdateRequest,

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user)

):

    service = ProfileService(db)

    return service.update_profile(
        current_user.id,
        data
    )


# ==========================================================
# Modifier le mot de passe
# ==========================================================

@router.put("/password")
def update_password(

    data: PasswordUpdateRequest,

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user)

):

    service = ProfileService(db)

    return service.update_password(
        current_user.id,
        data
    )


# ==========================================================
# Statistiques
# ==========================================================

@router.get("/stats")
def get_stats(

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user)

):

    service = ProfileService(db)

    return service.get_stats(current_user.id)


# ==========================================================
# Préférences
# ==========================================================

@router.get("/preferences")
def get_preferences(

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user)

):

    service = ProfileService(db)

    return service.get_preferences(current_user.id)


# ==========================================================
# Conversations récentes
# ==========================================================

@router.get("/chats")
def get_recent_chats(

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user)

):

    service = ProfileService(db)

    return service.get_recent_chats(current_user.id)


# ==========================================================
# Dernières filières consultées
# ==========================================================

@router.get("/filieres")
def get_recent_filieres(

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user)

):

    service = ProfileService(db)

    return service.get_recent_filieres(current_user.id)


# ==========================================================
# Favoris
# ==========================================================

@router.get("/favorites")
def get_favorites(

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user)

):

    service = ProfileService(db)

    return service.get_favorites(current_user.id)