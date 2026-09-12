import ollama


class LLMService:

    def __init__(self):

        self.model = "qwen2.5:3b"

        self.options = {

            # Réponses stables
            "temperature": 0.2,

            # Pas de répétition
            "repeat_penalty": 1.1,

            # Réponse pas trop longue
            "num_predict": 400,

            # Contexte
            "num_ctx": 4096

        }

    def generate(self, prompt):

        try:

            response = ollama.chat(

                model=self.model,

                messages=[

                    {

                        "role": "user",

                        "content": prompt

                    }

                ],

                options=self.options

            )

            return response["message"]["content"]

        except Exception as e:

            print("Erreur Ollama :", e)

            return (
                "Je suis désolé, une erreur est survenue lors de la génération de la réponse."
            )