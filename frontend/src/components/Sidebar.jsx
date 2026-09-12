import {
  FaHome,
  FaGraduationCap,
  FaUniversity,
  FaBriefcase,
  FaCompass,
  FaRobot,
  FaChartBar,
  FaInfoCircle,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";

import { useSidebar } from "../context/SidebarContext";

export default function Sidebar() {

  const navigate = useNavigate();

  const { collapsed } = useSidebar();

  const menu = [

    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/dashboard",
    },

    {
      name: "Filières",
      icon: <FaGraduationCap />,
      path: "/dashboard/filieres",
    },

    {
      name: "Universités",
      icon: <FaUniversity />,
      path: "/dashboard/universites",
    },

    {
      name: "Métiers",
      icon: <FaBriefcase />,
      path: "/dashboard/metiers",
    },

    {
      name: "Orientation",
      icon: <FaCompass />,
      path: "/dashboard/orientation",
    },

    {
      name: "Assistant IA",
      icon: <FaRobot />,
      path: "/dashboard/chat",
    },

    {
      name: "Statistiques",
      icon: <FaChartBar />,
      path: "/dashboard/statistiques",
    },

    {
      name: "À propos",
      icon: <FaInfoCircle />,
      path: "/dashboard/about",
    },

  ];

  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");

  };

  return (

    <aside

      className={`
        fixed
        top-0
        left-0
        h-screen
        bg-slate-900
        text-white
        flex
        flex-col
        shadow-xl
        transition-all
        duration-300
        z-50
        ${collapsed ? "w-20" : "w-72"}
      `}

    >

      {/* ================= Logo ================= */}

      <div className="border-b border-slate-700 p-6 flex flex-col items-center">

        {

          !collapsed ?

          <>

            <h1 className="text-5xl font-black tracking-wide">

              OFM

            </h1>

            <p className="text-slate-400 mt-2 text-sm text-center">

              Orientation Filière Maroc

            </p>

          </>

          :

          <h1 className="text-4xl font-black">

            O

          </h1>

        }

      </div>

      {/* ================= Menu ================= */}

      <nav className="flex-1 overflow-y-auto px-3 py-5">

        {

          menu.map((item) => (

            <NavLink

              key={item.path}

              to={item.path}

              end={item.path === "/dashboard"}

              title={collapsed ? item.name : ""}

              className={({ isActive }) =>

                `

                  flex
                  items-center
                  ${collapsed ? "justify-center" : "justify-start"}
                  gap-4
                  px-5
                  py-4
                  rounded-xl
                  mb-2
                  transition-all
                  duration-200

                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }

                `

              }

            >

              <span className="text-xl flex-shrink-0">

                {item.icon}

              </span>

              {

                !collapsed &&

                <span className="font-medium">

                  {item.name}

                </span>

              }

            </NavLink>

          ))

        }

      </nav>

      {/* ================= Bas ================= */}

      <div className="border-t border-slate-700 p-3">

        <NavLink

          to="/dashboard/profile"

          className={({ isActive }) =>

            `

              flex
              items-center
              ${collapsed ? "justify-center" : "justify-start"}
              gap-4
              px-5
              py-3
              rounded-xl
              mb-2
              transition

              ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }

            `

          }

        >

          <FaUserCircle className="text-xl"/>

          {

            !collapsed &&

            <span>

              Mon Profil

            </span>

          }

        </NavLink>

        <NavLink

          to="/dashboard/settings"

          className={({ isActive }) =>

            `

              flex
              items-center
              ${collapsed ? "justify-center" : "justify-start"}
              gap-4
              px-5
              py-3
              rounded-xl
              mb-2
              transition

              ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }

            `

          }

        >

          <FaCog className="text-xl"/>

          {

            !collapsed &&

            <span>

              Paramètres

            </span>

          }

        </NavLink>

        <button

          onClick={logout}

          className={`
            w-full
            flex
            items-center
            ${collapsed ? "justify-center" : "justify-start"}
            gap-4
            px-5
            py-3
            rounded-xl
            transition
            hover:bg-red-600
            text-red-400
            hover:text-white
          `}

        >

          <FaSignOutAlt className="text-xl"/>

          {

            !collapsed &&

            <span>

              Déconnexion

            </span>

          }

        </button>

      </div>

    </aside>

  );

}