import {
    FaDatabase,
    FaRobot,
    FaCheckCircle,
} from "react-icons/fa";

const activities=[

    {
        icon:<FaDatabase/>,
        title:"Base de données",
        desc:"4451 filières disponibles."
    },

    {
        icon:<FaRobot/>,
        title:"Assistant IA",
        desc:"Prêt à répondre."
    },

    {
        icon:<FaCheckCircle/>,
        title:"Serveur",
        desc:"API connectée."
    }

];

export default function ActivityCard(){

    return(

        <div className="bg-white rounded-3xl shadow-lg p-8">

            <h2 className="text-3xl font-black">

                État du système

            </h2>

            <div className="space-y-6 mt-8">

                {

                    activities.map((item,index)=>(

                        <div
                            key={index}
                            className="flex gap-5"
                        >

                            <div className="w-14 h-14 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl">

                                {item.icon}

                            </div>

                            <div>

                                <h3 className="font-bold">

                                    {item.title}

                                </h3>

                                <p className="text-slate-500">

                                    {item.desc}

                                </p>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}