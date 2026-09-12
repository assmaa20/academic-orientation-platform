from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from database.database import get_db

from services.conversation_service import ConversationService

from agents.router_agent import RouterAgent

from utils.auth import get_current_user

from models.user import User

from schemas.conversation import (
    ConversationCreate,
    ConversationUpdate,
    ConversationResponse
)

from schemas.message import (
    MessageCreate,
    MessageResponse
)

router = APIRouter(
    prefix="/conversations",
    tags=["Conversations"]
)


# ==========================================================
# Créer une conversation
# ==========================================================

@router.post(
    "",
    response_model=ConversationResponse
)
def create_conversation(

    conversation: ConversationCreate,

    current_user: User = Depends(get_current_user),

    db: Session = Depends(get_db)

):

    service = ConversationService(db)

    return service.create_conversation(

        user_id=current_user.id,

        title=conversation.title

    )


# ==========================================================
# Toutes les conversations de l'utilisateur connecté
# ==========================================================

@router.get(
    "",
    response_model=list[ConversationResponse]
)
def get_conversations(

    current_user: User = Depends(get_current_user),

    db: Session = Depends(get_db)

):

    service = ConversationService(db)

    return service.get_user_conversations(

        current_user.id

    )

# ==========================================================
# Une conversation
# ==========================================================

@router.get(
    "/{conversation_id}",
    response_model=ConversationResponse
)
def get_conversation(

    conversation_id: int,

    current_user: User = Depends(get_current_user),

    db: Session = Depends(get_db)

):

    service = ConversationService(db)

    conversation = service.get_user_conversation(

        current_user.id,

        conversation_id

    )

    if not conversation:

        raise HTTPException(

            status_code=404,

            detail="Conversation introuvable."

        )

    return conversation


# ==========================================================
# Tous les messages d'une conversation
# ==========================================================

@router.get(
    "/{conversation_id}/messages",
    response_model=list[MessageResponse]
)
def get_messages(

    conversation_id: int,

    current_user: User = Depends(get_current_user),

    db: Session = Depends(get_db)

):

    service = ConversationService(db)

    conversation = service.get_user_conversation(

        current_user.id,

        conversation_id

    )

    if not conversation:

        raise HTTPException(

            status_code=404,

            detail="Conversation introuvable."

        )

    return service.get_messages(

        conversation_id

    )

# ==========================================================
# Envoyer un message à l'IA
# ==========================================================

@router.post(
    "/{conversation_id}/messages"
)
def send_message(

    conversation_id: int,

    message: MessageCreate,

    current_user: User = Depends(get_current_user),

    db: Session = Depends(get_db)

):

    service = ConversationService(db)

    # =====================================
    # Vérifier que la conversation appartient
    # à l'utilisateur connecté
    # =====================================

    conversation = service.get_user_conversation(

        current_user.id,

        conversation_id

    )

    if not conversation:

        raise HTTPException(

            status_code=404,

            detail="Conversation introuvable."

        )

    # =====================================
    # Sauvegarder le message utilisateur
    # =====================================

    service.add_message(

        conversation_id=conversation_id,

        role="user",

        content=message.content

    )

    # =====================================
    # Appeler OFM AI
    # =====================================

    router_agent = RouterAgent(db)

    ai_response = router_agent.process(

        message.content,

        filiere_id=message.filiere_id,

        db=db

    )

    answer = ai_response["answer"]

    # =====================================
    # Sauvegarder la réponse IA
    # =====================================

    service.add_message(

        conversation_id=conversation_id,

        role="assistant",

        content=answer

    )

    # =====================================
    # Mettre à jour la date de la conversation
    # =====================================

    conversation.updated_at = conversation.updated_at

    db.commit()

    # =====================================
    # Retour API
    # =====================================

    return {

        "answer": answer,

        "results": ai_response.get(

            "results",

            []

        )

    }

# ==========================================================
# Renommer une conversation
# ==========================================================

@router.put(
    "/{conversation_id}",
    response_model=ConversationResponse
)
def rename_conversation(

    conversation_id: int,

    data: ConversationUpdate,

    current_user: User = Depends(get_current_user),

    db: Session = Depends(get_db)

):

    service = ConversationService(db)

    conversation = service.get_user_conversation(

        current_user.id,

        conversation_id

    )

    if not conversation:

        raise HTTPException(

            status_code=404,

            detail="Conversation introuvable."

        )

    conversation = service.rename_conversation(

        conversation_id,

        data.title

    )

    return conversation


# ==========================================================
# Supprimer une conversation
# ==========================================================

@router.delete(
    "/{conversation_id}"
)
def delete_conversation(

    conversation_id: int,

    current_user: User = Depends(get_current_user),

    db: Session = Depends(get_db)

):

    service = ConversationService(db)

    conversation = service.get_user_conversation(

        current_user.id,

        conversation_id

    )

    if not conversation:

        raise HTTPException(

            status_code=404,

            detail="Conversation introuvable."

        )

    service.delete_conversation(

        conversation_id

    )

    return {

        "message": "Conversation supprimée."

    }