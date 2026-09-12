from pydantic import BaseModel


class FiliereResponse(BaseModel):

    id: int

    code_universite: int

    code_filiere: str

    code_diplome: str

    libelle_diplome: str

    discipline: str

    langue: str

    description: str | None = None

    competences: str | None = None

    metiers: str | None = None

    series_bac: str | None = None

    class Config:

        from_attributes = True