import { useEffect, useState } from "react";

import { useParams, Link, useNavigate } from "react-router-dom";

import {
    FaArrowLeft,
    FaGraduationCap,
    FaUniversity,
    FaGlobe,
    FaBook,
    FaBrain,
    FaBriefcase,
    FaRobot,
    FaCheckCircle
} from "react-icons/fa";

import { getFiliere } from "../../services/filiereService";

export default function FiliereDetail() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [filiere, setFiliere] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadFiliere();

    }, [id]);

    const loadFiliere = async () => {

        try {

            const data = await getFiliere(id);

            setFiliere(data);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="text-center py-20">

                Chargement...

            </div>

        );

    }

    if (!filiere) {

        return (

            <div className="text-center py-20">

                Filière introuvable.

            </div>

        );

    }

    return (

        <div className="max-w-7xl mx-auto">

            {/* Retour */}

            <Link
                to="/dashboard/filieres"
                className="inline-flex items-center gap-2 text-blue-600 mb-8"
            >

                <FaArrowLeft />

                Retour

            </Link>

            {/* Header */}

            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 text-white shadow-xl">

                <h1 className="text-5xl font-bold">

                    {filiere.libelle_diplome}

                </h1>

                <p className="text-xl mt-3">

                    {filiere.discipline}

                </p>

                <div className="flex flex-wrap gap-6 mt-8">

                    <span className="flex items-center gap-2">

                        <FaUniversity />

                        Université {filiere.code_universite}

                    </span>

                    <span className="flex items-center gap-2">

                        <FaGlobe />

                        {filiere.langue}

                    </span>

                    <span className="flex items-center gap-2">

                        <FaGraduationCap />

                        {filiere.duree_accreditation} ans

                    </span>

                </div>

            </div>

            {/* Corps */}

            <div className="grid lg:grid-cols-3 gap-8 mt-10">

                {/* Partie gauche */}

                <div className="lg:col-span-2 space-y-8">

                    {/* Description */}

                    <div className="bg-white rounded-3xl shadow p-8">

                        <h2 className="text-2xl font-bold mb-5">

                            📖 Description

                        </h2>

                        <p className="leading-8 whitespace-pre-wrap">

                            {filiere.description}

                        </p>

                    </div>

                    {/* Compétences */}

                    <div className="bg-white rounded-3xl shadow p-8">

                        <h2 className="text-2xl font-bold mb-5 flex items-center gap-3">

                            <FaBrain />

                            Compétences

                        </h2>

                        <p className="whitespace-pre-wrap leading-8">

                            {filiere.competences}

                        </p>

                    </div>

                    {/* Connaissances */}

                    <div className="bg-white rounded-3xl shadow p-8">

                        <h2 className="text-2xl font-bold mb-5">

                            📚 Connaissances

                        </h2>

                        <p className="whitespace-pre-wrap leading-8">

                            {filiere.connaissances}

                        </p>

                    </div>

                    {/* Matières */}

                    <div className="bg-white rounded-3xl shadow p-8">

                        <h2 className="text-2xl font-bold mb-5 flex items-center gap-3">

                            <FaBook />

                            Matières

                        </h2>

                        <p className="whitespace-pre-wrap leading-8">

                            {filiere.matieres}

                        </p>

                    </div>

                    {/* Débouchés */}

                    <div className="bg-white rounded-3xl shadow p-8">

                        <h2 className="text-2xl font-bold mb-5 flex items-center gap-3">

                            <FaBriefcase />

                            Débouchés

                        </h2>

                        <p className="whitespace-pre-wrap leading-8">

                            {filiere.marche_travail}

                        </p>

                    </div>

                </div>

                {/* Partie droite */}

                <div className="space-y-6">

                    {/* Informations */}

                    <div className="bg-white rounded-3xl shadow p-6">

                        <h2 className="text-xl font-bold mb-5">

                            Informations

                        </h2>

                        <div className="space-y-4">

                            <p>

                                <strong>Session :</strong>{" "}

                                {filiere.session}

                            </p>

                            <p>

                                <strong>Année :</strong>{" "}

                                {filiere.annee}

                            </p>

                            <p>

                                <strong>Validité :</strong>{" "}

                                {filiere.annee_validite}

                            </p>

                            <p>

                                <strong>Bac :</strong>{" "}

                                {filiere.series_bac}

                            </p>

                        </div>

                    </div>

                    {/* Conditions */}

                    <div className="bg-white rounded-3xl shadow p-6">

                        <h2 className="text-xl font-bold mb-5">

                            Conditions d'accès

                        </h2>

                        <div className="space-y-3">

                            <p>

                                <FaCheckCircle className="inline mr-2 text-green-600" />

                                {filiere.acces_dossier}

                            </p>

                            <p>

                                <FaCheckCircle className="inline mr-2 text-green-600" />

                                {filiere.acces_concours}

                            </p>

                            <p>

                                <FaCheckCircle className="inline mr-2 text-green-600" />

                                {filiere.acces_autre}

                            </p>

                        </div>

                    </div>

                    {/* Métiers */}

                    <div className="bg-white rounded-3xl shadow p-6">

                        <h2 className="text-xl font-bold mb-5">

                            Métiers

                        </h2>

                        <p className="whitespace-pre-wrap">

                            {filiere.metiers}

                        </p>

                    </div>

                    {/* Poursuite */}

                    <div className="bg-white rounded-3xl shadow p-6">

                        <h2 className="text-xl font-bold mb-5">

                            Poursuite d'études

                        </h2>

                        <p>

                            {filiere.poursuite_etudes}

                        </p>

                    </div>

                    {/* IA */}

                    <button
                        onClick={() =>
                            navigate(
                                `/dashboard/chat?filiere=${filiere.id}`
                            )
                        }
                        className="
                            w-full
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            rounded-2xl
                            py-4
                            font-bold
                            flex
                            justify-center
                            items-center
                            gap-3
                            transition
                        "
                    >

                        <FaRobot />

                        Demander à OFM AI

                    </button>

                </div>

            </div>

        </div>

    );

}