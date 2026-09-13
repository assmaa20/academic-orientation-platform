# 🎓 Orientation Filière Maroc (OFM)

## 📖 Description

**Orientation Filière Maroc (OFM)** est une plateforme web intelligente développée dans le cadre d'un projet académique.

L'objectif de cette application est d'accompagner les étudiants dans leur orientation universitaire en proposant un système intelligent permettant de rechercher des filières, consulter les universités marocaines, découvrir les métiers associés et interagir avec un chatbot spécialisé.

Le projet est composé de deux parties principales :

- **Une partie Intelligence Artificielle** dédiée au nettoyage, au prétraitement et à la classification des données des filières.
- **Une application Web** développée avec FastAPI et React permettant aux utilisateurs d'interagir avec le système.

---

# 📂 Structure du projet

```
OFM_Orientation_Filiere_Maroc
│
├── Documentation
│   ├── Rapport.pdf
│   └── Presentation.pptx
│
├── OFM_AI_Classification_Filiere
│
└── OFM_Web_Application
    ├── backend
    └── frontend
```

---

# 🤖 Partie Intelligence Artificielle

La partie IA comprend toutes les étapes de préparation et de traitement des données.

## Fonctionnalités

- Exploration des données
- Nettoyage des données
- Traitement des valeurs manquantes
- Génération automatique des compétences
- Génération automatique du marché du travail
- Prétraitement des données
- Classification des filières
- Validation des résultats
- Génération des jeux de données finaux

---

## Technologies utilisées

- Python
- Pandas
- NumPy
- Scikit-learn
- Ollama
- Gemma 3
- OpenPyXL

---

# 🌐 Partie Web

L'application Web permet aux utilisateurs d'utiliser les données générées par la partie IA.

## Fonctionnalités

### Authentification

- Création de compte
- Vérification par e-mail
- Connexion
- Déconnexion
- Connexion Google
- Connexion Microsoft

### Gestion du profil

- Consultation du profil
- Modification des informations personnelles
- Modification du mot de passe

### Chatbot

- Conversation intelligente
- Historique des conversations
- Réponses basées sur les données des filières

### Orientation

- Consultation des filières
- Consultation des universités
- Consultation des métiers
- Tableau de bord utilisateur

---

# 🛠 Technologies utilisées

## Backend

- FastAPI
- SQLAlchemy
- PostgreSQL
- JWT
- OAuth2
- Passlib
- Python

## Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router

## Base de données

- PostgreSQL

---

# ⚙ Installation

## 1. Cloner le projet

```bash
git clone <repository_url>
```

ou télécharger le projet au format ZIP.

---

# Backend

Se placer dans le dossier :

```bash
cd OFM_Web_Application/backend
```

Créer un environnement virtuel :

```bash
python -m venv venv
```

Activer l'environnement virtuel.

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

Installer les dépendances :

```bash
pip install -r requirements.txt
```

Créer le fichier `.env` :

```env
DATABASE_URL=...

SECRET_KEY=...

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=60

GMAIL_EMAIL=...

GMAIL_APP_PASSWORD=...

FRONTEND_URL=http://localhost:5173
```

Lancer le backend :

```bash
uvicorn main:app --reload
```

Le serveur sera disponible sur :

```
http://localhost:8000
```

Documentation Swagger :

```
http://localhost:8000/docs
```

---

# Frontend

Se placer dans :

```bash
cd OFM_Web_Application/frontend
```

Installer les dépendances :

```bash
npm install
```

Lancer l'application :

```bash
npm run dev
```

Le frontend sera disponible sur :

```
http://localhost:5173
```

---

# Base de données

Créer une base PostgreSQL puis configurer la variable :

```env
DATABASE_URL
```

Exemple :

```env
DATABASE_URL=postgresql://postgres:password@localhost/ofm
```

---

# Authentification

L'application utilise :

- JWT
- OAuth2
- Vérification par e-mail
- Chiffrement des mots de passe avec BCrypt

---

# Fonctionnement

Le processus global est le suivant :

1. Préparation des données.
2. Nettoyage des données.
3. Classification des filières.
4. Import des données dans la base.
5. Consultation via l'application Web.
6. Interaction avec le chatbot.

---

# Captures d'écran

Vous pouvez ajouter ici des captures d'écran de :

- Page d'accueil
- Connexion
- Dashboard
- Chatbot
- Profil
- Filières
- Universités
- Métiers

---

# Auteur

**Assmaa Chafi**

Étudiante en Génie Informatique – Big Data & Intelligence Artificielle

Université Internationale de Rabat (UIR)

---

# Licence

Projet académique développé dans le cadre d'un projet universitaire.