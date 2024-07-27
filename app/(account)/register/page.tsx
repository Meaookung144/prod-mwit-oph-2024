"use client";

import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Register() {
    const router = useRouter();
    const { data: session, status } = useSession({
        required: false
    });
    if (status !== 'unauthenticated') {
        if (status === 'authenticated') router.push('/account');
        return null;
    }
    return (
        <>
            <title>Register | MWIT Open House 2024</title>
            <meta name='description' content='Login / Register to MWIT Open House 2024' />
            <main className='w-full bg-gray-300/30'>
                <div className='flex flex-col text-black gap-10 items-center mx-auto justify-self-center w-full max-w-7xl px-8 py-10'>
                    <div className='flex flex-col justify-center items-center gap-4'>
                        <span className='font-CS font-bold text-3xl md:text-4xl lg:text-5xl'>
                            Register
                        </span>
                        <span className='font-CS font-bold text-red-600 text-2xl md:text-3xl ld:text-4xl'>สำหรับผู้ปกครองลงทะเบียนเท่านั้น</span>
                        <div className='flex font-IBMPlexLoop text-gray-700 text-base md:text-lg gap-2'>
                            <span
                              onClick={() => signIn('google')}
                              className=''
                            >
                                <button className='flex justify-center items-center gap-2 w-60 h-12 bg-white rounded-lg shadow-md'>
                                    <Image
                                        src='/img/google-icon.png'
                                        alt='Google Icon'
                                        width={24}
                                        height={24}
                                    />
                                    Sign in with Google
                                </button>
                            </span>
                        </div>
                        <div className='flex flex-wrap justify-center items-center text-center font-IBMPlexLoop text-gray-700 text-base md:text-lg gap-2'>
                            <span className='text-nowrap'>พบปัญหาในการลงทะเบียน?</span>
                            <Link legacyBehavior href={'https://m.me/MWITOpenHouse'}>
                                <a className='underline text-nowrap'>
                                    ติดต่อทาง Inbox Page MWIT Open House 2024
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
