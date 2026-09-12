import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import SocialButtons from "./SocialButtons";

import { login as loginService } from "../../services/auth";
import { useAuth } from "../../context/AuthContext";

export default function LoginForm() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            const data = await loginService(

                email,

                password

            );

            login(

                data.user,

                data.access_token

            );

            navigate("/dashboard");

        }

        catch (err) {

            setError(

                err.detail ||

                err.message ||

                "Email ou mot de passe incorrect."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <form
            onSubmit={handleLogin}
            className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md"
        >

            <h2 className="text-4xl font-bold">

                Connexion

            </h2>

            <p className="text-slate-500 mt-3">

                Connectez-vous à votre compte.

            </p>

            {error && (

                <div className="mt-6 bg-red-100 text-red-700 p-3 rounded-xl">

                    {error}

                </div>

            )}

            <input

                type="email"

                value={email}

                onChange={(e) => setEmail(e.target.value)}

                className="w-full mt-8 border rounded-xl p-4"

                placeholder="Adresse e-mail"

                required

            />

            <input

                type="password"

                value={password}

                onChange={(e) => setPassword(e.target.value)}

                className="w-full mt-5 border rounded-xl p-4"

                placeholder="Mot de passe"

                required

            />

            <button

                type="submit"

                disabled={loading}

                className="w-full bg-blue-600 text-white rounded-xl py-4 mt-8 hover:bg-blue-700 transition"

            >

                {

                    loading

                        ? "Connexion..."

                        : "Se connecter"

                }

            </button>

            <div className="text-center my-6 text-slate-400">

                OU

            </div>

            <SocialButtons />

            <p className="text-center mt-8">

                Pas encore de compte ?

                <Link

                    to="/register"

                    className="text-blue-600 font-semibold ml-2"

                >

                    Créer un compte

                </Link>

            </p>

        </form>

    );

}