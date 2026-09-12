import {
    FaFacebook,
    FaLinkedin,
    FaGithub
} from "react-icons/fa";

export default function Footer() {

    return (

        <footer className="bg-slate-900 text-white py-20">

            <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-4 gap-10">

                <div>

                    <h2 className="text-3xl font-black">

                        OFM

                    </h2>

                    <p className="mt-6 text-slate-400 leading-8">

                        Orientation Filière Maroc

                        est une plateforme intelligente

                        d'aide à l'orientation universitaire.

                    </p>

                </div>

                <div>

                    <h3 className="font-bold mb-5">

                        Plateforme

                    </h3>

                    <ul className="space-y-3 text-slate-400">

                        <li>Accueil</li>

                        <li>Filières</li>

                        <li>Universités</li>

                        <li>Statistiques</li>

                    </ul>

                </div>

                <div>

                    <h3 className="font-bold mb-5">

                        Ressources

                    </h3>

                    <ul className="space-y-3 text-slate-400">

                        <li>Assistant IA</li>

                        <li>FAQ</li>

                        <li>Support</li>

                    </ul>

                </div>

                <div>

                    <h3 className="font-bold mb-5">

                        Suivez-nous

                    </h3>

                    <div className="flex gap-5 text-3xl">

                        <FaFacebook className="hover:text-blue-400 cursor-pointer" />

                        <FaLinkedin className="hover:text-blue-400 cursor-pointer" />

                        <FaGithub className="hover:text-blue-400 cursor-pointer" />

                    </div>

                </div>

            </div>

            <div className="border-t border-slate-700 mt-16 pt-8 text-center text-slate-500">

                © 2026 Orientation Filière Maroc — Tous droits réservés.

            </div>

        </footer>

    );

}