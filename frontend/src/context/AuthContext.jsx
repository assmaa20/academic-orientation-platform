import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

    // ==========================================
    // États
    // ==========================================

    const [user, setUser] = useState(null);

    const [token, setToken] = useState(
        localStorage.getItem("token") || ""
    );

    const [loading, setLoading] = useState(true);

    // ==========================================
    // Charger les données sauvegardées
    // ==========================================

    useEffect(() => {

        const savedUser = localStorage.getItem("user");

        if (savedUser) {

            setUser(JSON.parse(savedUser));

        }

        setLoading(false);

    }, []);

    // ==========================================
    // Connexion
    // ==========================================

    const login = (userData, accessToken) => {

        setUser(userData);

        setToken(accessToken);

        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );

        localStorage.setItem(
            "token",
            accessToken
        );

    };

    // ==========================================
    // Déconnexion
    // ==========================================

    const logout = () => {

        setUser(null);

        setToken("");

        localStorage.removeItem("user");

        localStorage.removeItem("token");

    };

    // ==========================================
    // Valeurs du contexte
    // ==========================================

    const value = {

        user,

        token,

        loading,

        login,

        logout,

        isAuthenticated: token !== ""

    };

    return (

        <AuthContext.Provider value={value}>

            {children}

        </AuthContext.Provider>

    );

}

// ==========================================
// Hook personnalisé
// ==========================================

export function useAuth() {

    return useContext(AuthContext);

}