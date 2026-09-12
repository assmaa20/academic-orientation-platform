from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.database import get_db
from models.user import User
from schemas.user import UserRegister

from passlib.context import CryptContext
from utils.security import generate_verification_token

from services.email_service import send_verification_email
from schemas.login import UserLogin
from utils.jwt import create_access_token



router = APIRouter(
    prefix="/auth",
    tags=["Authentification"]
)

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


@router.post("/register")
def register(user: UserRegister, db: Session = Depends(get_db)):

    existing = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Cet email existe déjà."
        )

    hashed_password = pwd_context.hash(user.password)

    verification_token = generate_verification_token()

    new_user = User(
        nom=user.nom,
        prenom=user.prenom,
        email=user.email,
        password=hashed_password,
        provider="local",
        email_verified=False,
        verification_token=verification_token
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    send_verification_email(

        new_user.email,

        new_user.prenom,

        verification_token,

    )

    return {

    "message":

    "Compte créé. Vérifiez votre adresse e-mail."

    }
    

@router.get("/verify/{token}")
def verify_email(token: str, db: Session = Depends(get_db)):

    print("\n==========================")
    print("TOKEN REÇU :", token)

    user = db.query(User).filter(
        User.verification_token == token
    ).first()

    print("UTILISATEUR :", user)

    if user:
        print("TOKEN EN BASE :", user.verification_token)

    print("==========================\n")

    if not user:
        raise HTTPException(
            status_code=404,
            detail="Lien invalide."
        )

    user.email_verified = True
    user.verification_token = None

    db.commit()

    return {
        "message": "Votre compte a été activé avec succès."
    }

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    db_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Email ou mot de passe incorrect."
        )

    if db_user.provider != "local":
        raise HTTPException(
            status_code=400,
            detail="Connectez-vous avec Google ou Microsoft."
        )

    if not pwd_context.verify(
        user.password,
        db_user.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Email ou mot de passe incorrect."
        )

    if not db_user.email_verified:
        raise HTTPException(
            status_code=403,
            detail="Veuillez confirmer votre adresse e-mail."
        )

    token = create_access_token(
        {
            "sub": db_user.email
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": db_user.id,
            "nom": db_user.nom,
            "prenom": db_user.prenom,
            "email": db_user.email
        }
    }