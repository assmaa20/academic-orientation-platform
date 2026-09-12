from sqlalchemy.orm import Session

from models.conversation import Conversation


class ConversationRepository:

    def __init__(self, db: Session):

        self.db = db

    # ==========================================================
    # Créer une conversation
    # ==========================================================

    def create(self, user_id: int, title: str = "Nouvelle conversation"):

        conversation = Conversation(

            user_id=user_id,

            title=title

        )

        self.db.add(conversation)

        self.db.commit()

        self.db.refresh(conversation)

        return conversation

    # ==========================================================
    # Toutes les conversations d'un utilisateur
    # ==========================================================

    def get_all(self, user_id: int):

        return (

            self.db.query(Conversation)

            .filter(Conversation.user_id == user_id)

            .order_by(Conversation.updated_at.desc())

            .all()

        )

    # ==========================================================
    # Conversation par ID
    # ==========================================================

    def get_by_id(self, conversation_id: int):

        return (

            self.db.query(Conversation)

            .filter(Conversation.id == conversation_id)

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
    # Modifier le titre
    # ==========================================================

    def update_title(

        self,

        conversation: Conversation,

        title: str

    ):

        conversation.title = title

        self.db.commit()

        self.db.refresh(conversation)

        return conversation

    # ==========================================================
    # Supprimer
    # ==========================================================

    def delete(self, conversation: Conversation):

        self.db.delete(conversation)

        self.db.commit()

    # ==========================================================
    # Vérifier qu'une conversation existe
    # ==========================================================

    def exists(

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

            .count()

            > 0

        )