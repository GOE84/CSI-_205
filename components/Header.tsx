'use client';

import { Badge } from "@/components/tailgrids/core/badge";
import { useAppContext } from "@/context/AppContext";

export default function Header() {
    const { user } = useAppContext();

    return(
        //header contriner
        <>
            <div className="mt-4 text-center">
                {/* code */}
                <div className="flex justify-center gap-4">
                    <Badge className="text-3xl rounded-lg py-1 px-3 bg-red-600 text-white rotate-5">C</Badge>
                    <Badge className="text-3xl rounded-lg py-1 px-3 bg-green-600 text-white -rotate-5">S</Badge>
                    <Badge className="text-3xl rounded-lg py-1 px-4 bg-blue-600 text-white rotate-5" >I</Badge>
                    <Badge className="text-3xl rounded-lg py-1 px-3 bg-sky-400 text-white -rotate-5">2</Badge>
                    <Badge className="text-3xl rounded-lg py-1 px-3 bg-amber-400 text-white rotate-5">0</Badge>
                    <Badge className="text-3xl rounded-lg py-1 px-3 bg-neutral-500 text-white -rotate-5">5</Badge>
                </div>

                {/* name */}
                <div className="mt-1.5">
                    <Badge className="rounded-sm py-1 px-3 text-base text-white bg-zinc-800">FRONT END SOFTWARE DEVELOPMENT</Badge>
                </div>

                {/* user info */}
                {user && (
                    <div className="mt-2 flex flex-wrap justify-center gap-4 text-sm">
                        <span>
                            <strong>ROLE:</strong>{" "}
                            <strong className="text-red-800">{user.role}</strong>
                        </span>
                        <span>
                            <strong>NAME:</strong> {user.name}
                        </span>
                        <span>
                            <strong>EMAIL:</strong> {user.email}
                        </span>
                    </div>
                )}
            </div>
        </>
    )
}
