from pydantic import BaseModel
from datetime import datetime


# ==========================================================
# Création d'une conversation
# ==========================================================

class ConversationCreate(BaseModel):

    title: str | None = "Nouvelle conversation"


# ==========================================================
# Mise à jour du titre
# ==========================================================

class ConversationUpdate(BaseModel):

    title: str


# ==========================================================
# Réponse API
# ==========================================================

class ConversationResponse(BaseModel):

    id: int

    user_id: int

    title: str

    created_at: datetime

    updated_at: datetime

    class Config:

        from_attributes = True