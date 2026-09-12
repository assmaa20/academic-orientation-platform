from datetime import datetime

from pydantic import BaseModel


# ==========================================================
# Requête : ajout d'un message
# ==========================================================

class MessageCreate(BaseModel):

    content: str

    # Optionnel :
    # si l'utilisateur vient d'une fiche filière,
    # le frontend envoie automatiquement son id.

    filiere_id: int | None = None


# ==========================================================
# Réponse API
# ==========================================================

class MessageResponse(BaseModel):

    id: int

    conversation_id: int

    role: str

    content: str

    created_at: datetime

    class Config:

        from_attributes = True