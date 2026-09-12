from services.prompt_builder import PromptBuilder
from services.llm_service import LLMService


class FollowUpAgent:

    def __init__(self):

        self.prompt_builder = PromptBuilder()

        self.llm = LLMService()

    def process(
        self,
        history,
        last_results,
        message
    ):

        if not last_results:

            return {

                "type": "answer",

                "answer":
                "Je n'ai pas assez de contexte pour répondre. "
                "Pouvez-vous reformuler votre question ?",

                "results": []

            }

        prompt = self.prompt_builder.build(

            history=history,

            results=last_results,

            question=message

        )

        answer = self.llm.generate(prompt)

        return {

            "type": "answer",

            "answer": answer,

            "results": last_results

        }