"use client";
import { faCalendar, faCircleUser } from '@fortawesome/free-solid-svg-icons'
import Button from '../components/button'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TypewriterComponent from 'typewriter-effect';

const mainMenu = [
  {
    name: 'ลงทะเบียนล่วงหน้า',
    fa: true,
    icon: faCircleUser,
    href: '/register',
    disabled: false,
  },
  {
    name: 'Follow Us',
    fa: true,
    icon: faFacebook,
    href: 'https://facebook.com/MWITOpenHouse',
    disabled: false,
  },
  {
    name: 'ระบบรับสมัครเข้า ม.4',
    fa: false,
    icon: process.env.CDN_URL + '/img/admission.png',
    href: 'https://apply.mwit.ac.th',
    disabled: false,
    inner: false,
  },
  {
    name: 'MWIT Square',
    fa: false,
    icon: process.env.CDN_URL + '/img/sqlogofull.png',
    href: 'https://square.mwit.ac.th',
    disabled: false,
  },
]


function scrollToTop() {
  if (!(typeof window !== 'undefined')) return;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export default function LandingPage() {
  const path = usePathname();
  const isHome = path === "/" || path === "";
  if (!isHome) return;
  return (
    <div className='w-full bg-yellow-500/50 absolute h-[calc(100vh-calc(100vh-100%))]'>
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
                    <div className='bg-white text-[#7775ff] px-3 pt-1 pb-0.5 rounded-full text-xs md:text-sm lg:text-base'>
                        UPCOMING EVENT
                    </div>
                </div>
              <div className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-bmw'>
                <p className='drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)] inline bg-clip-text text-transparent bg-gradient-to-r from-[#88acff] to-[#ffec74]'>
                  MWIT Open House 2024
                </p>
              </div>
              <div className='mt-1'>
              <FontAwesomeIcon icon={faCalendar} className='text-[#575fd6] h-[1em] pb-[0.1rem] mr-2' />
                <TypewriterComponent
                  options={{ loop: true, wrapperClassName: 'text-xl inline text-[#575fd6]' }}
                  component={motion.div}
                  onInit={(typewriter) => { 
                    typewriter.typeString('23 - 24 สิงหาคม 2567') 
                      .pauseFor(2500) 
                      .deleteAll() 
                      .start(); 
                  }} 
                /> 
              </div>
            </motion.div>
          </div>
          <div className=''>            
            {/* <motion.a
              className='relative bg-ymw/50 hover:bg-ymw hover:text-black cursor-pointer transition-colors duration-200 py-1 md:py-2 px-3 md:px-4 rounded-full font-CS font-bold text-lg md:text-xl lg:text-2xl text-bmw'
              initial={{ opacity: 0, scale: 0.7, y: 10, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
              transition={{
                duration: 0.8,
                delay: 1,
                bounce: 0.4,
                type: 'spring',
              }}
              href='/tour'
            >
              <motion.div
                className='absolute text-xs md:text-sm text-white -right-2 -top-2 bg-oft font-semibold px-[0.35rem] md:px-2 rounded-full'
                initial={{ opacity: 0, scale: 0.7, y: 10, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotate: 6 }}
                transition={{
                  duration: 0.8,
                  delay: 1.6,
                  bounce: 0.5,
                  type: 'spring',
                }}
              >
                New
              </motion.div>
              <span className='whitespace-nowrap'>School Tour</span>
            </motion.a>
            <motion.a
              className='relative bg-white/50 hover:bg-ymw hover:text-black cursor-pointer transition-colors duration-200 py-1 md:py-2 px-3 md:px-4 rounded-full font-CS font-bold text-lg md:text-xl lg:text-2xl text-bmw'
              initial={{ opacity: 0, scale: 0.7, y: 10, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
              transition={{
                duration: 0.8,
                delay: 1.3,
                bounce: 0.4,
                type: 'spring',
              }}
              href='/biovote'
            >
              <motion.div
                className='absolute text-xs md:text-sm text-white -right-2 -top-2 bg-oft font-semibold px-[0.35rem] md:px-2 rounded-full'
                initial={{ opacity: 0, scale: 0.7, y: 10, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotate: 6 }}
                transition={{
                  duration: 0.8,
                  delay: 1.9,
                  bounce: 0.5,
                  type: 'spring',
                }}
              >
                Vote Now!
              </motion.div>
              <span className='whitespace-nowrap'>
                โครงการวาดภาพและถ่ายภาพทางชีววิทยา
              </span>
            </motion.a> */}
          </div>
        </div>
        {/* <motion.a
              className='w-full max-w-4xl md:pb-4 mx-auto flex-none grid grid-flow-col gap-2 lg:gap-4'
              initial={{ opacity: 0, scale: 0.7, y: 10, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
              transition={{
                duration: 0.8,
                delay: 1,
                bounce: 0.4,
                type: 'spring',
              }}
              href='/tour'
            ><div className='hover:bg-ymw/70 text-bmw hover:text-black cursor-pointer bg-white/30 text-bmw/50 grayscale-0 transition-colors duration-200 rounded-xl p-3 grid grid-flow-row content-center gap-2 md:gap-3 justify-items-center'>
              <span className='text-black font-CS font-bold text-xs sm:text-base md:text-lg lg:text-xl text-center'>
                จำนวนผู้ลงทะเบียนเข้าร่วมงาน ( ยังไม่เปิดให้ลงทะเบียน )
              </span>
              <div className="grid grid-flow-col gap-8 px-10">
                <div className="grid grid-flow-row">
                  <span className='text-black font-CS font-bold text-xs sm:text-base md:text-lg lg:text-xl text-center'>
                    วันศุกร์ 23 สิงหาคม 2567
                  </span>
                  <span className='text-black font-CS font-bold text-xs sm:text-base md:text-lg lg:text-xl text-center'>
                    0 / 2000 คน
                  </span>
                </div>
                <div className="grid grid-flow-row">
                  <span className='text-black font-CS font-bold text-xs sm:text-base md:text-lg lg:text-xl text-center'>
                    วันเสาร์ 24 สิงหาคม 2567
                  </span>
                  <span className='text-black font-CS font-bold text-xs sm:text-base md:text-lg lg:text-xl text-center'>
                    0 / 5000 คน
                  </span>
                </div>
              </div>
              
      </div>
      </motion.a> */}
        <div className='w-full max-w-4xl md:pb-4 mx-auto flex-none grid grid-flow-col gap-2 lg:gap-4'>
          {mainMenu.map((m, i) => (
            <Button
              m={m}
              key={i}
              toHome={() =>
                m.href === undefined ? scrollToTop() : null
              }
            />
          ))}
        </div>
      </div>
    </div>
  )
}