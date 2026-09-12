import api from "./api";

// ==========================================================
// Profil utilisateur
// ==========================================================

export const getProfile = async () => {

    const response = await api.get(

        "/profile"

    );

    return response.data;

};

// ==========================================================
// Modifier le profil
// ==========================================================

export const updateProfile = async (

    profile

) => {

    const response = await api.put(

        "/profile",

        profile

    );

    return response.data;

};

// ==========================================================
// Modifier le mot de passe
// ==========================================================

export const updatePassword = async (

    data

) => {

    const response = await api.put(

        "/profile/password",

        data

    );

    return response.data;

};

// ==========================================================
// Statistiques
// ==========================================================

export const getProfileStats = async () => {

    const response = await api.get(

        "/profile/stats"

    );

    return response.data;

};

// ==========================================================
// Préférences d'orientation
// ==========================================================

export const getOrientationPreferences = async () => {

    const response = await api.get(

        "/profile/preferences"

    );

    return response.data;

};

export const updateOrientationPreferences = async (

    preferences

) => {

    const response = await api.put(

        "/profile/preferences",

        preferences

    );

    return response.data;

};

// ==========================================================
// Conversations récentes
// ==========================================================

export const getRecentChats = async () => {

    const response = await api.get(

        "/profile/chats"

    );

    return response.data;

};

// ==========================================================
// Dernières filières consultées
// ==========================================================

export const getRecentFilieres = async () => {

    const response = await api.get(

        "/profile/filieres"

    );

    return response.data;

};

// ==========================================================
// Favoris
// ==========================================================

export const getFavoriteFilieres = async () => {

    const response = await api.get(

        "/profile/favorites"

    );

    return response.data;

};

export const addFavorite = async (

    filiereId

) => {

    const response = await api.post(

        `/profile/favorites/${filiereId}`

    );

    return response.data;

};

export const removeFavorite = async (

    filiereId

) => {

    const response = await api.delete(

        `/profile/favorites/${filiereId}`

    );

    return response.data;

};