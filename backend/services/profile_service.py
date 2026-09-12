from fastapi import HTTPException

from passlib.context import CryptContext

from sqlalchemy.orm import Session

from models.user import User
from models.conversation import Conversation
from models.message import Message


pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


class ProfileService:

    def __init__(

        self,

        db: Session

    ):

        self.db = db

    # ==========================================================
    # Profil
    # ==========================================================

    def get_profile(

        self,

        user_id

    ):

        user = (

            self.db

            .query(User)

            .filter(

                User.id == user_id

            )

            .first()

        )

        if not user:

            return {}

        return {

            "id": user.id,

            "name": f"{user.prenom} {user.nom}",

            "prenom": user.prenom,

            "nom": user.nom,

            "email": user.email,

            "created_at": user.created_at

        }

    # ==========================================================
    # Modifier le profil
    # ==========================================================

    def update_profile(

        self,

        user_id,

        data

    ):

        user = (

            self.db

            .query(User)

            .filter(

                User.id == user_id

            )

            .first()

        )

        if not user:

            raise HTTPException(

                status_code=404,

                detail="Utilisateur introuvable"

            )

        if data.prenom is not None:

            user.prenom = data.prenom

        if data.nom is not None:

            user.nom = data.nom

        if data.email is not None:

            email_exist = (

                self.db

                .query(User)

                .filter(

                    User.email == data.email,

                    User.id != user.id

                )

                .first()

            )

            if email_exist:

                raise HTTPException(

                    status_code=400,

                    detail="Cet email est déjà utilisé."

                )

            user.email = data.email

        self.db.commit()

        self.db.refresh(user)

        return {

            "message": "Profil mis à jour avec succès.",

            "user": {

                "id": user.id,

                "prenom": user.prenom,

                "nom": user.nom,

                "email": user.email

            }

        }

    # ==========================================================
    # Modifier le mot de passe
    # ==========================================================

    def update_password(

        self,

        user_id,

        data

    ):

        user = (

            self.db

            .query(User)

            .filter(

                User.id == user_id

            )

            .first()

        )

        if not user:

            raise HTTPException(

                status_code=404,

                detail="Utilisateur introuvable"

            )

        if not pwd_context.verify(

            data.current_password,

            user.password

        ):

            raise HTTPException(

                status_code=400,

                detail="Mot de passe actuel incorrect."

            )

        user.password = pwd_context.hash(

            data.new_password

        )

        self.db.commit()

        return {

            "message": "Mot de passe modifié avec succès."

        }

    # ==========================================================
    # Statistiques
    # ==========================================================

    def get_stats(

        self,

        user_id

    ):

        conversations = (

            self.db

            .query(Conversation)

            .filter(

                Conversation.user_id == user_id

            )

            .all()

        )

        conversation_ids = [

            c.id

            for c in conversations

        ]

        if conversation_ids:

            questions = (

                self.db

                .query(Message)

                .filter(

                    Message.conversation_id.in_(

                        conversation_ids

                    ),

                    Message.role == "user"

                )

                .count()

            )

        else:

            questions = 0

        return {

            "conversations": len(

                conversations

            ),

            "questions": questions,

            "filieres": 0,

            "favorites": 0

        }

    # ==========================================================
    # Préférences
    # ==========================================================

    def get_preferences(

        self,

        user_id

    ):

        return {

            "bac": None,

            "niveau": None,

            "langue": None,

            "interets": []

        }

    # ==========================================================
    # Conversations récentes
    # ==========================================================

    def get_recent_chats(

        self,

        user_id

    ):

        conversations = (

            self.db

            .query(Conversation)

            .filter(

                Conversation.user_id == user_id

            )

            .order_by(

                Conversation.updated_at.desc()

            )

            .limit(5)

            .all()

        )

        results = []

        for conversation in conversations:

            last_message = ""

            if conversation.messages:

                last_message = (

                    conversation

                    .messages[-1]

                    .content

                )

            results.append({

                "id": conversation.id,

                "title": conversation.title,

                "last_message": last_message,

                "updated_at": conversation.updated_at

            })

        return results

    # ==========================================================
    # Dernières filières
    # ==========================================================

    def get_recent_filieres(

        self,

        user_id

    ):

        return []

    # ==========================================================
    # Favoris
    # ==========================================================

    def get_favorites(

        self,

        user_id

    ):

        return []