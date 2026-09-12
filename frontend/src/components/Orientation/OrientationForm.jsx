import { useState } from "react";

import {
    FaGraduationCap,
    FaGlobe,
    FaBrain,
    FaUniversity,
    FaSearch
} from "react-icons/fa";

export default function OrientationForm({ onSubmit }) {

    const [form, setForm] = useState({

        bac: "",

        langue: "",

        niveau: "",

        mode: "",

        interets: []

    });

    // ==========================================
    // Options
    // ==========================================

    const bacs = [

        "Sciences Math A",
        "Sciences Math B",
        "Sciences Physiques",
        "SVT",
        "Économie",
        "Lettres",
        "Technique"

    ];

    const langues = [

        "Français",
        "Anglais",
        "Arabe"

    ];

    const niveaux = [

        "Licence",
        "Ingénieur",
        "Master"

    ];

    const modes = [

        "Présentiel",
        "Distance",
        "Alternance"

    ];

    const interets = [

        "Informatique",
        "Intelligence Artificielle",
        "Data Science",
        "Big Data",
        "Cybersécurité",
        "Développement Web",
        "Robotique",
        "Finance",
        "Commerce",
        "Santé",
        "Droit",
        "Architecture",
        "Agriculture",
        "Design",
        "Communication"

    ];

    // ==========================================
    // Checkbox intérêts
    // ==========================================

    const toggleInteret = (value) => {

        if (form.interets.includes(value)) {

            setForm({

                ...form,

                interets: form.interets.filter(

                    item => item !== value

                )

            });

        }

        else {

            setForm({

                ...form,

                interets: [

                    ...form.interets,

                    value

                ]

            });

        }

    };

    // ==========================================
    // Submit
    // ==========================================

    const handleSubmit = (e) => {

        e.preventDefault();

        onSubmit(form);

    };

    return (

        <form

            onSubmit={handleSubmit}

            className="space-y-8"

        >

            {/* ========================= */}

            <div className="bg-white rounded-3xl shadow p-8">

                <div className="flex items-center gap-3 mb-6">

                    <FaGraduationCap className="text-blue-600 text-2xl" />

                    <h2 className="text-2xl font-bold">

                        Type de baccalauréat

                    </h2>

                </div>

                <div className="grid md:grid-cols-2 gap-4">

                    {

                        bacs.map((bac) => (

                            <label

                                key={bac}

                                className="flex items-center gap-3 border rounded-xl p-4 hover:border-blue-500 cursor-pointer"

                            >

                                <input

                                    type="radio"

                                    name="bac"

                                    checked={form.bac === bac}

                                    onChange={() =>

                                        setForm({

                                            ...form,

                                            bac

                                        })

                                    }

                                />

                                {bac}

                            </label>

                        ))

                    }

                </div>

            </div>

            {/* ========================= */}

            <div className="bg-white rounded-3xl shadow p-8">

                <div className="flex items-center gap-3 mb-6">

                    <FaGlobe className="text-blue-600 text-2xl" />

                    <h2 className="text-2xl font-bold">

                        Langue souhaitée

                    </h2>

                </div>

                <div className="grid md:grid-cols-3 gap-4">

                    {

                        langues.map((langue) => (

                            <label

                                key={langue}

                                className="flex items-center gap-3 border rounded-xl p-4 hover:border-blue-500 cursor-pointer"

                            >

                                <input

                                    type="radio"

                                    name="langue"

                                    checked={form.langue === langue}

                                    onChange={() =>

                                        setForm({

                                            ...form,

                                            langue

                                        })

                                    }

                                />

                                {langue}

                            </label>

                        ))

                    }

                </div>

            </div>

            {/* ========================= */}

            <div className="bg-white rounded-3xl shadow p-8">

                <div className="flex items-center gap-3 mb-6">

                    <FaBrain className="text-blue-600 text-2xl" />

                    <h2 className="text-2xl font-bold">

                        Centres d'intérêt

                    </h2>

                </div>

                <div className="grid md:grid-cols-3 gap-4">

                    {

                        interets.map((item) => (

                            <label

                                key={item}

                                className="flex items-center gap-3 border rounded-xl p-4 hover:border-blue-500 cursor-pointer"

                            >

                                <input

                                    type="checkbox"

                                    checked={form.interets.includes(item)}

                                    onChange={() =>

                                        toggleInteret(item)

                                    }

                                />

                                {item}

                            </label>

                        ))

                    }

                </div>

            </div>

            {/* ========================= */}

            <div className="grid lg:grid-cols-2 gap-8">

                <div className="bg-white rounded-3xl shadow p-8">

                    <div className="flex items-center gap-3 mb-6">

                        <FaUniversity className="text-blue-600 text-2xl" />

                        <h2 className="text-2xl font-bold">

                            Niveau souhaité

                        </h2>

                    </div>

                    <div className="space-y-3">

                        {

                            niveaux.map((niveau) => (

                                <label

                                    key={niveau}

                                    className="flex items-center gap-3 border rounded-xl p-4 hover:border-blue-500 cursor-pointer"

                                >

                                    <input

                                        type="radio"

                                        checked={form.niveau === niveau}

                                        onChange={() =>

                                            setForm({

                                                ...form,

                                                niveau

                                            })

                                        }

                                    />

                                    {niveau}

                                </label>

                            ))

                        }

                    </div>

                </div>

                <div className="bg-white rounded-3xl shadow p-8">

                    <div className="flex items-center gap-3 mb-6">

                        <FaUniversity className="text-blue-600 text-2xl" />

                        <h2 className="text-2xl font-bold">

                            Mode d'étude

                        </h2>

                    </div>

                    <div className="space-y-3">

                        {

                            modes.map((mode) => (

                                <label

                                    key={mode}

                                    className="flex items-center gap-3 border rounded-xl p-4 hover:border-blue-500 cursor-pointer"

                                >

                                    <input

                                        type="radio"

                                        checked={form.mode === mode}

                                        onChange={() =>

                                            setForm({

                                                ...form,

                                                mode

                                            })

                                        }

                                    />

                                    {mode}

                                </label>

                            ))

                        }

                    </div>

                </div>

            </div>

            {/* ========================= */}

            <div className="flex justify-center">

                <button

                    type="submit"

                    className="

                        bg-blue-600

                        hover:bg-blue-700

                        text-white

                        px-12

                        py-4

                        rounded-2xl

                        text-lg

                        font-bold

                        flex

                        items-center

                        gap-3

                        transition

                    "

                >

                    <FaSearch />

                    Trouver mes filières

                </button>

            </div>

        </form>

    );

}