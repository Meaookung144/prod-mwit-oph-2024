'use client'

import React, { useState, useRef, useEffect, ChangeEvent } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import GetInfo from '../../../../../components/getinfo'
import Head from 'next/head'
import { includes, set } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiceOne, faDiceThree, faDiceTwo, faUser, prefix } from '@fortawesome/free-solid-svg-icons'

const GivennameRegex = /^[ก-๏a-zA-Z]{1,20}$/
const FamilynameRegex = /^[ก-๏a-zA-Z\s]{1,30}$/
const PhoneRegex = /^0[0-9]{2}[0-9]{3}[0-9]{4}$/
const AgeRegex = /^[0-9]{1,2}$/
const Regex = {
    givenName: GivennameRegex,
    familyName: FamilynameRegex,
    phone: PhoneRegex,
    age: AgeRegex,
}

export default function EditProfile() {
    const router = useRouter()
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            return router.push('/register')
        },
    })

    const [DaySelected, setDaySelected] = useState('23')

    const GivenName = String(session?.user.name).split(' ')[0]
    const FamilyName = String(session?.user.name).split(' ')[1]

    const EmptyErrorMessage: ErrorMsg = {
        prefix: '',
        givenName: '',
        familyName: '',
        role: '',
        phone: '',
        age: '',
        school: '',
        success: false,
    }

    const EmptyFollower: FollowerInfo = {
        prefix: undefined,
        givenName: undefined,
        familyName: undefined,
        role: undefined,
        phone: undefined,
        age: undefined,
        school: undefined,
        errmsg: EmptyErrorMessage,
    }

    const [followers, setFollowers] = useState<FollowerInfo[]>([])
    const [form, setForm] = useState({
        travel: '',
        travelOther: '',
        expect: '',
        howDidYouKnow: [] as string[],
    })

    const Submit = () => {
        if (followers.some((flinfo) => !flinfo.errmsg.success)) {
            console.log('Invalid follower info')
            return
        }
        console.log(followers)
        console.log(form)
    }

    if (status !== 'authenticated') return null

    const HandleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        if (e.target.id.startsWith('hdy')) {
            const [index, value] = e.target.id.split('-')
            if ((e.target as HTMLInputElement).checked) {
                setForm({ ...form, howDidYouKnow: [...form.howDidYouKnow, value] })
            } else {
                setForm({ ...form, howDidYouKnow: form.howDidYouKnow.filter((v) => v !== value) })
            }
            console.log((e.target as HTMLInputElement).checked)
        } else setForm({ ...form, [e.target.id]: e.target.value })
    }

    const HandleFollowerChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>, i: number) => {
        const newFollowers = [...followers]
        if (e.target.id === 'prefix') {
            newFollowers[i].prefix = e.target.value
            newFollowers[i].errmsg = {
                ...newFollowers[i].errmsg,
                prefix:
                    e.target.value === ''
                        ? 'กรุณาเลือกคำนำหน้า'
                        : Regex.givenName.test(e.target.value)
                        ? ''
                        : 'คำนำหน้าไม่ถูกต้อง',
            }
        } else if (e.target.id === 'role') {
            newFollowers[i].role = e.target.value
            newFollowers[i].errmsg = {
                ...newFollowers[i].errmsg,
                role:
                    e.target.value === ''
                        ? 'กรุณาเลือกสถานะ'
                        : Regex.givenName.test(e.target.value)
                        ? ''
                        : 'สถานะไม่ถูกต้อง',
            }
        } else if (e.target.id === 'age') {
            newFollowers[i].age = parseInt(e.target.value)
            newFollowers[i].errmsg = {
                ...newFollowers[i].errmsg,
                age: e.target.value === '' ? 'กรุณากรอกอายุ' : Regex.age.test(e.target.value) ? '' : 'อายุไม่ถูกต้อง',
            }
        } else if (e.target.id === 'phone') {
            const phone = e.target.value.replace(/-/g, '')
            if (phone.length > 3) {
                newFollowers[i].phone = `${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6)}`
            } else {
                newFollowers[i].phone = phone
            }
            newFollowers[i].errmsg = {
                ...newFollowers[i].errmsg,
                phone:
                    e.target.value === ''
                        ? 'กรุณากรอกเบอร์โทรติดต่อ'
                        : Regex.phone.test(phone)
                        ? ''
                        : 'เบอร์โทรติดต่อไม่ถูกต้อง',
            }
        } else if (e.target.id === 'school') {
            newFollowers[i].school = e.target.value
            newFollowers[i].errmsg = {
                ...newFollowers[i].errmsg,
                school: e.target.value === '' ? 'กรุณากรอกโรงเรียน / มหาลัย / สังกัด' : '',
            }
        } else if (e.target.id === 'givenName') {
            newFollowers[i].givenName = e.target.value
            newFollowers[i].errmsg = {
                ...newFollowers[i].errmsg,
                givenName:
                    e.target.value === ''
                        ? 'กรุณากรอกชื่อ'
                        : Regex.givenName.test(e.target.value)
                        ? ''
                        : 'ชื่อไม่ถูกต้อง',
            }
        } else if (e.target.id === 'familyName') {
            newFollowers[i].familyName = e.target.value
            newFollowers[i].errmsg = {
                ...newFollowers[i].errmsg,
                familyName:
                    e.target.value === ''
                        ? 'กรุณากรอกนามสกุล'
                        : Regex.familyName.test(e.target.value)
                        ? ''
                        : 'นามสกุลไม่ถูกต้อง',
            }
        }
        newFollowers[i].errmsg.success =
            Object.values(newFollowers[i].errmsg).every((v) => v === '') &&
            Object.values(newFollowers[i]).every((v) => v !== undefined)
        setFollowers(newFollowers)
    }

    return (
        <>
            <Head>
                <title>Dashboard | MWIT Open House 2024</title>
                <meta name='description' content='MWIT Open House 2024 Dashboard' />
            </Head>
            <title>Dashboard | MWIT Open House 2024</title>
            <meta name='description' content='MWIT Open House 2024 Dashboard' />
            <main className='w-full bg-sdbg/75'>
                <div className='flex flex-col text-white gap-6 items-center mx-auto justify-self-center w-full max-w-8xl px-4 py-10'>
                    <span className='font-CS font-bold text-2xl md:text-3xl lg:text-4xl'>
                        ลงทะเบียนเข้าร่วมงานล่วงหน้า
                    </span>
                    <span className='flex flex-col items-center p-2 bg-white bg-opacity-80 rounded-lg'>
                        <div className='font-CS font-bold flex flex-col items-center px-4 '>
                            <div className='w-full px-2 pb-2 sm:max-w-xl sm:rounded-lg'>
                                <div className='grid max-w-2xl mx-auto'>
                                    <div className='items-center mt-4 sm:mt-4 text-[#202142]'>
                                        <form className=''>
                                            <div className='flex space-x-4'>
                                                <button
                                                    type='button'
                                                    className={
                                                        'w-full flex flex-col items-center justify-center p-8 text-white text-center rounded-lg ' +
                                                        (DaySelected === '23'
                                                            ? ' bg-blue-600 hover:bg-blue-600 cursor-default'
                                                            : ' bg-blue-400/50 hover:bg-blue-500 cursor-pointer')
                                                    }
                                                    onClick={() => setDaySelected('23')}
                                                >
                                                    <span className='text-2xl mt-2'>ศุกร์</span>
                                                    <span className='text-6xl font-bold'>23</span>
                                                    <span className='text-sm mt-2'>สิงหาคม 2567</span>
                                                </button>
                                                <button
                                                    type='button'
                                                    className={
                                                        'w-full flex flex-col items-center justify-center p-8 text-white text-center rounded-lg hover:bg-blue-700' +
                                                        (DaySelected === '24'
                                                            ? ' bg-purple-600 hover:bg-purple-600 cursor-default'
                                                            : ' bg-purple-400/50 hover:bg-purple-500 cursor-pointer')
                                                    }
                                                    onClick={() => setDaySelected('24')}
                                                >
                                                    <span className='text-2xl mt-2'>เสาร์</span>
                                                    <span className='text-6xl font-bold'>24</span>
                                                    <span className='text-sm mt-2'>สิงหาคม 2567</span>
                                                </button>
                                            </div>
                                            <span className='flex gap-1 font-IBMPlex font-semibold py-2 text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-[#ac5aa2] to-[#9f46fd] mt-2'>
                                                <FontAwesomeIcon
                                                    icon={faDiceOne}
                                                    className='mt-[0.15rem] h-[1em] mr-2 text-[#ac5aa2]'
                                                />
                                                ข้อมูลส่วนตัวผู้ปกครอง
                                                <button
                                                    className='bg-pink-500 text-white rounded-lg px-2 text-base float-right'
                                                    onClick={() => {
                                                        router.push('/account/editprofile')
                                                    }}
                                                    type='button'
                                                >
                                                    แก้ไข
                                                </button>
                                            </span>
                                            <div className='grid grid-cols-5 gap-4'>
                                                <div className='col-span-1'>
                                                    <label className='block text-base font-medium text-black'>
                                                        คำนำหน้า
                                                    </label>
                                                    <input
                                                        type='text'
                                                        unselectable='on'
                                                        placeholder=''
                                                        value={session?.user.prefix}
                                                        disabled
                                                        className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-[#F4F4F6] disabled:text-[#585872]'
                                                    />
                                                </div>
                                                <div className='col-span-2'>
                                                    <label className='block text-base font-medium text-black'>
                                                        ชื่อ
                                                    </label>
                                                    <input
                                                        type='text'
                                                        unselectable='on'
                                                        placeholder=''
                                                        value={GivenName}
                                                        disabled
                                                        className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-[#F4F4F6] disabled:text-[#585872]'
                                                    />
                                                </div>
                                                <div className='col-span-2'>
                                                    <label className='block text-base font-medium text-black'>
                                                        นามสกุล
                                                    </label>
                                                    <input
                                                        type='text'
                                                        placeholder=''
                                                        value={FamilyName}
                                                        disabled
                                                        className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-[#F4F4F6] disabled:text-[#585872]'
                                                    />
                                                </div>
                                            </div>
                                            <div className='grid grid-cols-2 gap-4 mt-2'>
                                                <div className='col-span-1'>
                                                    <label className='block text-base font-medium text-black'>
                                                        สถานะ
                                                    </label>
                                                    <input
                                                        type='text'
                                                        placeholder=''
                                                        value={session?.user.role}
                                                        disabled
                                                        className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-[#F4F4F6] disabled:text-[#585872]'
                                                    />
                                                </div>
                                                <div className='col-span-1'>
                                                    <label className='block text-base font-medium text-black'>
                                                        เบอร์โทรติดต่อ
                                                    </label>
                                                    <input
                                                        type='text'
                                                        placeholder=''
                                                        value={session?.user.telephone}
                                                        disabled
                                                        className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-[#F4F4F6] disabled:text-[#585872]'
                                                    />
                                                </div>
                                            </div>
                                            <div className='grid grid-cols-5 gap-4 mt-2'>
                                                <div className='col-span-1'>
                                                    <label className='block text-base font-medium text-black'>
                                                        อายุ
                                                    </label>
                                                    <input
                                                        type='number'
                                                        placeholder='25'
                                                        disabled
                                                        value={session?.user.age}
                                                        className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-[#F4F4F6] disabled:text-[#585872]'
                                                    />
                                                </div>
                                                <div className='col-span-4'>
                                                    <label className='block text-base font-medium text-black'>
                                                        จังหวัด
                                                    </label>
                                                    <input
                                                        type='text'
                                                        placeholder='-- กรุณาเลือก --'
                                                        disabled
                                                        value={session?.user.province}
                                                        className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-[#F4F4F6] disabled:text-[#585872]'
                                                    />
                                                </div>
                                            </div>
                                            <div className='pt-2'></div>
                                            <span className='pt-4 text-red-500'>
                                                กรุณากรอกข้อมูลด้านบนในหน้าแก้ไขข้อมูลส่วนตัว
                                            </span>
                                            <span className='flex gap-1 font-IBMPlex font-semibold py-2 text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-[#ac5aa2] to-[#9f46fd] mt-2'>
                                                <FontAwesomeIcon
                                                    icon={faDiceTwo}
                                                    className='mt-[0.15rem] h-[1em] mr-2 text-[#ac5aa2]'
                                                />
                                                ข้อมูลสำหรับผู้ติดตาม{' '}
                                                <button
                                                    className='bg-purple-500 text-white rounded-lg px-2 text-base float-right'
                                                    onClick={() => {
                                                        if (followers.length >= 8) return
                                                        setFollowers([...followers, EmptyFollower])
                                                    }}
                                                    disabled={followers.length >= 8}
                                                    type='button'
                                                >
                                                    เพิ่ม
                                                </button>
                                            </span>
                                            {followers.map((flinfo, i) => {
                                                return (
                                                    <div key={i} className='p-3 bg-white bg-opacity-50 rounded-lg mt-2'>
                                                        <div className='text-lg font-semibold text-blue-700'>
                                                            <FontAwesomeIcon
                                                                icon={faUser}
                                                                className='mt-[0.15rem] h-[1em] mr-2'
                                                            />
                                                            ข้อมูลผู้ติดตามที่ {i + 1}
                                                            <button
                                                                type='button'
                                                                className='float-right bg-red-500 text-base text-white rounded-lg px-2'
                                                                onClick={() =>
                                                                    setFollowers(followers.filter((_, j) => j !== i))
                                                                }
                                                            >
                                                                ลบ
                                                            </button>
                                                        </div>
                                                        <hr className='mb-1' />
                                                        <div className='grid grid-cols-5 gap-4'>
                                                            <div className='col-span-1'>
                                                                <label className='block text-base font-medium text-black'>
                                                                    คำนำหน้า
                                                                </label>
                                                                <select
                                                                    title='คำนำหน้า'
                                                                    id='prefix'
                                                                    name='prefix'
                                                                    className='appearance-none mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                                    onChange={(e) => HandleFollowerChange(e, i)}
                                                                    value={flinfo.prefix ?? ''}
                                                                >
                                                                    <option
                                                                        unselectable='on'
                                                                        key={undefined}
                                                                        value={undefined}
                                                                        hidden={true}
                                                                    >
                                                                        เลือก
                                                                    </option>
                                                                    {PrefixOptions.map((option) => {
                                                                        return (
                                                                            <option
                                                                                key={option.value}
                                                                                value={option.value}
                                                                            >
                                                                                {option.label}
                                                                            </option>
                                                                        )
                                                                    })}
                                                                </select>
                                                                <p>
                                                                    <span className='text-red-500'>
                                                                        {flinfo.errmsg.prefix}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                            <div className='col-span-2'>
                                                                <label className='block text-base font-medium text-black'>
                                                                    ชื่อ
                                                                </label>
                                                                <input
                                                                    type='text'
                                                                    placeholder='รักวิทย์'
                                                                    id='givenName'
                                                                    className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                                    value={flinfo.givenName ?? ''}
                                                                    onChange={(e) => HandleFollowerChange(e, i)}
                                                                />
                                                                <p>
                                                                    <span className='text-red-500'>
                                                                        {flinfo.errmsg.givenName}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                            <div className='col-span-2'>
                                                                <label className='block text-base font-medium text-black'>
                                                                    นามสกุล
                                                                </label>
                                                                <input
                                                                    type='text'
                                                                    placeholder='ขยันเรียน'
                                                                    id='familyName'
                                                                    className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                                    value={flinfo.familyName ?? ''}
                                                                    onChange={(e) => HandleFollowerChange(e, i)}
                                                                />
                                                                <p>
                                                                    <span className='text-red-500'>
                                                                        {flinfo.errmsg.familyName}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className='grid grid-cols-2 gap-4 mt-2'>
                                                            <div className='col-span-1'>
                                                                <label className='block text-base font-medium text-black'>
                                                                    สถานะ
                                                                </label>
                                                                <select
                                                                    title='สถานะ'
                                                                    id='role'
                                                                    name='role'
                                                                    className='appearance-none mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                                    onChange={(e) => HandleFollowerChange(e, i)}
                                                                    value={flinfo.role ?? ''}
                                                                >
                                                                    <option
                                                                        unselectable='on'
                                                                        key={undefined}
                                                                        value={undefined}
                                                                        hidden={true}
                                                                    >
                                                                        เลือก
                                                                    </option>
                                                                    {StatusOptions.map((option) => {
                                                                        return (
                                                                            <option
                                                                                key={option.value}
                                                                                value={option.value}
                                                                            >
                                                                                {option.label}
                                                                            </option>
                                                                        )
                                                                    })}
                                                                </select>
                                                                <p>
                                                                    <span className='text-red-500'>
                                                                        {flinfo.errmsg.role}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                            <div className='col-span-1'>
                                                                <label className='block text-base font-medium text-black'>
                                                                    เบอร์โทรติดต่อ
                                                                </label>
                                                                <input
                                                                    type='text'
                                                                    id='phone'
                                                                    placeholder='012-123-1234'
                                                                    maxLength={12}
                                                                    className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                                    value={flinfo.phone ?? ''}
                                                                    onChange={(e) => HandleFollowerChange(e, i)}
                                                                />
                                                                <p>
                                                                    <span className='text-red-500'>
                                                                        {flinfo.errmsg.phone}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className='grid grid-cols-5 gap-4 mt-2'>
                                                            <div className='col-span-1'>
                                                                <label className='block text-base font-medium text-black'>
                                                                    อายุ
                                                                </label>
                                                                <input
                                                                    type='number'
                                                                    placeholder='25'
                                                                    id='age'
                                                                    maxLength={2}
                                                                    className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                                    value={flinfo.age ?? ''}
                                                                    onChange={(e) => HandleFollowerChange(e, i)}
                                                                />
                                                                <p>
                                                                    <span className='text-red-500'>
                                                                        {flinfo.errmsg.age}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                            <div className='col-span-4'>
                                                                <label className='block text-base font-medium text-black'>
                                                                    โรงเรียน / มหาลัย / สังกัด
                                                                </label>
                                                                <input
                                                                    type='text'
                                                                    id='school'
                                                                    placeholder='โรงเรียนมหิดลวิทยานุสรณ์'
                                                                    className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                                    value={flinfo.school ?? ''}
                                                                    onChange={(e) => HandleFollowerChange(e, i)}
                                                                    disabled={
                                                                        ![
                                                                            'นิสิต',
                                                                            'ประถมศึกษาปีที่ 1',
                                                                            'ประถมศึกษาปีที่ 2',
                                                                            'ประถมศึกษาปีที่ 3',
                                                                            'ประถมศึกษาปีที่ 4',
                                                                            'ประถมศึกษาปีที่ 5',
                                                                            'ประถมศึกษาปีที่ 6',
                                                                            'มัธยมศึกษาปีที่ 1',
                                                                            'มัธยมศึกษาปีที่ 2',
                                                                            'มัธยมศึกษาปีที่ 3',
                                                                            'มัธยมศึกษาปีที่ 4',
                                                                            'มัธยมศึกษาปีที่ 5',
                                                                            'มัธยมศึกษาปีที่ 6',
                                                                        ].includes(flinfo.role ?? '')
                                                                    }
                                                                />
                                                                <p>
                                                                    <span className='text-red-500'>
                                                                        {flinfo.errmsg.school}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                            {followers.length === 0 && (
                                                <div className='p-3 bg-white bg-opacity-50 rounded-lg mt-2'>
                                                    <div className='text-lg font-semibold text-blue-700'>
                                                        <FontAwesomeIcon
                                                            icon={faUser}
                                                            className='mt-[0.15rem] h-[1em] mr-2'
                                                        />
                                                        ไม่มีข้อมูลผู้ติดตาม
                                                    </div>
                                                </div>
                                            )}
                                            <span className='flex gap-1 font-IBMPlex font-semibold py-2 text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-[#ac5aa2] to-[#9f46fd] mt-2'>
                                                <FontAwesomeIcon
                                                    icon={faDiceThree}
                                                    className='mt-[0.15rem] h-[1em] mr-2 text-[#ac5aa2]'
                                                />
                                                แบบสอบถามทั่วไป
                                            </span>
                                            <div className='grid grid-cols-5 gap-4'>
                                                <div className='col-span-2'>
                                                    <label className='block text-base font-medium text-black'>
                                                        การเดินทาง
                                                    </label>
                                                    <select
                                                        id='travel'
                                                        name='travel'
                                                        onChange={(e) => HandleChange(e)}
                                                        className='appearance-none mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                    >
                                                        <option value='เลือก' hidden={true}>
                                                            เลือก
                                                        </option>
                                                        {TravelOption.map((option) => (
                                                            <option key={option.value} value={option.value}>
                                                                {option.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className='col-span-3'>
                                                    <label className='block text-base font-medium text-black'>
                                                        โปรดระบุ
                                                    </label>
                                                    <input
                                                        id='travelOther'
                                                        type='text'
                                                        placeholder='การเดินทางอื่นๆ'
                                                        disabled={!['อื่น'].includes(form.travel)}
                                                        className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                    />
                                                </div>
                                            </div>
                                            <div className='col-span-5 mt-2'>
                                                <label className='block text-base font-medium text-black'>
                                                    ท่านคาดหวังอะไรจากการเข้าร่วมงาน
                                                </label>
                                                <input
                                                    id='expect'
                                                    onChange={(e) => HandleChange(e)}
                                                    type='text'
                                                    placeholder='คาดหวังอะไรจากการเข้าร่วมงาน'
                                                    className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                />
                                            </div>
                                            <label className='block text-base font-medium text-black mt-2'>
                                                ท่านทราบเกี่ยวกับ MWIT Open House 2024 จากที่ไหน
                                            </label>
                                            <div className=''>
                                                <div className='flex items-center'>
                                                    <input
                                                        id='hdy-family'
                                                        type='checkbox'
                                                        value=''
                                                        onChange={(e) => HandleChange(e)}
                                                        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                                                    />
                                                    <label className='ms-2 font-medium text-gray-900'>
                                                        จากเพื่อน / พี่ / น้อง
                                                    </label>
                                                </div>
                                                <div className='flex items-center'>
                                                    <input
                                                        id='hdy-genwit'
                                                        type='checkbox'
                                                        value=''
                                                        onChange={(e) => HandleChange(e)}
                                                        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                                                    />
                                                    <label className='ms-2 font-medium text-gray-900'>
                                                        รายการ Genwit
                                                    </label>
                                                </div>
                                                <div className='flex items-center'>
                                                    <input
                                                        id='hdy-school'
                                                        type='checkbox'
                                                        onChange={(e) => HandleChange(e)}
                                                        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                                                    />
                                                    <label className='ms-2 font-medium text-gray-900'>
                                                        การประชาสัมพันธ์จากโรงเรียน
                                                    </label>
                                                </div>
                                                <div className='flex items-center'>
                                                    <input
                                                        id='hdy-council'
                                                        type='checkbox'
                                                        value=''
                                                        onChange={(e) => HandleChange(e)}
                                                        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                                                    />
                                                    <label className='ms-2 font-medium text-gray-900'>
                                                        การประชาสัมพันธ์จาก คณะกรรมการสภานักเรียน
                                                    </label>
                                                </div>
                                                <div className='flex items-center'>
                                                    <input
                                                        id='hdy-other'
                                                        type='checkbox'
                                                        value=''
                                                        onChange={(e) => HandleChange(e)}
                                                        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                                                    />
                                                    <label className='ms-2 font-medium text-gray-900'>อื่นๆ</label>
                                                </div>
                                            </div>
                                        </form>
                                        <hr className='m-2 bg-black border-1 border-black border' />
                                        <span>
                                            เมื่อท่านกดปุ่มลงทะเบียนด้านล่างถือว่าท่านยอมรับ
                                            <a href='/tos' className='text-blue-500' target='_blank'>
                                                เงื่อนไขการให้บริการ
                                            </a>{' '}
                                            และ{' '}
                                            <a href='//pdpa.mwit.ac.th' className='text-blue-500' target='_blank'>
                                                เงื่อนไขข้อมูลส่วนบุคคลของโรงเรียนมหิดลวิทยานุสรณ์
                                            </a>
                                        </span>
                                        <div className='mb-2'></div>
                                        <center>
                                            <button
                                                type='button'
                                                className='flex-28 w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
                                                onClick={() => Submit()}
                                            >
                                                ลงทะเบียน
                                            </button>
                                        </center>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </span>
                </div>
            </main>
        </>
    )
}

const PrefixOptions: {
    value: string
    label: string
}[] = [
    {
        value: 'เด็กชาย',
        label: 'เด็กชาย',
    },
    {
        value: 'เด็กหญิง',
        label: 'เด็กหญิง',
    },
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

type ErrorMsg = {
    prefix: string
    givenName: string
    familyName: string
    role: string
    phone: string
    age: string
    school: string
    success: boolean
}

type FollowerInfo = {
    prefix: string | undefined
    givenName: string | undefined
    familyName: string | undefined
    role: string | undefined
    phone: string | undefined
    age: number | undefined
    school: string | undefined
    errmsg: ErrorMsg
}

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
        value: 'ผู้สนใจทั่วไป',
        label: 'ผู้สนใจทั่วไป',
    },
    {
        value: 'มัธยมศึกษาปีที่ 6',
        label: 'มัธยมศึกษาปีที่ 6',
    },
    {
        value: 'มัธยมศึกษาปีที่ 5',
        label: 'มัธยมศึกษาปีที่ 5',
    },
    {
        value: 'มัธยมศึกษาปีที่ 4',
        label: 'มัธยมศึกษาปีที่ 4',
    },
    {
        value: 'มัธยมศึกษาปีที่ 3',
        label: 'มัธยมศึกษาปีที่ 3',
    },
    {
        value: 'มัธยมศึกษาปีที่ 2',
        label: 'มัธยมศึกษาปีที่ 2',
    },
    {
        value: 'มัธยมศึกษาปีที่ 1',
        label: 'มัธยมศึกษาปีที่ 1',
    },
    {
        value: 'ประถมศึกษาปีที่ 6',
        label: 'ประถมศึกษาปีที่ 6',
    },
    {
        value: 'ประถมศึกษาปีที่ 5',
        label: 'ประถมศึกษาปีที่ 5',
    },
    {
        value: 'ประถมศึกษาปีที่ 4',
        label: 'ประถมศึกษาปีที่ 4',
    },
    {
        value: 'ประถมศึกษาปีที่ 3',
        label: 'ประถมศึกษาปีที่ 3',
    },
    {
        value: 'ประถมศึกษาปีที่ 2',
        label: 'ประถมศึกษาปีที่ 2',
    },
    {
        value: 'ประถมศึกษาปีที่ 1',
        label: 'ประถมศึกษาปีที่ 1',
    },
]
const TravelOption: {
    value: string
    label: string
}[] = [
    {
        value: 'รถยนต์ส่วนตัว',
        label: 'รถยนต์ส่วนตัว',
    },
    {
        value: 'รถไฟ',
        label: 'รถไฟ',
    },
    {
        value: 'รถประจำทาง',
        label: 'รถประจำทาง',
    },
    {
        value: 'รถตู้',
        label: 'รถตู้',
    },
    {
        value: 'เครื่องบิน',
        label: 'เครื่องบิน',
    },
    {
        value: 'จักรยาน',
        label: 'จักรยาน',
    },
    {
        value: 'รถบัส',
        label: 'รถบัส',
    },
    {
        value: 'ยังไม่มั่นใจ',
        label: 'ยังไม่มั่นใจ',
    },
    {
        value: 'อื่น',
        label: 'อื่นๆ (โปรดระบุ)',
    },
]
