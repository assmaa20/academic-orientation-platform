from passlib.context import CryptContext

from database.database import SessionLocal
from models.user import User

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

db = SessionLocal()

user = User(
    nom="Chafi",
    prenom="Assmaa",
    email="assmaachafi95@gmail.com",
    password=pwd_context.hash("Azerty123!"),
    provider="local",
    email_verified=True,
    verification_token=None
)

db.add(user)
db.commit()

print("Utilisateur créé avec succès.")