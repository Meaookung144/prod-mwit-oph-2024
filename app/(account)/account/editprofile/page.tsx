'use client'

import React, { useState, ChangeEvent, useEffect } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import { Province, updateInfoAsync } from '../../../../lib/data/user'
import toast, { Toaster } from 'react-hot-toast';

const GivennameRegex = /^[ก-๏a-zA-Z]{1,20}$/
const FamilynameRegex = /^[ก-๏a-zA-Z\s]{1,30}$/
const PhoneRegex = /^0[0-9]{2}-[0-9]{3}-[0-9]{4}$/
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

    const EmptyUserInfo = {
        prefix: session?.user.prefix ?? '',
        givenName: session?.user.name?.split(' ')[0] ?? '',
        familyName: session?.user.name?.split(' ')[1] ?? '',
        role: session?.user.role ?? '',
        telephone: session?.user.telephone ?? '',
        age: session?.user.age ?? 0,
        province: session?.user.province ?? '',
    }
    const EmptyErrorMessage = {
        prefix: '',
        givenName: '',
        familyName: '',
        role: '',
        telephone: '',
        age: '',
        province: '',
        success: false,
    }

    const [userInfo, setUserInfo] = useState(EmptyUserInfo)
    const [errMsg, setErrMsg] = useState(EmptyErrorMessage)

    const handleSubmit = async (btn: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const test = {
            givenName:
                (userInfo.givenName == '' ? 'กรุณากรอกชื่อ' : !Regex.givenName.test(userInfo.givenName) ? 'ชื่อไม่ถูกต้อง' : ''),
            familyName:
                (userInfo.familyName == '' ? 'กรุณากรอกนามสกุล' : !Regex.familyName.test(userInfo.familyName) ? 'นามสกุลไม่ถูกต้อง' : ''),
            telephone:
                (userInfo.telephone == '' ? 'กรุณากรอกเบอร์โทร' : !Regex.phone.test(userInfo.telephone) ? 'เบอร์โทรไม่ถูกต้อง' : ''),
            age:
                (userInfo.age == 0 ? 'กรุณากรอกอายุ' : !Regex.age.test(userInfo.age.toString()) ? 'อายุไม่ถูกต้อง' : ''),
            prefix: (userInfo.prefix == '' ? 'กรุณาเลือกคำนำหน้า' : ''),
            role: (userInfo.role == '' ? 'กรุณาเลือกสถานะ' : ''),
            province: (userInfo.province == '' ? 'กรุณาเลือกจังหวัด' : ''),
        }

        if (
            test.givenName == '' &&
            test.familyName == '' &&
            test.telephone == '' &&
            test.age == '' &&
            test.prefix == '' &&
            test.role == '' &&
            test.province == ''
        ) {
            toast.promise(
                updateInfoAsync({ user: { ...userInfo, name: userInfo.givenName + ' ' + userInfo.familyName, province: userInfo.province as Province, prefix: userInfo.prefix as 'นาย' | 'นาง' | 'นางสาว' } }),
                {
                    loading: 'Saving...',
                    success: <b>Profile saved!</b>,
                    error: <b>Could not save.</b>,
                }
            ).then((result) => {
                setErrMsg({ ...errMsg, success: result })
            }).catch(() => {
                setErrMsg({ ...errMsg, success: false })
            })
        } else {
            setErrMsg({
                success: false,
                ...test
            })
        }
    }
    
    const HandleChange = async (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
        if (e.target.name === 'givenName') {
            setErrMsg({
                ...errMsg,
                givenName:
                    e.target.value === ''
                        ? 'กรุณากรอกชื่อ'
                        : !Regex.givenName.test(e.target.value)
                        ? 'ชื่อไม่ถูกต้อง'
                        : '',
            })
        }
        if (e.target.name === 'familyName') {
            setErrMsg({
                ...errMsg,
                familyName:
                    e.target.value === ''
                        ? 'กรุณากรอกนามสกุล'
                        : !Regex.familyName.test(e.target.value)
                        ? 'นามสกุลไม่ถูกต้อง'
                        : '',
            })
        }
        if (e.target.name === 'age') {
            setErrMsg({
                ...errMsg,
                age: e.target.value === '' ? 'กรุณากรอกอายุ' : !Regex.age.test(e.target.value) ? 'อายุไม่ถูกต้อง' : '',
            })
        }
        if (e.target.name === 'telephone') {
            const phone = e.target.value.replace(/-/g, '')
            if (phone.length > 3) {
                setUserInfo({
                    ...userInfo,
                    telephone: `${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6, 10)}`,
                })
                console.log(e.target.value)
            } else {
                setUserInfo({ ...userInfo, telephone: phone })
            }
            setErrMsg({
                ...errMsg,
                telephone:
                    e.target.value === ''
                        ? 'กรุณากรอกเบอร์โทร'
                        : !Regex.phone.test(e.target.value)
                        ? 'เบอร์โทรไม่ถูกต้อง'
                        : '',
            })
        }
        if (e.target.name === 'age') {
            setErrMsg({
                ...errMsg,
                age: e.target.value === '' ? 'กรุณากรอกอายุ' : !Regex.age.test(e.target.value) ? 'อายุไม่ถูกต้อง' : '',
            })
        }
        if (e.target.name === 'prefix') {
            setErrMsg({ ...errMsg, prefix: e.target.value === 'เลือก' ? 'กรุณาเลือกคำนำหน้า' : '' })
        }
        if (e.target.name === 'role') {
            setErrMsg({ ...errMsg, role: e.target.value === 'กรุณาเลือก' ? 'กรุณาเลือกสถานะ' : '' })
        }
        if (e.target.name === 'province') {
            setErrMsg({ ...errMsg, province: e.target.value === 'กรุณาเลือก' ? 'กรุณาเลือกจังหวัด' : '' })
        }
    }

    useEffect(() => {
        if (session) {
            setUserInfo({
                prefix: session?.user.prefix ?? '',
                givenName: session?.user.name?.split(' ')[0] ?? '',
                familyName: session?.user.name?.split(' ')[1] ?? '',
                role: session?.user.role ?? '',
                telephone: session?.user.telephone ?? '',
                age: session?.user.age ?? 0,
                province: session?.user.province ?? '',
            })
        }
    }, [session])

    if (status !== 'authenticated') return null
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
                        Manage Account <span className='invisible lg:visible'>|</span>
                        <br className='lg:hidden'></br> แก้ไขข้อมูลส่วนบุคคล
                    </span>
                    <span className='flex flex-col items-center p-2 bg-white rounded-lg'>
                        <div className='font-CS font-bold flex flex-col items-center px-4 '>
                            <div className='w-full px-2 pb-8 mt-2 sm:max-w-xl sm:rounded-lg'>
                                <div className='grid max-w-2xl mx-auto mt-8'>
                                    <div className='flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0'>
                                        <Image
                                            alt={'profile picture'}
                                            src={session.user.image as string}
                                            className='object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500'
                                            width={160}
                                            height={160}
                                        />

                                        <div className='flex flex-col space-y-5 sm:ml-8 text-gray-800'>
                                            <button
                                                type='button'
                                                className='py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200'
                                            >
                                                Refetch Profile <small>(From Google)</small>
                                            </button>
                                            <div className='pt-2'></div>
                                            Email : {session.user.email}
                                            <br></br>
                                            UUID : {session.user.id}
                                        </div>
                                    </div>
                                    <br />
                                    <hr />
                                    <div className='items-center mt-4 sm:mt-4 text-[#202142]'>
                                        <form
                                            className=''
                                        >
                                            <div className='grid grid-cols-5 gap-4'>
                                                <div className='col-span-1'>
                                                    <label className='block text-sm font-medium text-gray-800'>
                                                        คำนำหน้า
                                                    </label>
                                                    <select
                                                        id='prefix'
                                                        name='prefix'
                                                        className='font-medium mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                        onChange={(e) => HandleChange(e)}
                                                        defaultValue={session.user.prefix}
                                                    >
                                                        <option value='เลือก' hidden={true}>
                                                            เลือก
                                                        </option>
                                                        {PrefixOptions.map((option) => (
                                                            <option key={option.value} value={option.value}>
                                                                {option.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <p>
                                                        <small className='text-red-500'>{errMsg.prefix}</small>
                                                    </p>
                                                </div>
                                                <div className='col-span-2'>
                                                    <label className='block text-sm font-medium text-gray-800'>
                                                        ชื่อ (ภาษาไทย)
                                                    </label>
                                                    <input
                                                        type='text'
                                                        name='givenName'
                                                        placeholder='รักวิทย์'
                                                        className='font-medium mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                        onChange={(e) => HandleChange(e)}
                                                        value={userInfo.givenName}
                                                    />
                                                    <p>
                                                        <small className='text-red-500'>{errMsg.givenName}</small>
                                                    </p>
                                                </div>
                                                <div className='col-span-2'>
                                                    <label className='block text-sm font-medium text-gray-800'>
                                                        นามสกุล (ภาษาไทย)
                                                    </label>
                                                    <input
                                                        type='text'
                                                        name='familyName'
                                                        placeholder='ขยันเรียน'
                                                        className='font-medium mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                        onChange={(e) => HandleChange(e)}
                                                        value={userInfo.familyName}
                                                    />
                                                    <p>
                                                        <small className='text-red-500'>{errMsg.familyName}</small>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='grid grid-cols-2 gap-4 mt-2'>
                                                <div className='col-span-1'>
                                                    <label className='block text-sm font-medium text-gray-800'>
                                                        สถานะ
                                                    </label>
                                                    <select
                                                        title='สถานะ'
                                                        name='role'
                                                        className='appearance-none font-medium mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                        onChange={(e) => HandleChange(e)}
                                                        value={userInfo.role}
                                                    >
                                                        <option value='กรุณาเลือก' hidden={true}>
                                                            -- กรุณาเลือก --
                                                        </option>
                                                        {StatusOptions.map((option) => (
                                                            <option key={option.value} value={option.value}>
                                                                {option.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <p>
                                                        <small className='text-red-500'>{errMsg.role}</small>
                                                    </p>
                                                </div>
                                                <div className='col-span-1'>
                                                    <label className='block text-sm font-medium text-gray-800'>
                                                        เบอร์โทรติดต่อ
                                                    </label>
                                                    <input
                                                        type='text'
                                                        name='telephone'
                                                        maxLength={12}
                                                        placeholder='012-245-6789'
                                                        className='font-medium mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                        onChange={(e) => HandleChange(e)}
                                                        value={userInfo.telephone}
                                                    />
                                                    <p>
                                                        <small className='text-red-500'>{errMsg.telephone}</small>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='grid grid-cols-5 gap-4 mt-2'>
                                                <div className='col-span-1'>
                                                    <label className='block text-sm font-medium text-gray-800'>
                                                        อายุ
                                                    </label>
                                                    <input
                                                        type='number'
                                                        placeholder='25'
                                                        name='age'
                                                        className='font-medium mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                        onChange={(e) => HandleChange(e)}
                                                        maxLength={2}
                                                        minLength={1}
                                                        value={userInfo.age}
                                                    />
                                                    <p>
                                                        <small className='text-red-500'>{errMsg.age}</small>
                                                    </p>
                                                </div>
                                                <div className='col-span-4'>
                                                    <label className='block text-sm font-medium text-gray-800'>
                                                        จังหวัด
                                                    </label>
                                                    <select
                                                        title='จังหวัด'
                                                        id='province'
                                                        name='province'
                                                        className='appearance-none font-medium mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                        onChange={(e) => HandleChange(e)}
                                                        value={userInfo.province}
                                                    >
                                                        <option value='กรุณาเลือก' hidden={true}>
                                                            -- กรุณาเลือก --
                                                        </option>
                                                        {ProvinceOptions.map((option) => (
                                                            <option key={option.value} value={option.value}>
                                                                {option.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <p>
                                                        <small className='text-red-500'>{errMsg.province}</small>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='mb-2'></div>
                                            <center>
                                                <button
                                                    type='button'
                                                    onClick={(e) => handleSubmit(e)}
                                                    className='mt-2 flex-28 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg px-5 py-1.5 w-full text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
                                                >
                                                    บันทึกข้อมูล
                                                </button>
                                            </center>
                                            <Toaster
                                                position="bottom-center"
                                                reverseOrder={false}
                                                />
                                        </form>
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
        value: 'ผู้สนใจ',
        label: 'ผู้สนใจ',
    },
]

const ProvinceOptions: {
    value: string
    label: string
}[] = [
    {
        value: 'กรุงเทพมหานคร',
        label: 'กรุงเทพมหานคร',
    },
    {
        value: 'กระบี่',
        label: 'กระบี่',
    },
    {
        value: 'กาญจนบุรี',
        label: 'กาญจนบุรี',
    },
    {
        value: 'กาฬสินธุ์',
        label: 'กาฬสินธุ์',
    },
    {
        value: 'กำแพงเพชร',
        label: 'กำแพงเพชร',
    },
    {
        value: 'ขอนแก่น',
        label: 'ขอนแก่น',
    },
    {
        value: 'จันทบุรี',
        label: 'จันทบุรี',
    },
    {
        value: 'ฉะเชิงเทรา',
        label: 'ฉะเชิงเทรา',
    },
    {
        value: 'ชลบุรี',
        label: 'ชลบุรี',
    },
    {
        value: 'ชัยนาท',
        label: 'ชัยนาท',
    },
    {
        value: 'ชัยภูมิ',
        label: 'ชัยภูมิ',
    },
    {
        value: 'ชุมพร',
        label: 'ชุมพร',
    },
    {
        value: 'เชียงราย',
        label: 'เชียงราย',
    },
    {
        value: 'เชียงใหม่',
        label: 'เชียงใหม่',
    },
    {
        value: 'ตรัง',
        label: 'ตรัง',
    },
    {
        value: 'ตราด',
        label: 'ตราด',
    },
    {
        value: 'ตาก',
        label: 'ตาก',
    },
    {
        value: 'นครนายก',
        label: 'นครนายก',
    },
    {
        value: 'นครปฐม',
        label: 'นครปฐม',
    },
    {
        value: 'นครพนม',
        label: 'นครพนม',
    },
    {
        value: 'นครราชสีมา',
        label: 'นครราชสีมา',
    },
    {
        value: 'นครศรีธรรมราช',
        label: 'นครศรีธรรมราช',
    },
    {
        value: 'นครสวรรค์',
        label: 'นครสวรรค์',
    },
    {
        value: 'นนทบุรี',
        label: 'นนทบุรี',
    },
    {
        value: 'นราธิวาส',
        label: 'นราธิวาส',
    },
    {
        value: 'น่าน',
        label: 'น่าน',
    },
    {
        value: 'บึงกาฬ',
        label: 'บึงกาฬ',
    },
    {
        value: 'บุรีรัมย์',
        label: 'บุรีรัมย์',
    },
    {
        value: 'ปทุมธานี',
        label: 'ปทุมธานี',
    },
    {
        value: 'ประจวบคีรีขันธ์',
        label: 'ประจวบคีรีขันธ์',
    },
    {
        value: 'ปราจีนบุรี',
        label: 'ปราจีนบุรี',
    },
    {
        value: 'ปัตตานี',
        label: 'ปัตตานี',
    },
    {
        value: 'พระนครศรีอยุธยา',
        label: 'พระนครศรีอยุธยา',
    },
    {
        value: 'พะเยา',
        label: 'พะเยา',
    },
    {
        value: 'พังงา',
        label: 'พังงา',
    },
    {
        value: 'พัทลุง',
        label: 'พัทลุง',
    },
    {
        value: 'พิจิตร',
        label: 'พิจิตร',
    },
    {
        value: 'พิษณุโลก',
        label: 'พิษณุโลก',
    },
    {
        value: 'เพชรบุรี',
        label: 'เพชรบุรี',
    },
    {
        value: 'เพชรบูรณ์',
        label: 'เพชรบูรณ์',
    },
    {
        value: 'แพร่',
        label: 'แพร่',
    },
    {
        value: 'ภูเก็ต',
        label: 'ภูเก็ต',
    },
    {
        value: 'มหาสารคาม',
        label: 'มหาสารคาม',
    },
    {
        value: 'มุกดาหาร',
        label: 'มุกดาหาร',
    },
    {
        value: 'แม่ฮ่องสอน',
        label: 'แม่ฮ่องสอน',
    },
    {
        value: 'ยโสธร',
        label: 'ยโสธร',
    },
    {
        value: 'ยะลา',
        label: 'ยะลา',
    },
    {
        value: 'ร้อยเอ็ด',
        label: 'ร้อยเอ็ด',
    },
    {
        value: 'ระนอง',
        label: 'ระนอง',
    },
    {
        value: 'ระยอง',
        label: 'ระยอง',
    },
    {
        value: 'ราชบุรี',
        label: 'ราชบุรี',
    },
    {
        value: 'ลพบุรี',
        label: 'ลพบุรี',
    },
    {
        value: 'ลำปาง',
        label: 'ลำปาง',
    },
    {
        value: 'ลำพูน',
        label: 'ลำพูน',
    },
    {
        value: 'เลย',
        label: 'เลย',
    },
    {
        value: 'ศรีสะเกษ',
        label: 'ศรีสะเกษ',
    },
    {
        value: 'สกลนคร',
        label: 'สกลนคร',
    },
    {
        value: 'สงขลา',
        label: 'สงขลา',
    },
    {
        value: 'สตูล',
        label: 'สตูล',
    },
    {
        value: 'สมุทรปราการ',
        label: 'สมุทรปราการ',
    },
    {
        value: 'สมุทรสงคราม',
        label: 'สมุทรสงคราม',
    },
    {
        value: 'สมุทรสาคร',
        label: 'สมุทรสาคร',
    },
    {
        value: 'สระแก้ว',
        label: 'สระแก้ว',
    },
    {
        value: 'สระบุรี',
        label: 'สระบุรี',
    },
    {
        value: 'สิงห์บุรี',
        label: 'สิงห์บุรี',
    },
    {
        value: 'สุโขทัย',
        label: 'สุโขทัย',
    },
    {
        value: 'สุพรรณบุรี',
        label: 'สุพรรณบุรี',
    },
    {
        value: 'สุราษฎร์ธานี',
        label: 'สุราษฎร์ธานี',
    },
    {
        value: 'สุรินทร์',
        label: 'สุรินทร์',
    },
    {
        value: 'หนองคาย',
        label: 'หนองคาย',
    },
    {
        value: 'หนองบัวลำภู',
        label: 'หนองบัวลำภู',
    },
    {
        value: 'อ่างทอง',
        label: 'อ่างทอง',
    },
    {
        value: 'อำนาจเจริญ',
        label: 'อำนาจเจริญ',
    },
    {
        value: 'อุดรธานี',
        label: 'อุดรธานี',
    },
    {
        value: 'อุตรดิตถ์',
        label: 'อุตรดิตถ์',
    },
    {
        value: 'อุทัยธานี',
        label: 'อุทัยธานี',
    },
    {
        value: 'อุบลราชธานี',
        label: 'อุบลราชธานี',
    },
]

type Info = {
    prefix: string
    givenName: string
    familyName: string
    status: string
    phone: string
    age: number
    province: string
}
type ErrorMessage = {
    prefix: string
    givenName: string
    familyName: string
    status: string
    phone: string
    age: string
    province: string
    success: boolean
}
