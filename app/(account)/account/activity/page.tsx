'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import useSWR, { SWRResponse } from 'swr'

interface registrationData extends SWRResponse {
    data: any
}

export default function Dashboard() {
    const router = useRouter()
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            return router.push('/register')
        },
    })
    const { data: registrationData, error: registrationError, mutate }: registrationData = useSWR('/api/register')
    const [showQr, setShowQr] = useState<string[]>([])

    if (status !== 'authenticated') return null
    console.log(registrationData)
    return (
        <>
            <title>Activity | MWIT Open House 2024</title>
            <meta name='description' content='MWIT Open House 2024 Dashboard' />
            <main className='w-full bg-phd/50'>
                <div className='container py-8 px-4 md:mx-auto md:max-w-screen-lg font-CS'>
                    <div className='grid grid-cols-1 md:grid-cols-1 gap-4 mt-8'>
                        <span className='items-center mx-auto justify-self-center font-CS font-bold text-bmw text-3xl md:text-4xl lg:text-5xl'>
                            Activity
                        </span>
                        <div className='px-3 py-1 mt-2 mb-4 font-IBMPlex text-center text-base md:text-lg text-bbk'>
                            ลงทะเบียนเข้าร่วมกิจกรรมล่วงหน้า
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
