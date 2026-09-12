from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from database.database import get_db

from utils.auth import get_current_user

from models.user import User

from services.orientation_service import OrientationService

from services.llm_service import LLMService

from schemas.orientation import (
    OrientationRequest,
    OrientationResponse
)

router = APIRouter(

    prefix="/orientation",

    tags=["Orientation"]

)


# ==========================================================
# Recommandation
# ==========================================================

@router.post(

    "",

    response_model=OrientationResponse

)
def recommend(

    data: OrientationRequest,

    current_user: User = Depends(get_current_user),

    db: Session = Depends(get_db)

):

    service = OrientationService(db)

    results = service.recommend(

        data.model_dump()

    )

    # ==========================================
    # Générer une explication IA
    # ==========================================

    llm = LLMService()

    prompt = f"""
Tu es OFM AI.

Explique en quelques phrases pourquoi ces recommandations correspondent
au profil suivant.

Profil :

Bac : {data.bac}

Langue : {data.langue}

Niveau : {data.niveau}

Mode : {data.mode}

Centres d'intérêt :

{", ".join(data.interets)}

Les meilleures filières proposées sont :

"""

    for item in results[:5]:

        prompt += f"""

- {item["libelle_diplome"]}

"""

    prompt += """

Réponds en français de façon claire, motivante
et en moins de 150 mots.

"""

    explanation = llm.generate(prompt)

    return {

        "recommendations": results,

        "explanation": explanation

    }