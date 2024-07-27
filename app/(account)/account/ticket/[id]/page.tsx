"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import ThreeScene from "../../../../../components/3d/three";

export default function Dashboard() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    const [ showModel, setShowModel ] = useState(false);

    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            return router.push('/register');
        },
    });


    if (status !== 'authenticated') return null;
    return (
        <>
            <title>Ticket | MWIT Open House 2024</title>
            <meta name='description' content='MWIT Open House 2024 Dashboard' />
            {showModel && <ThreeScene />}
            <main className='w-full  h-[calc(100vh-3rem)] bg-sdbg/75'>
                <div className='container py-8 px-4 md:mx-auto md:max-w-screen-lg font-CS'>
                    <div className='flex gap-4 justify-center'>
                        <span className='text-white font-CS font-bold text-xl md:text-2xl lg:text-3xl'>
                            ตั๋วเข้าร่วมงาน&nbsp;MWIT&nbsp;
                            <p className='inline bg-clip-text text-transparent bg-gradient-to-r from-[#8e9dea] to-[#809eff]'>
                                Open House 2024
                            </p>
                        </span>
                        <button className='bg-white rounded-lg shadow-md py-1 px-2' onClick={() => setShowModel(!showModel)}>
                            {showModel ? 'ซ่อน' : 'แสดง'} 3D Model
                        </button>
                    </div>
                </div>
            </main>
        </>
    )
}
