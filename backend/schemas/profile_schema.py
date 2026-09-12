from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel


# ==========================================================
# Profil utilisateur
# ==========================================================

class ProfileResponse(BaseModel):

    id: int

    name: str

    prenom: str

    nom: str

    email: str

    created_at: Optional[datetime]


# ==========================================================
# Modifier le profil
# ==========================================================

class ProfileUpdateRequest(BaseModel):

    prenom: Optional[str] = None

    nom: Optional[str] = None

    email: Optional[str] = None


# ==========================================================
# Modifier le mot de passe
# ==========================================================

class PasswordUpdateRequest(BaseModel):

    current_password: str

    new_password: str


# ==========================================================
# Statistiques
# ==========================================================

class ProfileStatsResponse(BaseModel):

    conversations: int

    questions: int

    filieres: int

    favorites: int


# ==========================================================
# Préférences
# ==========================================================

class ProfilePreferencesResponse(BaseModel):

    bac: Optional[str] = None

    niveau: Optional[str] = None

    langue: Optional[str] = None

    interets: List[str] = []


# ==========================================================
# Conversation récente
# ==========================================================

class RecentChatResponse(BaseModel):

    id: int

    title: str

    last_message: str

    updated_at: Optional[datetime]


# ==========================================================
# Filière récente
# ==========================================================

class RecentFiliereResponse(BaseModel):

    id: int

    libelle_diplome: str

    discipline: str

    description: Optional[str] = None


# ==========================================================
# Favori
# ==========================================================

class FavoriteFiliereResponse(BaseModel):

    id: int

    libelle_diplome: str

    discipline: str

    description: Optional[str] = None