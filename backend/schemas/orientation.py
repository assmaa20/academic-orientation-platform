from pydantic import BaseModel

from typing import List


# ==========================================================
# Requête
# ==========================================================

class OrientationRequest(BaseModel):

    bac: str

    langue: str

    niveau: str

    mode: str

    interets: List[str]


# ==========================================================
# Une recommandation
# ==========================================================

class OrientationResult(BaseModel):

    id: int

    score: int

    reasons: List[str]

    libelle_diplome: str

    discipline: str

    description: str

    langue: str

    series_bac: str

    metiers: str

    code_universite: int | None = None


# ==========================================================
# Réponse
# ==========================================================

class OrientationResponse(BaseModel):

    recommendations: List[OrientationResult]

    explanation: str