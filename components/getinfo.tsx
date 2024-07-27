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
const PhoneRegex = /^[0-9]{3}\-[0-9]{3}\-[0-9]{4}$/
const AgeRegex = /^[0-9]{1,3}$/

export default function GetInfo() {
    const router = useRouter()
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            return router.push('/register')
        },
    })

    const [pass, setPass] = useState(false)

    const [honorificPrefix, setHonorificPrefix] = useState('')
    const [Status, setStatus] = useState('')
    const [Province, setProvince] = useState('')

    const [givenName, setGivenName] = useState('')
    const [validGivenName, setValidGivenName] = useState(true)
    const [GivenNameFocus, setGivenNameFocus] = useState(false)
    const [givenNameErrmsg, setGivenNameErrmsg] = useState('')

    const [familyName, setFamilyName] = useState('')
    const [validFamilyName, setValidFamilyName] = useState(true)
    const [FamilyNameFocus, setFamilyNameFocus] = useState(false)
    const [familyNameErrmsg, setFamilyNameErrmsg] = useState('')

    const [phone, setPhone] = useState('')
    const [validPhone, setValidPhone] = useState(true)
    const [PhoneFocus, setPhoneFocus] = useState(false)
    const [phoneErrmsg, setPhoneErrmsg] = useState('')

    const [age, setAge] = useState('')
    const [validAge, setValidAge] = useState(true)
    const [AgeFocus, setAgeFocus] = useState(false)
    const [ageErrmsg, setAgeErrmsg] = useState('')

    useEffect(() => {
        setGivenNameErrmsg(
            GivennameRegex.test(givenName) ? '' : 'ชื่อไม่ถูกต้อง',
        )
    }, [givenName])

    useEffect(() => {
        setFamilyNameErrmsg(
            FamilynameRegex.test(familyName) ? '' : 'นามสกุลไม่ถูกต้อง',
        )
    }, [familyName])

    useEffect(() => {
        setPhoneErrmsg(PhoneRegex.test(phone) ? '' : 'เบอร์โทรไม่ถูกต้อง')
    }, [phone])

    useEffect(() => {
        setAgeErrmsg(AgeRegex.test(age) ? '' : 'อายุไม่ถูกต้อง')
    }, [age])

    useEffect(() => {
        setPass(validGivenName && validFamilyName && validPhone && validAge)
    }, [validGivenName, validFamilyName, validPhone, validAge])

    if (status !== 'authenticated') return null

    return (
        <>
            <div className='font-CS font-bold flex flex-col items-center px-4 '>
                <div className='w-full px-2 pb-8 sm:max-w-xl sm:rounded-lg'>
                    <div className='grid max-w-2xl mx-auto'>
                        <div className='items-center mt-4 sm:mt-4 text-[#202142]'>
                            <form className=''>
                                <div className='grid grid-cols-5 gap-4 mt-2'>
                                    <div className='col-span-1'>
                                        <label className='block text-sm font-medium text-white'>
                                            คำนำหน้าชื่อ
                                        </label>
                                        <select
                                            title='คำนำหน้าชื่อ'
                                            className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                            onChange={(e) =>
                                                setHonorificPrefix(
                                                    e.target.value,
                                                )
                                            }
                                        >
                                            <option
                                                id='NotChoose'
                                                value='NotChoose'
                                                unselectable='on'
                                            >
                                                เลือก
                                            </option>
                                            <option id='นาย' value='นาย'>
                                                นาย
                                            </option>
                                            <option id='นาง' value='นาง'>
                                                นาง
                                            </option>
                                            <option id='นางสาว' value='นางสาว'>
                                                นางสาว
                                            </option>
                                        </select>
                                    </div>
                                    <div className='col-span-2'>
                                        <label className='block text-sm font-medium text-white'>
                                            ชื่อ
                                        </label>
                                        <input
                                            type='text'
                                            placeholder='รักวิทย์'
                                            className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                        />
                                    </div>
                                    <div className='col-span-2'>
                                        <label className='block text-sm font-medium text-white'>
                                            นามสกุล
                                        </label>
                                        <input
                                            type='text'
                                            placeholder='ขยันเรียน'
                                            className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                        />
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-4 mt-2'>
                                    <div className='col-span-1'>
                                        <label className='block text-sm font-medium text-white'>
                                            สถานะ
                                        </label>
                                        <select
                                            title='สถานะ'
                                            className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                        >
                                            <option
                                                selected
                                                unselectable='on'
                                                id='UnSelected'
                                                value='Unselected'
                                                hidden={true}
                                            >
                                                -- กรุณาเลือก --
                                            </option>
                                            {StatusOptions.map((option) => (
                                                <option
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='col-span-1'>
                                        <label className='block text-sm font-medium text-white'>
                                            เบอร์โทรติดต่อ
                                        </label>
                                        <input
                                            type='text'
                                            placeholder='012-245-6789'
                                            className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                        />
                                    </div>
                                </div>
                                <div className='grid grid-cols-5 gap-4 mt-2'>
                                    <div className='col-span-1'>
                                        <label className='block text-sm font-medium text-white'>
                                            อายุ
                                        </label>
                                        <input
                                            type='number'
                                            placeholder='25'
                                            className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                        />
                                    </div>
                                    <div className='col-span-4'>
                                        <label className='block text-sm font-medium text-white'>
                                            จังหวัด
                                        </label>
                                        <select
                                            title='จังหวัด'
                                            className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                        >
                                            <option value='กรุณาเลือก'>
                                                -- กรุณาเลือก --
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
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
]

const StatusOptions: {
    value: string
    label: string
}[] = [
    {
        value: 'ผู้ปกครอง',
        label: 'ผู้ปกครอง',
    },
    {
        value: 'อาจารย์',
        label: 'อาจารย์',
    },
    {
        value: 'นิสิต',
        label: 'นิสิต',
    },
    {
        value: 'ป.1',
        label: 'ป.1',
    },
    {
        value: 'ป.2',
        label: 'ป.2',
    },
    {
        value: 'ป.3',
        label: 'ป.3',
    },
    {
        value: 'ป.4',
        label: 'ป.4',
    },
    {
        value: 'ป.5',
        label: 'ป.5',
    },
    {
        value: 'ป.6',
        label: 'ป.6',
    },
    {
        value: 'ม.1',
        label: 'ม.1',
    },
    {
        value: 'ม.2',
        label: 'ม.2',
    },
    {
        value: 'ม.3',
        label: 'ม.3',
    },
    {
        value: 'ม.4',
        label: 'ม.4',
    },
    {
        value: 'ม.5',
        label: 'ม.5',
    },
    {
        value: 'ม.6',
        label: 'ม.6',
    },
    {
        value: 'ผู้สนใจ',
        label: 'ผู้สนใจ',
    },
]
