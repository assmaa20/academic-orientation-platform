from sqlalchemy.orm import Session

from models.conversation import Conversation
from models.message import Message


class ConversationService:

    def __init__(self, db: Session):

        self.db = db

    # ==========================================================
    # Créer une conversation
    # ==========================================================

    def create_conversation(

        self,

        user_id: int,

        title: str = "Nouvelle conversation"

    ):

        conversation = Conversation(

            user_id=user_id,

            title=title

        )

        self.db.add(conversation)

        self.db.commit()

        self.db.refresh(conversation)

        return conversation

    # ==========================================================
    # Conversation par ID
    # ==========================================================

    def get_conversation(

        self,

        conversation_id: int

    ):

        return (

            self.db.query(Conversation)

            .filter(

                Conversation.id == conversation_id

            )

            .first()

        )

    # ==========================================================
    # Conversation appartenant à un utilisateur
    # ==========================================================

    def get_user_conversation(

        self,

        user_id: int,

        conversation_id: int

    ):

        return (

            self.db.query(Conversation)

            .filter(

                Conversation.id == conversation_id,

                Conversation.user_id == user_id

            )

            .first()

        )

    # ==========================================================
    # Toutes les conversations d'un utilisateur
    # ==========================================================

    def get_user_conversations(

        self,

        user_id: int

    ):

        return (

            self.db.query(Conversation)

            .filter(

                Conversation.user_id == user_id

            )

            .order_by(

                Conversation.updated_at.desc()

            )

            .all()

        )

    # ==========================================================
    # Renommer une conversation
    # ==========================================================

    def rename_conversation(

        self,

        conversation_id: int,

        title: str

    ):

        conversation = self.get_conversation(

            conversation_id

        )

        if not conversation:

            return None

        conversation.title = title

        self.db.commit()

        self.db.refresh(conversation)

        return conversation

    # ==========================================================
    # Ajouter un message
    # ==========================================================

    def add_message(

        self,

        conversation_id: int,

        role: str,

        content: str

    ):

        message = Message(

            conversation_id=conversation_id,

            role=role,

            content=content

        )

        self.db.add(message)

        self.db.commit()

        self.db.refresh(message)

        return message

    # ==========================================================
    # Messages d'une conversation
    # ==========================================================

    def get_messages(

        self,

        conversation_id: int

    ):

        return (

            self.db.query(Message)

            .filter(

                Message.conversation_id == conversation_id

            )

            .order_by(

                Message.created_at.asc()

            )

            .all()

        )

    # ==========================================================
    # Supprimer une conversation
    # ==========================================================

    def delete_conversation(

        self,

        conversation_id: int

    ):

        conversation = self.get_conversation(

            conversation_id

        )

        if not conversation:

            return False

        self.db.delete(conversation)

        self.db.commit()

        return True

    # ==========================================================
    # Vérifier qu'une conversation existe
    # ==========================================================

    def conversation_exists(

        self,

        conversation_id: int

    ):

        return (

            self.db.query(Conversation)

            .filter(

                Conversation.id == conversation_id

            )

            .count()

            > 0

        )

    # ==========================================================
    # Nombre de messages
    # ==========================================================

    def count_messages(

        self,

        conversation_id: int

    ):

        return (

            self.db.query(Message)

            .filter(

                Message.conversation_id == conversation_id

            )

            .count()

        )

# ==========================================================
# Construire l'historique d'une conversation
# ==========================================================

def build_history(

    self,

    conversation_id: int,

    limit: int = 20

):

    messages = (

        self.db.query(Message)

        .filter(

            Message.conversation_id == conversation_id

        )

        .order_by(

            Message.created_at.asc()

        )

        .all()

    )

    if limit:

        messages = messages[-limit:]

    history = ""

    for message in messages:

        if message.role == "user":

            history += f"Utilisateur : {message.content}\n"

        else:

            history += f"Assistant : {message.content}\n"

    return history