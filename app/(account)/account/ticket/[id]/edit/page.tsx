'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import { set } from 'lodash'

const GivennameRegex = /^[ก-๏a-zA-Z]{1,20}$/
const FamilynameRegex = /^[ก-๏a-zA-Z\s]{1,30}$/

export default function EditProfile() {
    const router = useRouter()
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            return router.push('/register')
        },
    })
    const [honorificPrefix, setHonorificPrefix] = useState('')

    const [givenName, setGivenName] = useState('')
    const [validGivenName, setValidGivenName] = useState(true)
    const [GivenNameFocus, setGivenNameFocus] = useState(false)

    const [familyName, setFamilyName] = useState('')
    const [validFamilyName, setValidFamilyName] = useState(true)
    const [FamilyNameFocus, setFamilyNameFocus] = useState(false)

    const userRef = useRef()
    const errRef = useRef()

    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    const Submit = () => {
        // session?.user.name = givenName + ' ' + familyName
        setValidGivenName(GivennameRegex.test(givenName))
        setValidFamilyName(FamilynameRegex.test(familyName))
        if (validGivenName && validFamilyName) {
            setErrMsg('')
            setSuccess(true)
        }
        if (!validGivenName) {
            setErrMsg('กรุณาใส่ชื่อให้ถูกต้อง')
        }
        if (!validFamilyName) {
            setErrMsg('กรุณาใส่นามสกุลให้ถูกต้อง')
        }
        if (!validGivenName && !validFamilyName) {
            setErrMsg('กรุณาใส่ชื่อและนามสกุลให้ถูกต้อง')
        }
    }

    useEffect(() => {
        setErrMsg('')
    }, [GivenNameFocus, FamilyNameFocus])

    if (status !== 'authenticated') return null

    return (
        <>
            <Head>
                <title>Dashboard | MWIT Open House 2024</title>
                <meta
                    name='description'
                    content='MWIT Open House 2024 Dashboard'
                />
            </Head>
            <title>Dashboard | MWIT Open House 2024</title>
            <meta name='description' content='MWIT Open House 2024 Dashboard' />
            <main className='w-full bg-sdbg/75'>
                <div className='flex flex-col text-white gap-6 items-center mx-auto justify-self-center w-full max-w-8xl px-4 py-10'>
                    <span className='font-CS font-bold text-2xl md:text-3xl lg:text-4xl'>ลงทะเบียนเข้าร่วมงานล่วงหน้า
                    </span>
                    <span className='flex flex-col items-center p-2 bg-white bg-opacity-50 rounded-lg'>
                        <div className='font-CS font-bold flex flex-col items-center px-4 '>
                            <div className='w-full px-2 pb-8 sm:max-w-xl sm:rounded-lg'>
                                <div className='grid max-w-2xl mx-auto'>
                                    
                                </div>
                            </div>
                        </div>
                    </span>
                </div>
            </main>
        </>
    )
}

const Options: {
    value: string
    label: string
}[] = [
    {
        value: 'นาย',
        label: 'นาย',
    },
    {
        value: 'นาง',
        label: 'นาง',
    },
    {
        value: 'นางสาว',
        label: 'นางสาว',
    },
    {
        value: 'อื่นๆ',
        label: 'อื่นๆ',
    },
]
