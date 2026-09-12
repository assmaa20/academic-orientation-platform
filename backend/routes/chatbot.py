from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from database.database import get_db

from agents.router_agent import RouterAgent
from services.similarity_search_service import SimilaritySearchService




router = APIRouter(

    prefix="/chat",

    tags=["Chatbot"]

)

@router.get("/similarity")

def similarity(

    q: str,

    db: Session = Depends(get_db)

):

    service = SimilaritySearchService(db)

    return service.search(q)

@router.post("")

def chat(

    body: dict,

    db: Session = Depends(get_db)

):

    agent = RouterAgent(db)

    return agent.process(

        body["message"]

    )