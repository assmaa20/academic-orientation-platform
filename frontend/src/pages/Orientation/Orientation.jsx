import { useState } from "react";

import {
    FaCompass,
    FaLightbulb
} from "react-icons/fa";

import OrientationForm from "../../components/Orientation/OrientationForm";

import OrientationResultCard from "../../components/Orientation/OrientationResultCard";

import {

    recommendOrientation

} from "../../services/orientationService";

export default function Orientation() {

    const [formData, setFormData] = useState(null);

    const [loading, setLoading] = useState(false);

    const [results, setResults] = useState([]);

    const [explanation, setExplanation] = useState("");

    // ==========================================
    // Soumission du questionnaire
    // ==========================================

    const handleOrientation = async (data) => {

        try {

            setLoading(true);

            setFormData(data);

            const response = await recommendOrientation(

                data

            );

            setResults(

                response.recommendations

            );

            setExplanation(

                response.explanation

            );

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="max-w-7xl mx-auto">

            {/* ========================================== */}
            {/* Header */}
            {/* ========================================== */}

            <div className="mb-10">

                <div className="flex items-center gap-4">

                    <div
                        className="
                            w-16
                            h-16
                            rounded-2xl
                            bg-blue-600
                            flex
                            items-center
                            justify-center
                            text-white
                            text-3xl
                        "
                    >

                        <FaCompass />

                    </div>

                    <div>

                        <h1 className="text-4xl font-bold">

                            Orientation intelligente

                        </h1>

                        <p className="text-slate-500 mt-2">

                            Répondez au questionnaire pour découvrir
                            les filières les plus adaptées à votre profil.

                        </p>

                    </div>

                </div>

            </div>

            {/* ========================================== */}
            {/* Formulaire */}
            {/* ========================================== */}

            <OrientationForm

                onSubmit={handleOrientation}

            />

            {/* ========================================== */}
            {/* Chargement */}
            {/* ========================================== */}

            {

                loading && (

                    <div
                        className="
                            mt-10
                            bg-white
                            rounded-3xl
                            shadow
                            p-10
                            text-center
                        "
                    >

                        <div className="text-2xl font-bold text-blue-600">

                            Recherche des meilleures filières...

                        </div>

                        <p className="text-slate-500 mt-3">

                            OFM AI analyse votre profil.

                        </p>

                    </div>

                )

            }

            {/* ========================================== */}
            {/* Résumé */}
            {/* ========================================== */}

            {

                formData && (

                    <div
                        className="
                            mt-10
                            bg-white
                            rounded-3xl
                            shadow
                            p-8
                        "
                    >

                        <div className="flex items-center gap-3 mb-6">

                            <FaLightbulb className="text-yellow-500 text-2xl" />

                            <h2 className="text-2xl font-bold">

                                Votre profil

                            </h2>

                        </div>

                        <div className="grid md:grid-cols-2 gap-6">

                            <div>

                                <p className="text-slate-500">

                                    Bac

                                </p>

                                <p className="font-semibold">

                                    {formData.bac || "-"}

                                </p>

                            </div>

                            <div>

                                <p className="text-slate-500">

                                    Langue

                                </p>

                                <p className="font-semibold">

                                    {formData.langue || "-"}

                                </p>

                            </div>

                            <div>

                                <p className="text-slate-500">

                                    Niveau

                                </p>

                                <p className="font-semibold">

                                    {formData.niveau || "-"}

                                </p>

                            </div>

                            <div>

                                <p className="text-slate-500">

                                    Mode d'étude

                                </p>

                                <p className="font-semibold">

                                    {formData.mode || "-"}

                                </p>

                            </div>

                        </div>

                        <div className="mt-8">

                            <p className="text-slate-500 mb-3">

                                Centres d'intérêt

                            </p>

                            <div className="flex flex-wrap gap-3">

                                {

                                    formData.interets.length > 0

                                        ?

                                        formData.interets.map((item) => (

                                            <span

                                                key={item}

                                                className="
                                                    bg-blue-100
                                                    text-blue-700
                                                    px-4
                                                    py-2
                                                    rounded-full
                                                "

                                            >

                                                {item}

                                            </span>

                                        ))

                                        :

                                        <span>

                                            Aucun

                                        </span>

                                }

                            </div>

                        </div>

                    </div>

                )

            }

            {/* ========================================== */}
            {/* Analyse OFM AI */}
            {/* ========================================== */}

            {

                explanation && (

                    <div
                        className="
                            mt-10
                            bg-blue-50
                            border
                            border-blue-200
                            rounded-3xl
                            p-8
                        "
                    >

                        <h2 className="text-2xl font-bold mb-4">

                            🤖 Analyse OFM AI

                        </h2>

                        <p className="leading-8 whitespace-pre-wrap">

                            {explanation}

                        </p>

                    </div>

                )

            }
            {/* ========================================== */}
            {/* Résultats */}
            {/* ========================================== */}

            {

                results.length > 0 && (

                    <div className="mt-12">

                        <div className="flex items-center justify-between mb-8">

                            <div>

                                <h2 className="text-3xl font-bold">

                                    Vos meilleures recommandations

                                </h2>

                                <p className="text-slate-500 mt-2">

                                    {results.length} filière(s) correspondent à votre profil.

                                </p>

                            </div>

                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                            {

                                results.map((filiere) => (

                                    <OrientationResultCard

                                        key={filiere.id}

                                        filiere={filiere}

                                    />

                                ))

                            }

                        </div>

                    </div>

                )

            }

        </div>

    );

}