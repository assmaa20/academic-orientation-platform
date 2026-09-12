import api from "./api";

// ==========================================
// Recommandation d'orientation
// ==========================================

export const recommendOrientation = async (profile) => {

    const response = await api.post(

        "/orientation",

        profile

    );

    return response.data;

};