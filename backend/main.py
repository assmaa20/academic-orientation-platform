from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.database import Base, engine

# ==========================
# Modèles SQLAlchemy
# ==========================

from models.user import User
from models.filiere import Filiere
from models.conversation import Conversation
from models.message import Message

# ==========================
# Routes
# ==========================

from routes.auth import router as auth_router
from routes.filiere import router as filiere_router
from routes.chatbot import router as chatbot_router
from routes.conversation import router as conversation_router
from routes.orientation import router as orientation_router
from routes.universities import router as universities_router
from routes.metiers import router as metiers_router

# ==========================
# NOUVEAU
# ==========================

from routes.profile import router as profile_router

# ==========================
# Services
# ==========================

from services.excel_service import (

    get_stats,

    get_recent_filieres

)

# ==========================
# Création des tables
# ==========================

Base.metadata.create_all(bind=engine)

# ==========================
# Application
# ==========================

app = FastAPI(

    title="Orientation Filière API",

    description="API pour la recherche des filières universitaires",

    version="1.0"

)

# ==========================
# CORS
# ==========================

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=False,

    allow_methods=["*"],

    allow_headers=["*"]

)

# ==========================
# Routes API
# ==========================

app.include_router(auth_router)

app.include_router(filiere_router)

app.include_router(chatbot_router)

app.include_router(conversation_router)

app.include_router(orientation_router)

app.include_router(universities_router)

app.include_router(metiers_router)

# ==========================
# NOUVEAU
# ==========================

app.include_router(

    profile_router,

    prefix="/profile",

    tags=["Profile"]

)

# ==========================
# Accueil
# ==========================

@app.get("/")
def accueil():

    return {

        "message": "Bienvenue dans l'API Orientation Filière"

    }


# ==========================
# Statistiques
# ==========================

@app.get("/stats")
def stats():

    return get_stats()


# ==========================
# Dernières filières
# ==========================

@app.get("/filieres/recentes")
def recentes():

    return get_recent_filieres()