import api from "./api";

// ======================================
// Récupérer toutes les conversations
// ======================================

export const getConversations = async () => {

    const response = await api.get("/conversations");

    return response.data;

};

// ======================================
// Créer une nouvelle conversation
// ======================================

export const createConversation = async (

    title = "Nouvelle conversation"

) => {

    const response = await api.post(

        "/conversations",

        {

            title

        }

    );

    return response.data;

};

// ======================================
// Récupérer une conversation
// ======================================

export const getConversation = async (

    conversationId

) => {

    const response = await api.get(

        `/conversations/${conversationId}`

    );

    return response.data;

};

// ======================================
// Récupérer les messages
// ======================================

export const getMessages = async (

    conversationId

) => {

    const response = await api.get(

        `/conversations/${conversationId}/messages`

    );

    return response.data;

};

// ======================================
// Envoyer un message
// ======================================

export const sendMessage = async (

    conversationId,

    content,

    filiereId = null

) => {

    const response = await api.post(

        `/conversations/${conversationId}/messages`,

        {

            content,

            filiere_id: filiereId

        }

    );

    return response.data;

};

// ======================================
// Renommer une conversation
// ======================================

export const renameConversation = async (

    conversationId,

    title

) => {

    const response = await api.put(

        `/conversations/${conversationId}`,

        {

            title

        }

    );

    return response.data;

};

// ======================================
// Supprimer une conversation
// ======================================

export const deleteConversation = async (

    conversationId

) => {

    const response = await api.delete(

        `/conversations/${conversationId}`

    );

    return response.data;

};