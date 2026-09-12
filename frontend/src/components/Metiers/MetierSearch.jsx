import { FaSearch } from "react-icons/fa";

export default function MetierSearch({

    value,

    onChange

}) {

    return (

        <div className="relative">

            <FaSearch

                className="

                    absolute

                    left-5

                    top-1/2

                    -translate-y-1/2

                    text-slate-400

                "

            />

            <input

                type="text"

                placeholder="Rechercher un métier..."

                value={value}

                onChange={(e) =>

                    onChange(

                        e.target.value

                    )

                }

                className="

                    w-full

                    pl-14

                    pr-5

                    py-4

                    rounded-2xl

                    border

                    border-slate-200

                    bg-white

                    shadow-sm

                    focus:outline-none

                    focus:ring-2

                    focus:ring-blue-500

                    focus:border-blue-500

                    transition

                "

            />

        </div>

    );

}