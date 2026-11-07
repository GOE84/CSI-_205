import { Badge } from "@/components/tailgrids/core/badge";
import { Facebook, Instagram, Twitter } from "@tailgrids/icons";

import Link from "next/link";


export default function Footer() {
    return(
        <div className="mt-4">
            <div className="text-center  ">
                    {/* Student */}
                <div>
                    <Badge className="text-2xl text-black rounded-lg"> 68051254 นาย ภูมิ เดชอวยพรวงศ์</Badge>
                </div>

                {/* contacts */}
                <div>
                    <div className="mt-4 flex justify-center gap-6">
                        <Link href={`https://www.facebook.com/lolutopkjm/`} target="_blank">
                            <Facebook className="text-blue-600"/>
                        </Link>

                        <div className="border-l-1"></div>

                        <Link href={`https://x.com`} target="_blank">
                            <Twitter className=""/>
                        </Link>

                        <div className="border-l-1"></div>

                        <Link href={`https://www.instagram.com`} target="_blank">
                            <Instagram className="text-red-500"/>
                        </Link>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}