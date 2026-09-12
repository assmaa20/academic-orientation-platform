from agents.conversation_agent import ConversationAgent

agent = ConversationAgent()

user_id = 1

# Messages utilisateur
agent.add_user_message(user_id, "Bonjour")
agent.add_user_message(user_id, "Je cherche une filière informatique")

# Réponses assistant
agent.add_assistant_message(user_id, "Bonjour !")
agent.add_assistant_message(user_id, "Je peux vous proposer plusieurs filières.")

agent.add_user_message(user_id, "Et après ?")

print(agent.get_context(user_id))
agent.clear(user_id)

print(agent.get_context(user_id))

print("===== Historique =====")
print(agent.get_context(user_id))