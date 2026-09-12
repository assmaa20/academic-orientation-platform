import { useEffect, useState } from "react";
import {
    updateProfile,
    updatePassword
} from "../../services/profileService";

export default function EditProfileModal({

    open,
    onClose,
    user,
    onSuccess

}) {

    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [loadingPassword, setLoadingPassword] = useState(false);

    useEffect(() => {

        if (user) {

            setPrenom(user.prenom || "");
            setNom(user.nom || "");
            setEmail(user.email || "");

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

        }

    }, [user]);

    if (!open) return null;

    // =====================================================
    // Modifier le profil
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await updateProfile({

                prenom,
                nom,
                email

            });

            alert("Profil mis à jour avec succès.");

            onSuccess();

            onClose();

        }

        catch (err) {

            alert(

                err.response?.data?.detail ||

                "Erreur lors de la modification."

            );

        }

        finally {

            setLoading(false);

        }

    };

    // =====================================================
    // Modifier le mot de passe
    // =====================================================

    const handlePassword = async (e) => {

        e.preventDefault();

        if (

            !currentPassword ||

            !newPassword ||

            !confirmPassword

        ) {

            alert("Veuillez remplir tous les champs.");

            return;

        }

        if (newPassword !== confirmPassword) {

            alert("Les mots de passe ne correspondent pas.");

            return;

        }

        try {

            setLoadingPassword(true);

            await updatePassword({

                current_password: currentPassword,

                new_password: newPassword

            });

            alert("Mot de passe modifié avec succès.");

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

        }

        catch (err) {

            alert(

                err.response?.data?.detail ||

                "Erreur lors du changement du mot de passe."

            );

        }

        finally {

            setLoadingPassword(false);

        }

    };

    return (

        <div
            className="
                fixed
                inset-0
                z-50
                bg-black/50
                flex
                items-center
                justify-center
                p-6
            "
        >

            <div
                className="
                    bg-white
                    rounded-3xl
                    shadow-2xl
                    w-full
                    max-w-2xl
                    max-h-[90vh]
                    overflow-y-auto
                    p-8
                "
            >

                <h2 className="text-3xl font-bold text-slate-800 mb-8">
                    Modifier le profil
                </h2>

                {/* ====================== */}
                {/* Informations personnelles */}
                {/* ====================== */}

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        <div>

                            <label className="block font-semibold text-slate-700 mb-2">
                                Prénom
                            </label>

                            <input
                                value={prenom}
                                onChange={(e) => setPrenom(e.target.value)}
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-300
                                    px-4
                                    py-3
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                "
                            />

                        </div>

                        <div>

                            <label className="block font-semibold text-slate-700 mb-2">
                                Nom
                            </label>

                            <input
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-300
                                    px-4
                                    py-3
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                "
                            />

                        </div>

                        <div>

                            <label className="block font-semibold text-slate-700 mb-2">
                                Email
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-300
                                    px-4
                                    py-3
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                "
                            />

                        </div>

                        <div className="flex justify-end gap-4 pt-2">

                            <button
                                type="button"
                                onClick={onClose}
                                className="
                                    px-6
                                    py-3
                                    rounded-xl
                                    border
                                    border-slate-300
                                    hover:bg-slate-100
                                    transition
                                "
                            >
                                Annuler
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="
                                    px-6
                                    py-3
                                    rounded-xl
                                    bg-blue-600
                                    hover:bg-blue-700
                                    text-white
                                    transition
                                "
                            >
                                {loading ? "Enregistrement..." : "Enregistrer"}
                            </button>

                        </div>

                    </form>

                </div>

                <div className="border-t my-8"></div>

                {/* ====================== */}
                {/* Mot de passe */}
                {/* ====================== */}

                <h2 className="text-3xl font-bold text-slate-800 mb-6">
                    Changer le mot de passe
                </h2>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">

                    <form
                        onSubmit={handlePassword}
                        className="space-y-5"
                    >

                        <div>

                            <label className="block font-semibold text-slate-700 mb-2">
                                Mot de passe actuel
                            </label>

                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-300
                                    px-4
                                    py-3
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-green-500
                                "
                            />

                        </div>

                        <div>

                            <label className="block font-semibold text-slate-700 mb-2">
                                Nouveau mot de passe
                            </label>

                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-300
                                    px-4
                                    py-3
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-green-500
                                "
                            />

                        </div>

                        <div>

                            <label className="block font-semibold text-slate-700 mb-2">
                                Confirmer le nouveau mot de passe
                            </label>

                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-300
                                    px-4
                                    py-3
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-green-500
                                "
                            />

                        </div>

                        <div className="flex justify-end pt-2">

                            <button
                                type="submit"
                                disabled={loadingPassword}
                                className="
                                    px-6
                                    py-3
                                    rounded-xl
                                    bg-green-600
                                    hover:bg-green-700
                                    text-white
                                    transition
                                "
                            >
                                {loadingPassword
                                    ? "Modification..."
                                    : "Modifier le mot de passe"}
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}