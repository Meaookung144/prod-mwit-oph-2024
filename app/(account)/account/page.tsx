/* eslint-disable @next/next/no-img-element */
'use client'

import { faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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

    const allowPreRegister = ((new Date().getTime() < new Date('2024-01-01T00:00:00.000Z').getTime()) && (new Date().getTime() > new Date('2023-12-01T00:00:00.000Z').getTime())) || process.env.NODE_ENV === 'development'
    const allowWalkIn = ((new Date().getTime() < new Date('2024-01-01T00:00:00.000Z').getTime()) && (new Date().getTime() > new Date('2023-12-01T00:00:00.000Z').getTime())) || process.env.NODE_ENV === 'development'

    if (status !== 'authenticated') return null
    return (
        <>
            <title>Dashboard | MWIT Open House 2024</title>
            <meta name='description' content='MWIT Open House 2024 Dashboard' />
            <main className='w-full bg-sdbg/75'>
                <div className='container py-8 px-4 md:mx-auto md:max-w-screen-lg font-CS'>
                    <div className='grid grid-cols-1 md:grid-cols-1 gap-4 mt-8'>
                        <div className='relative items-center mx-1 py-6 p-2 lg:p-6 bg-white shadow-md rounded-lg'>
                            <div className='absolute mx-2 md:mx-0 md:my-2 -left-6 md:-left-10 md:-top-0 w-20 md:w-24 md:h-24'>
                                <img
                                    src={session.user.image as string}
                                    alt='Profile Image'
                                    className='rounded-full border-2 border-white shadow-md'
                                />
                            </div>
                            <div className='ml-16 flex flex-row  justify-between'>
                                <div>
                                    <h2 className='text-2xl md:text-3xl font-semibold'>
                                        {session.user.prefix ?? ''}{session.user.name}
                                    </h2>
                                    <p className='mt-2 text-gray-600'>
                                        <b>Email:</b> {session.user.email}
                                    </p>
                                </div>
                                <div className='mt-2 md:mt-0'>
                                    <Link href='/account/editprofile'>
                                        <button
                                            type='button'
                                            className='mt-0 text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:rinmx-1 g-4 focus:ring-gray-300 font-medium rounded-lg text-base px-5 py-2.5 me-1 transition-all duration-300 ease-in-out'
                                        >
                                            แก้ไขโปรไฟล์
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex gap-3 mt-3 px-3">
                                {registrationData?.registered ? (
                                    <Link href="/account/ticket/id" className="inline-block">
                                        <button
                                            className="text-base font-semibold bg-purple-800 rounded-full text-white px-5 py-2 hover:bg-purple-900 transition duration-300"
                                        >
                                            โชว์ QR Code (ที่ลงล่วงหน้า)
                                        </button>
                                    </Link>
                                ) : allowPreRegister ? (
                                    <Link href="/account/ticket/new" className="inline-block">
                                        <button
                                            className="text-base font-semibold bg-blue-800 rounded-full text-white px-5 py-2 hover:bg-blue-900 transition duration-300"
                                        >
                                            ลงทะเบียนล่วงหน้า
                                        </button>
                                    </Link>
                                ) : (
                                    <button
                                        disabled
                                        className="text-base font-semibold bg-gray-500 rounded-full text-white px-5 py-2"
                                    >
                                        ยังไม่ถึงวันเปิดลงทะเบียนล่วงหน้า
                                    </button> 
                                )}
                                {allowWalkIn ? (
                                    <Link href="/account/ticket/new" className="inline-block">
                                        <button
                                            className="text-base font-semibold bg-yellow-800 rounded-full text-white px-5 py-2 hover:bg-yellow-900 transition duration-300"
                                        >
                                            ลงทะเบียน Walk-in
                                        </button>
                                    </Link>
                                ) : (
                                    <button
                                        disabled
                                        className="text-base font-semibold bg-gray-500 rounded-full text-white px-5 py-2"
                                    >
                                        ยังไม่ถึงวันเปิดลงทะเบียน Walk-in
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="flex">
                            {/* <Link href=''>
                                <button
                                    disabled
                                    type='button'
                                    className='mt-2 text-white bg-yellow-800 hover:bg-yellow-900 focus:outline-none focus:rinmx-1 g-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 transition-all duration-300 ease-in-out'
                                >
                                    ลงทะเบียน Walk-in <small>( ยังไม่เปิด )</small>
                                </button>
                            </Link> */}
                        </div>
                        <div className="relative items-center mx-1 py-6 p-4 lg:p-6 bg-gray-100 shadow-lg rounded-lg">
                            <div className="flex md:flex-row flex-col justify-between">
                                <div className="">
                                    <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-800">
                                        ข้อมูลการลงทะเบียน
                                    </h2>
                                    {registrationData?.registered ? (
                                        <p className="mt-2 text-lg font-semibold text-gray-800">
                                            คุณได้ลงทะเบียนเข้าร่วมงานแล้ว
                                        </p>
                                    ) : (
                                        <p className="mt-2 text-lg font-semibold text-gray-800">
                                            คุณยังไม่ได้ลงทะเบียนเข้าร่วมงาน
                                        </p>
                                    )}
                                </div>
                                {
                                    registrationData?.registered && (
                                        <div className="flex flex-col items-start md:items-end">
                                            <div className="mb-2">
                                                <Link href="/account/ticket/id/edit">
                                                    <button
                                                        type="button"
                                                        className="text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-2.5"
                                                    >
                                                        แก้ไขข้อมูล
                                                    </button>
                                                </Link>
                                            </div>
                                            <div className="mb-2">
                                                <Link href="/account/ticket/id">
                                                    <button
                                                        type="button"
                                                        className="text-white bg-gray-700 hover:bg-gray-800 focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-2.5"
                                                    >
                                                        ดูข้อมูล
                                                    </button>
                                                </Link>
                                            </div>  
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
