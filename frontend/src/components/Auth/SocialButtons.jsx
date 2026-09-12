import {
  FaGoogle,
  FaMicrosoft,
} from "react-icons/fa";

export default function SocialButtons() {

  return (

    <div className="space-y-4 mt-8">

      <button className="w-full border rounded-xl py-3 hover:bg-slate-50 transition flex justify-center items-center gap-3">

        <FaGoogle className="text-red-500"/>

        Continuer avec Google

      </button>

      <button className="w-full border rounded-xl py-3 hover:bg-slate-50 transition flex justify-center items-center gap-3">

        <FaMicrosoft className="text-blue-600"/>

        Continuer avec Microsoft

      </button>

    </div>

  );

}