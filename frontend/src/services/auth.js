import api from "./api";

// ==========================================
// Connexion
// ==========================================

export async function login(email, password) {

    try {

        const response = await api.post(

            "/auth/login",

            {

                email,

                password

            }

        );

        return response.data;

    }

    catch (error) {

        throw error.response?.data || error;

    }

}

// ==========================================
// Inscription
// ==========================================

export async function register(userData) {

    try {

        const response = await api.post(

            "/auth/register",

            userData

        );

        return response.data;

    }

    catch (error) {

        throw error.response?.data || error;

    }

}

// ==========================================
// Vérification Email
// ==========================================

export async function verifyEmail(token) {

    try {

        const response = await api.get(

            `/auth/verify/${token}`

        );

        return response.data;

    }

    catch (error) {

        throw error.response?.data || error;

    }

}

// ==========================================
// Déconnexion
// ==========================================

export function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

}

// ==========================================
// Utilisateur connecté
// ==========================================

export function getCurrentUser() {

    const user = localStorage.getItem("user");

    if (!user) {

        return null;

    }

    return JSON.parse(user);

}

// ==========================================
// Token
// ==========================================

export function getToken() {

    return localStorage.getItem("token");

}

// ==========================================
// Connecté ?
// ==========================================

export function isAuthenticated() {

    return !!localStorage.getItem("token");

}