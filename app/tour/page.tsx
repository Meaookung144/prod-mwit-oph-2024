'use client'

import { faCaretDown, faCaretLeft, faCaretRight, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import { useEffect, useState } from 'react'
import TourCard from '../../components/tourcard'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

const place = [
    {
        name: 'ศูนย์กีฬา',
        img: '01',
        ct: [{ vid: 'Lgl308DxpGI' }],
    },
    {
        name: 'หลวงพ่อวัดไร่ขิง',
        img: '02',
        ct: [{ vid: 'x1kT3cpxHCw' }],
    },
    {
        name: 'สนามหน้าโรงเรียน',
        img: '03',
        ct: [
            { name: 'สนามฟุตบอล', vid: 'KHCni-9hUCk' },
            { name: 'สนามเปตอง', vid: 'anpLXV8Cl9o' },
            { name: 'สแตนด์เชียร์', vid: 'lxeLmFjNXt0' },
            { name: 'ลู่วิ่ง', vid: 'X1YbBZzw-pU' },
        ],
    },
    {
        name: 'อาคารโรงอาหาร',
        img: '04',
        ct: [
            {
                name: 'โรงอาหาร',
                vid: 'r_95iMKGx1A',
            },
            {
                name: 'ร้านค้าสมาคมผู้ปกครองฯ',
                vid: 'Cq4VikX15GE',
            },
            {
                name: 'หอประชุมพระอุบาลีคุณูปมาจารย์ (ปัญญา อินฺทปญฺโญ)',
                vid: 'GxJuGWyPMjo',
            },
        ],
    },
    {
        name: 'หอพักนักเรียนชาย (หอ 9)',
        img: '05',
        ct: [
            { name: 'ห้องซ้อมดนตรี', vid: '2iutHSf9IsA' },
            { name: 'ห้องนาฏศิลป์', vid: 'NEVzhT8c1To' },
            { name: 'Study Room (หอชาย)', vid: 'lyF4nOdumIQ' },
            { name: 'ภายในหอชาย', vid: 'oKvfq6seB3M' },
            { name: 'ใต้หอชาย', vid: 'Y0_V2zO48K0' },
        ],
    },
    {
        name: 'เครื่องซักผ้าและห้องผ้า',
        img: '06',
        ct: [{ vid: 'r7oRs_5nsig' }],
    },
    {
        name: 'สวนอาทิตย์',
        img: '07',
        ct: [{ vid: 'sJXnh5Ch-8g' }],
    },
    {
        name: 'สนามฟุตซอล',
        img: '08',
        ct: [{ vid: 'bcjpr6p25ZU' }],
    },
    {
        name: 'หอพักนักเรียนหญิง (หอ 7 และหอ 8)',
        img: '09',
        ct: [
            { name: 'ภายในหอพักหญิง', vid: '35BDhYbEwxQ' },
            { name: 'Common Room (หอหญิง)', vid: 'zzOkuBA3ZaE' },
        ],
    },
    {
        name: 'ห้องพยาบาล',
        img: '10',
        ct: [{ vid: 'bqm29vSCm38' }],
    },
    {
        name: 'ห้องครัว',
        img: '11',
        ct: [{ vid: 'ScCD_XKLDUg' }],
    },
    {
        name: 'อาคารมหิดลวิทยานุสรณ์ 1',
        img: '12',
        ct: [
            { name: 'ห้องเรียน', vid: 'PeQdKiCwXHk' },
            { name: 'ห้องสตูดิโอ', vid: 'PlMCzMuW4j4' },
            { name: 'ห้องประชุม ดร.โกวิท วรพิพัฒน์', vid: 'OET3I6VIEF4' },
        ],
    },
    {
        name: 'อาคารมหิดลวิทยานุสรณ์ 2',
        img: '13',
        ct: [
            { name: 'Smart Classroom', vid: '5jWbB5BRKpc' },
            { name: 'ห้องดาราศาสตร์สามมิติ', vid: '8yyI-1XNGN4' },
            {
                name: 'ห้องประชุม ศาสตราจารย์เกียรติคุณ นายแพทย์ ดร.ณัฐ ภมรประวัติ',
                vid: 'zy-_1R6bkkA',
            },
        ],
    },
    {
        name: 'ศูนย์วิทยบริการ (ห้องสมุด)',
        img: '14',
        ct: [{ vid: 'upzRfygdU-w' }],
    },
    {
        name: 'อาคารมหิดลวิทยานุสรณ์ 3',
        img: '15',
        ct: [{ name: 'ห้องปฏิบัติการวิทยาศาสตร์', vid: 'P4gs717jLM0' }],
    },
    {
        name: 'โรงฝึกงานและโรงเพาะชำ',
        img: '16',
        ct: [
            { name: 'โรงฝึกงาน', vid: '03knMU5FOa8' },
            { name: 'โรงเพาะชำ', vid: 'udvTHgumfhk' },
        ],
    },
]

export default function Tour() {
    const [selected, setSelected] = useState(0)
    const [nameOpen, setNameOpen] = useState(false)
    const searchParams = useSearchParams()

    useEffect(() => {
        searchParams.has('place') && place.find((p) => p.name.replaceAll(' ', '_') === searchParams.get('place'))
            ? setSelected(place.findIndex((p) => p.name.replaceAll(' ', '_') === searchParams.get('place')))
            : setSelected(0)
    }, [searchParams])

    return (
        <>
            <title>
                {(searchParams.has('place') ? place[selected].name + ' - ' : '') +
                    'MWIT School Tour | MWIT Open House 2024'}
            </title>
            <meta
                name='description'
                content='MWIT School Tour เปิดบ้านให้ทุกท่านได้มาเยี่ยมชมโรงเรียนมหิดลวิทยานุสรณ์แบบออนไลน์ สามารถรับชมได้ 24 ชั่วโมงผ่านเว็บไซต์ MWIT Open House ได้เลย | MWIT Open House 2024'
            />
            <main className='w-full bg-white/20'>
                <div className='flex flex-col text-black items-center mx-auto justify-self-center w-full max-w-6xl px-6 pt-10 pb-4'>
                    <Link legacyBehavior scroll={false} href={'/tour'}>
                        <a className='font-CS font-bold text-bmw text-3xl md:text-4xl lg:text-5xl'>School Tour</a>
                    </Link>
                </div>
                <div className='container px-8 md:px-24 lg:px-36 pt-5 max-w-[100rem] md:max-w-[100rem] lg:max-w-[100rem] mx-auto pt-6'>
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-3 mt-4'>
                        <div className='flex flex-col items-center w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow rounded-t-2xl hover:bg-sky-100'>
                            <span className='font-CS font-bold text-sky-500 text-4xl md:text-2xl lg:text-4xl pt-4'>
                                สายที่ 1
                            </span>
                            <span className='font-CS text-gray-500 text-lg md:text-lg lg:text-xl'>
                                (เหมาสำหรับนักเรียนชาย)
                            </span>
                            <ul className='mt-2 mb-4 font-CS font-bold text-black text-2xl md:text-3xl lg:text-3xl list-decimal'>
                                <li>ห้องนอนหอชาย</li>
                                <li>Study Room</li>
                                <li>ห้องดนตรี</li>
                                <li>ห้องผ้า</li>
                                <li>ห้องครัว</li>
                                <li>ห้องพยาบาล</li>
                            </ul>
                        </div>
                        <div className='flex flex-col items-center w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow rounded-t-2xl hover:bg-pink-100'>
                            <span className='font-CS font-bold text-pink-500 text-4xl md:text-2xl lg:text-4xl pt-4'>
                                สายที่ 2
                            </span>
                            <span className='font-CS text-gray-500 text-lg md:text-lg lg:text-xl'>
                                (เหมาสำหรับนักเรียนหญิง)
                            </span>
                            <ul className='mt-2 mb-4 font-CS font-bold text-black text-2xl md:text-3xl lg:text-3xl list-decimal'>
                                <li>ห้องนอนหอหญิง</li>
                                <li>ห้องพยาบาล</li>
                                <li>ห้องผ้า</li>
                                <li>ห้องครัว</li>
                            </ul>
                        </div>
                        <div className='flex flex-col items-center w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow rounded-t-2xl hover:bg-blue-100'>
                            <span className='font-CS font-bold text-bmw text-4xl md:text-2xl lg:text-4xl pt-4'>
                                สายที่ 3
                            </span>
                            <ul className='mt-2 mb-4 font-CS font-bold text-black text-2xl md:text-3xl lg:text-3xl list-decimal'>
                                <li>ศูนย์วิทยบริการ</li>
                                <li>ห้องศิลปะ</li>
                                <li>โรงฝึกงาน</li>
                            </ul>
                        </div>
                    </div>
                    <div className='pt-8' />
                </div>
                <div className='flex flex-wrap relative overflow-y-hidden max-w-6xl mx-auto px-6 justify-center gap-4 pt-2 pb-10'>
                    <div className='relative w-full max-w-[70vw] md:max-w-xs'>
                        <Image
                            className='w-full'
                            src={process.env.CDN_URL + '/img/tour/bg.webp'}
                            alt='School Tour Background'
                            width={1920}
                            height={1080}
                        />
                        <AnimatePresence exitBeforeEnter>
                            <motion.img
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                key={selected}
                                className='w-full absolute inset-0'
                                src={process.env.CDN_URL + '/img/tour/' + place[selected].img + '.webp'}
                            />
                        </AnimatePresence>
                    </div>
                    <div className='w-full max-w-xl bg-gray-200 relative rounded-xl'>
                        <div className='flex relative flex-col justify-center items-center gap-3 px-4 py-3'>
                            <div className='flex w-full justify-center items-center gap-2'>
                                <Link
                                    legacyBehavior
                                    scroll={false}
                                    href={{
                                        pathname: '/tour',
                                        query: {
                                            ...Object.fromEntries(searchParams),
                                            place: place[(selected - 1 + place.length) % place.length].name.replaceAll(
                                                ' ',
                                                '_',
                                            ),
                                        },
                                    }}
                                    passHref
                                    className='px-2 rounded-md text-xl bg-white/60 hover:bg-bmw/10 transition-colors duration-300'
                                >
                                    <FontAwesomeIcon icon={faCaretLeft} />
                                </Link>

                                <AnimateSharedLayout>
                                    <motion.button
                                        onClick={() => setNameOpen(true)}
                                        layoutId='place-name-canvas'
                                        className='grow relative font-CS text-bmw bg-white/60 hover:bg-bmw/10 transition-colors duration-300 rounded-md font-semibold text-xl sm:text-2xl text-center px-3'
                                    >
                                        <AnimatePresence exitBeforeEnter>
                                            <motion.span
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.5 }}
                                                layoutId={'place-name-' + place[selected].img}
                                                key={selected}
                                            >
                                                <span className='whitespace-nowrap'>{place[selected].name}</span>
                                                <span className='text-base'>
                                                    {' '}
                                                    ({selected + 1}/{place.length})
                                                </span>
                                            </motion.span>
                                        </AnimatePresence>
                                        <div className='absolute right-2 top-0 bottom-0 flex justify-center items-center'>
                                            <FontAwesomeIcon
                                                icon={faCaretDown}
                                                className='px-2 text-bmw text-lg rounded-md'
                                            />
                                        </div>
                                    </motion.button>
                                    {nameOpen && (
                                        <div
                                            className='fixed inset-0 pt-16 px-6 pb-6 z-50 overflow-y-scroll'
                                            onClick={() => setNameOpen(false)}
                                        >
                                            <motion.div
                                                className='w-full relative max-w-md mx-auto flex flex-col gap-1 bg-white/80 shadow-lg backdrop-blur-md px-4 py-5 rounded-xl'
                                                layoutId='place-name-canvas'
                                            >
                                                <div
                                                    className='absolute right-3 top-3 cursor-pointer z-30'
                                                    onClick={() => setNameOpen(false)}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faCircleXmark}
                                                        className='text-3xl text-gray-400/60 hover:text-red-500/60 transition-colors duration-300'
                                                    />
                                                </div>
                                                <span className='font-CS text-2xl md:text-3xl font-bold text-bmw'>
                                                    Place you want to visit
                                                </span>
                                                <div className='flex flex-col font-IBMPlexLoop'>
                                                    {place.map((p, pi) => (
                                                        <Link
                                                            legacyBehavior
                                                            scroll={false}
                                                            href={{
                                                                pathname: '/tour',
                                                                query: {
                                                                    ...Object.fromEntries(searchParams),
                                                                    place: p.name.replaceAll(' ', '_'),
                                                                },
                                                            }}
                                                            passHref
                                                            key={pi}
                                                        >
                                                            <motion.a
                                                                layoutId={'place-name-' + p.img}
                                                                className='py-1 w-full text-center hover:bg-gray-300/80 transition-colors duration-300 border-b border-b-gray-300'
                                                            >
                                                                {p.name}
                                                            </motion.a>
                                                        </Link>
                                                    ))}
                                                </div>
                                                <button
                                                    onClick={() => setNameOpen(false)}
                                                    className='text-sm md:text-base bg-white/30 w-fit hover:bg-white/60 hover:text-bmw transition-all duration-300 backdrop-blur-sm text-bmw/70 rounded-full px-4 py-1 mt-2 font-IBMPlex font-semibold'
                                                >
                                                    Close
                                                </button>
                                            </motion.div>
                                        </div>
                                    )}
                                </AnimateSharedLayout>

                                <Link
                                    scroll={false}
                                    href={{
                                        pathname: '/tour',
                                        query: {
                                            ...Object.fromEntries(searchParams),
                                            place: place[(selected + 1 + place.length) % place.length].name.replaceAll(
                                                ' ',
                                                '_',
                                            ),
                                        },
                                    }}
                                    passHref
                                    className='px-2 rounded-md text-xl bg-white/60 hover:bg-bmw/10 transition-colors duration-300'
                                >
                                    <FontAwesomeIcon icon={faCaretRight} />
                                </Link>
                            </div>
                            <AnimatePresence exitBeforeEnter>
                                <TourCard p={place[selected]} key={selected} />
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
                <center>
                    <a href='https://maps.app.goo.gl/mvvLokNNoRPNq7G27?g_st=ic'>
                        <button className='border border-1 border-blue-500 hover:border-yellow-800 hover:bg-yellow-200 text-gray-800 font-bold py-2 px-5 rounded inline-flex items-center'>
                            <img className='w-5' src={'/img/google-map-icon.png'} />
                            <span className='pl-5'> Google Maps</span>
                        </button>
                    </a>
                </center>
                {/* <div className='font-CS font-bold text-bmw text-xl md:text-2xl lg:text-3xl pt-8 place-content-center'>
                    <center>
                        <span>เดินชมโรงเรียนแบบ On-Site วันที่ 25-26 สิงหาคม 2566 เวลา 8.00 - 15.40 น.</span>
                        <br />
                        <span>รอบละ 20 นาที !</span>
                        <br />
                        <span>ณ โรงเรียนมหิดลวิทยานุสรณ์</span>
                        </center>
                        </div> */}
                {/* <center>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3 mt-4 lg:pl-32'>
                        <div className='flex flex-col items-center w-full max-w-sm pt-5 pb-5'>
                            <img className='w-full' src={'/img/2023/map.png'} />
                            </div>
                            <div className='flex flex-col items-center w-full max-w-sm pt-5 pb-5'>
                            <img className='w-full' src={'/img/2023/howtogobybus.png'} />
                            </div>
                            </div>
                            </center> */}
                <div className='pt-8' />
            </main>
        </>
    )
}
