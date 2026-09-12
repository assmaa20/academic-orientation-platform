import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { register } from "../../services/auth";

import SocialButtons from "./SocialButtons";

export default function RegisterForm() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    setSuccess("");

    if (form.password !== form.confirmPassword) {

      setError("Les mots de passe ne correspondent pas.");

      return;

    }

    try {

      await register({
        nom: form.nom,
        prenom: form.prenom,
        email: form.email,
        password: form.password,
      });

      setSuccess("Compte créé avec succès !");

      setTimeout(() => {

        navigate("/login");

      }, 1500);

    } catch (err) {

      if (err.response) {

        setError(err.response.data.detail);

      } else {

        setError("Erreur serveur.");

      }

    }

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md"
    >

      <h2 className="text-4xl font-bold">

        Créer un compte

      </h2>

      <p className="text-slate-500 mt-3">

        Rejoignez Orientation Filière Maroc.

      </p>

      {error && (

        <div className="bg-red-100 text-red-600 rounded-xl p-3 mt-6">

          {error}

        </div>

      )}

      {success && (

        <div className="bg-green-100 text-green-700 rounded-xl p-3 mt-6">

          {success}

        </div>

      )}

      <input
        name="nom"
        placeholder="Nom"
        className="w-full border rounded-xl p-4 mt-6"
        value={form.nom}
        onChange={handleChange}
      />

      <input
        name="prenom"
        placeholder="Prénom"
        className="w-full border rounded-xl p-4 mt-4"
        value={form.prenom}
        onChange={handleChange}
      />

      <input
        name="email"
        type="email"
        placeholder="Adresse e-mail"
        className="w-full border rounded-xl p-4 mt-4"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Mot de passe"
        className="w-full border rounded-xl p-4 mt-4"
        value={form.password}
        onChange={handleChange}
      />

      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirmer le mot de passe"
        className="w-full border rounded-xl p-4 mt-4"
        value={form.confirmPassword}
        onChange={handleChange}
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white rounded-xl py-4 mt-6 hover:bg-blue-700"
      >

        Créer un compte

      </button>

      <div className="text-center my-6 text-slate-400">

        OU

      </div>

      <SocialButtons />

      <p className="text-center mt-8">

        Vous avez déjà un compte ?

        <Link
          to="/login"
          className="text-blue-600 font-semibold ml-2"
        >

          Se connecter

        </Link>

      </p>

    </form>

  );

}