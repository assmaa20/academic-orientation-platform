from services.llm_service import LLMService

llm = LLMService()

prompt = """
Qui es-tu ?
"""

print(llm.generate(prompt))