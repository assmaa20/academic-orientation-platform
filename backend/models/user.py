from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Boolean
from sqlalchemy import DateTime
from sqlalchemy.sql import func

from sqlalchemy.orm import relationship

from database.database import Base


class User(Base):

    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    nom = Column(
        String(100),
        nullable=False
    )

    prenom = Column(
        String(100),
        nullable=False
    )

    email = Column(
        String(150),
        unique=True,
        nullable=False
    )

    password = Column(
        String(255),
        nullable=True
    )

    provider = Column(
        String(30),
        default="local"
    )

    email_verified = Column(
        Boolean,
        default=False
    )

    verification_token = Column(
        String(255),
        nullable=True
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    # ==========================================
    # Relations
    # ==========================================

    conversations = relationship(

        "Conversation",

        back_populates="user",

        cascade="all, delete-orphan"

    )