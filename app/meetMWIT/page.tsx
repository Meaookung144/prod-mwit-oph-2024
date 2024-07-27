'use client'

import { faAward, faFlag, faLightbulb, faMicrophoneLines, faPersonChalkboard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { Metadata } from 'next'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const metadata: Metadata = {
    title: 'Meet MWIT | MWIT Open House 2024',
    description: '',
}

const motionProp = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.8 },
}

export default function MeetMWIT() {
    const router = useRouter()
    const { data: session, status } = useSession()

    const Handlelogin = () => {
        router.push('/register')
    }

    const Handleregister = () => {
        //Register meetMWIT
    }

    return (
        <>
            <title>{metadata.title?.toString()}</title>
            <meta name='description' content={metadata.description?.toString()} />
            <main className='w-full bg-white/20'>
                <div className='flex flex-col text-black items-center mx-auto justify-self-center w-full max-w-6xl px-6 pt-10 pb-4'>
                    <a className='font-CS font-bold text-bmw text-3xl md:text-4xl lg:text-5xl'>
                        &lsquo;น้อง&lsquo; ถาม &lsquo;พี่&lsquo; ตอบ
                    </a>
                    <p className='text-purple-700 font-bold font-CS text-2xl'>Comming Soon...</p>
                </div>
                {/* <div className='flex flex-col relative overflow-y-hidden max-w-6xl mx-auto px-6 justify-center gap-4 pt-4 pb-10'>
                    <a className='w-full relative group shadow-lg flex flex-col md:flex-row rounded-xl overflow-hidden min-h-[15rem] justify-end'>
                        <div
                            style={{ backgroundImage: `url('/img/catimg/10.jpg')` }}
                            className='relative md:absolute bg-cover bg-bottom bg-no-repeat w-full aspect-[16/5] md:inset-0'
                        />
                        <div className='w-full md:w-fit md:max-w-md bg-white/70 group-hover:bg-yellow-100/90 transition-colors duration-300 backdrop-blur-md px-4 py-3 flex flex-col'>
                            <span className='font-CS font-semibold text-xl md:text-2xl text-bmw'>dssf</span>
                            <span className='font-IBMPlex font-semibold text-sm md:text-base text-gray-700'>
                                🙌🏻 ใครที่อยากรู้ว่าพี่ ๆ MWIT เตรียมตัวสอบเข้ายังไง การใช้ชีวิตในโรงเรียนเป็นยังไง
                                เรียนอะไรบ้าง พลาดกิจกรรมนี้ไม่ได้แล้ว!<br></br>
                                💬 กิจกรรมที่เปิดโอกาสให้มีการพูดคุย ถามตอบ ระหว่างรุ่นน้องและรุ่นพี่ คลายข้อสงสัย
                                และทำให้รู้จักโรงเรียนได้ดีมากขึ้น<br></br>
                                🔥มีทั้งรูปแบบการคุยแบบ 1:1 และกลุ่ม 🔥
                            </span>
                        </div>
                    </a>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3 mt-4 ml-5 mr-5 lg:mx-64'>
                    <div className='flex flex-col items-center w-full bg-white border border-gray-200 rounded-lg shadow rounded-t-2xl hover:bg-sky-100'>
            <img src='/img/catimg/1.jpg' className='rounded' /> 
          </div>
          <div className='flex flex-col items-center w-full bg-white border border-gray-200 rounded-lg shadow rounded-t-2xl hover:bg-pink-100'>
            <img src='/img/catimg/2.jpg' className='rounded' />
          </div>
                    <div className='mt-5'></div>
                </div>
                <center>
                    <span className='font-CS font-bold text-bmw text-3xl md:text-4xl lg:text-5xl'>
                        พบกันได้ที่ .................
                    </span>
                    <div className='mt-16'></div>
                    <span className='font-CS font-bold text-bmw text-3xl md:text-4xl lg:text-5xl'>
                        กิจกรรมบรรยายพิเศษ
                    </span>
                    <br />
                    <span className='text-lg lg:text-2xl font-CS'>
                        การบรรยายพิเศษจาก<b className='text-bmw'>ศิษย์เก่า</b>โรงเรียนมหิดลวิทยานุสรณ์
                        <br />
                        <b className='text-bmw'>เวลา .. น.</b>
                    </span>
                </center>
                <div className='mt-10' />
                <center>
                    {status === 'authenticated' ? (
                        <div>
                            <button
                                className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                                onClick={() => Handleregister()}
                            >
                                ลงชื่อเข้าร่วมกิจกรรม
                            </button>
                        </div>
                    ) : (
                        <div>
                            <button
                                className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                                onClick={() => Handlelogin()}
                            >
                                เข้าสู่ระบบก่อนลงชื่อเข้าร่วมกิจกรรม
                            </button>
                        </div>
                    )}
                </center> */}

                <div className='pt-5'></div>
            </main>
        </>
    )
}
