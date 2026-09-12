import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
} from "react-icons/fa";

import api from "../../services/api";

export default function VerifyEmail() {

  const { token } = useParams();

  const navigate = useNavigate();

  const alreadyCalled = useRef(false);

  const [status, setStatus] = useState("loading");

  const [message, setMessage] = useState(
    "Vérification de votre compte..."
  );

  useEffect(() => {

    if (alreadyCalled.current) return;

    alreadyCalled.current = true;

    const verify = async () => {

      console.log("Token :", token);

      try {

        console.log("Envoi de la requête...");

        const response = await api.get(
          `/auth/verify/${token}`
        );

        console.log("Réponse :", response.data);

        setStatus("success");

        setMessage(response.data.message);

        setTimeout(() => {

          navigate("/login", {
            replace: true
          });

        }, 3000);

      }

      catch (error) {

        console.error(error);

        setStatus("error");

        setMessage(

          error.response?.data?.detail ||

          "Lien invalide ou expiré."

        );

      }

    };

    verify();

  }, [token, navigate]);

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="bg-white rounded-3xl shadow-xl p-12 w-full max-w-xl text-center">

        {status === "loading" && (

          <>

            <FaSpinner className="text-6xl text-blue-600 animate-spin mx-auto" />

            <h2 className="text-4xl font-bold mt-8">

              Vérification...

            </h2>

            <p className="text-slate-500 mt-4">

              Vérification de votre compte...

            </p>

          </>

        )}

        {status === "success" && (

          <>

            <FaCheckCircle className="text-7xl text-green-500 mx-auto" />

            <h2 className="text-4xl font-bold text-green-600 mt-8">

              Compte activé !

            </h2>

            <p className="mt-4 text-slate-600">

              {message}

            </p>

            <p className="mt-8 text-slate-400">

              Redirection vers la connexion...

            </p>

          </>

        )}

        {status === "error" && (

          <>

            <FaTimesCircle className="text-7xl text-red-500 mx-auto" />

            <h2 className="text-4xl font-bold text-red-600 mt-8">

              Lien invalide

            </h2>

            <p className="mt-4 text-slate-600">

              {message}

            </p>

          </>

        )}

      </div>

    </div>

  );

}

