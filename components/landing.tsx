'use client'
import { faCalendar, faCircleUser } from '@fortawesome/free-solid-svg-icons'
import Button from '../components/button'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TypewriterComponent from 'typewriter-effect'

const mainMenu = [
    // {
    //     name: 'ลงทะเบียนล่วงหน้า',
    //     fa: true,
    //     icon: faCircleUser,
    //     href: '/account/ticket/new',
    //     disabled: true,
    // },
    // {
    //     name: 'Follow Us',
    //     fa: true,
    //     icon: faFacebook,
    //     href: 'https://facebook.com/MWITOpenHouse',
    //     disabled: false,
    // },
    // {
    //     name: 'ระบบรับสมัครเข้า ม.4',
    //     fa: false,
    //     icon: process.env.CDN_URL + '/img/admission.png',
    //     href: 'https://apply.mwit.ac.th',
    //     disabled: false,
    //     inner: false,
    // },
    // {
    //     name: 'MWIT Square',
    //     fa: false,
    //     icon: process.env.CDN_URL + '/img/sqlogofull.png',
    //     href: 'https://square.mwit.ac.th',
    //     disabled: false,
    // },
]

function scrollToTop() {
    if (!(typeof window !== 'undefined')) return
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default function LandingPage() {
    const path = usePathname()
    const isHome = path === '/' || path === ''
    if (!isHome) return
    return (
        <div className='w-full bg-yellow-400/45 absolute h-[calc(100vh-calc(100vh-100%))]'>
            <div className='p-4 flex flex-col w-full h-[calc(100vh-calc(100vh-100%))]'>
                <div className='grow flex flex-col justify-center items-center mx-auto gap-6 lg:gap-8'>
                    <div className='flex flex-col sm:flex-row justify-center items-center gap-6 lg:gap-8'>
                        <motion.img
                            src='img/logo.svg'
                            className='w-[280px] md:w-[330px] lg:w-[380px]'
                            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.5,
                                bounce: 0.4,
                                type: 'spring',
                            }}
                        />
                        {/* <MotionLogo
              className='w-[180px] md:w-[220px] lg:w-[250px]'
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                bounce: 0.4,
                type: 'spring',
              }}
            /> */}
                        <motion.div
                            className='font-CS font-bold space-y-2 text-bmw'
                            initial={{ opacity: 0, scale: 0.7, y: 10, rotate: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.7,
                                bounce: 0.4,
                                type: 'spring',
                            }}
                        >
                            <div className='flex pb-2'>
                                <div className='bg-ora text-white px-2 pt-1 pb-0.5 rounded-full text-xs md:text-sm lg:text-base'>
                                    UPCOMING EVENT
                                </div>
                            </div>
                            {/* <div className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-bmw'>
                <p className='drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)] inline bg-clip-text text-transparent bg-gradient-to-r from-[#88acff] to-[#ffec74]'>
                  MWIT Open House 2024
                </p>
              </div> */}
                            <div className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-bmw'>
                                <p className='drop-shadow-lg inline bg-clip-text text-transparent bg-gradient-to-b from-[#617bcf] to-[#6967ff]'>
                                  MWIT Open House 2024
                                </p>
                                <p className='drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-l from-[#83a4fd] to-[#a670e9]'>
                                  Enhance Your Possibilities
                                </p>
                            </div>
                            <div className='mt-1 text-lg'>
                                <FontAwesomeIcon
                                    icon={faCalendar}
                                    className='text-[#575fd6] h-[1em] pb-[0.1rem] mr-2'
                                />
                                <TypewriterComponent
                                    options={{
                                        loop: true,
                                        wrapperClassName: 'text-xl md:text-2xl inline text-[#575fd6]',
                                        deleteSpeed: 'natural',
                                    }}
                                    component={motion.div}
                                    onInit={(typewriter) => {
                                        typewriter.typeString('23 & 24 สิงหาคม 2567').pauseFor(2500).deleteAll().start()
                                    }}
                                />
                            </div>
                        </motion.div>
                    </div>
                    <div className=''>
                        
                    </div>
        </div>
        </div>
        </div>
        
    )
}
