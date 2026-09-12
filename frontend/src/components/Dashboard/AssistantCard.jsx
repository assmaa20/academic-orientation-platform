import {
    FaRobot,
    FaArrowRight
} from "react-icons/fa";

export default function AssistantCard(){

    return(

        <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white shadow-xl">

            <FaRobot className="text-6xl"/>

            <h2 className="text-3xl font-black mt-8">

                Assistant IA

            </h2>

            <p className="mt-5 leading-8 text-blue-100">

                Posez toutes vos questions sur les universités,

                les filières,

                les métiers

                et obtenez une réponse instantanément.

            </p>

            <button className="mt-8 bg-white text-blue-700 font-bold rounded-xl px-7 py-4 flex items-center gap-3 hover:scale-105 transition">

                Discuter

                <FaArrowRight/>

            </button>

        </div>

    );

}