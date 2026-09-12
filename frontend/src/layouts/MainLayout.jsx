import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import { useSidebar } from "../context/SidebarContext";
import { useFullscreen } from "../context/FullscreenContext";

export default function MainLayout() {

    const { collapsed } = useSidebar();

    const { fullscreen } = useFullscreen();

    return (

        <div className="h-screen bg-slate-50 overflow-hidden">

            {!fullscreen && <Sidebar />}

            <div

                className={`
                    h-screen
                    flex
                    flex-col
                    transition-all
                    duration-300

                    ${
                        fullscreen
                            ? "ml-0"
                            : collapsed
                                ? "ml-20"
                                : "ml-72"
                    }
                `}

            >

                {!fullscreen && <Navbar />}

                <main

                    className={`
                        flex-1
                        overflow-y-auto

                        ${
                            fullscreen
                                ? "p-0"
                                : "p-8"
                        }
                    `}

                >

                    <Outlet />

                </main>

            </div>

        </div>

    );

}