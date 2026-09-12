from pydantic import BaseModel, EmailStr


class UserRegister(BaseModel):

    nom: str

    prenom: str

    email: EmailStr

    password: str