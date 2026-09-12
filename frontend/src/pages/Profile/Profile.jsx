import { useEffect, useState } from "react";

import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileStats from "../../components/Profile/ProfileStats";
import RecentChats from "../../components/Profile/RecentChats";
import FavoriteFilieres from "../../components/Profile/FavoriteFilieres";
import EditProfileModal from "../../components/Profile/EditProfileModal";

import {
    getProfile,
    getProfileStats,
    getRecentChats,
    getFavoriteFilieres
} from "../../services/profileService";

export default function Profile() {

    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState(null);

    const [stats, setStats] = useState({
        conversations: 0,
        questions: 0,
        filieres: 0,
        favorites: 0
    });

    const [recentChats, setRecentChats] = useState([]);

    const [favorites, setFavorites] = useState([]);

    const [error, setError] = useState(null);

    const [openEdit, setOpenEdit] = useState(false);

    // =====================================================
    // Chargement
    // =====================================================

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {

        try {

            setLoading(true);

            const [
                profile,
                profileStats,
                chats,
                favs
            ] = await Promise.all([
                getProfile(),
                getProfileStats(),
                getRecentChats(),
                getFavoriteFilieres()
            ]);

            setUser(profile);
            setStats(profileStats);
            setRecentChats(chats);
            setFavorites(favs);

        } catch (err) {

            console.error(err);

            setError("Impossible de charger le profil.");

        } finally {

            setLoading(false);

        }

    };

    // =====================================================
    // Modifier
    // =====================================================

    const handleEditProfile = () => {
        setOpenEdit(true);
    };

    // =====================================================
    // Chargement
    // =====================================================

    if (loading) {
        return (
            <div
                className="
                    flex
                    justify-center
                    items-center
                    h-96
                    text-slate-500
                    text-xl
                "
            >
                Chargement du profil...
            </div>
        );
    }

    // =====================================================
    // Erreur
    // =====================================================

    if (error) {
        return (
            <div
                className="
                    bg-red-50
                    border
                    border-red-200
                    text-red-600
                    rounded-2xl
                    p-6
                "
            >
                {error}
            </div>
        );
    }

    // =====================================================
    // Interface
    // =====================================================

    return (

        <div
            className="
                max-w-7xl
                mx-auto
                space-y-8
            "
        >

            <ProfileHeader
                user={user}
                onEdit={handleEditProfile}
            />

            <ProfileStats
                stats={stats}
            />

            <RecentChats
                chats={recentChats}
            />


            <EditProfileModal
                open={openEdit}
                user={user}
                onClose={() => setOpenEdit(false)}
                onSuccess={loadProfile}
            />

        </div>

    );

}