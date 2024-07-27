"use client";

import Head from 'next/head'
import { Fragment, useEffect, useRef, useState } from 'react'
import { AnimateSharedLayout, motion } from 'framer-motion'
import Link from 'next/link'
import ActCard from '../components/actcard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBook,
  faCircleXmark,
  faFileInvoice,
  faFlaskVial,
  faPeopleRobbery,
  faPuzzlePiece,
} from '@fortawesome/free-solid-svg-icons'

import '../styles/Home.module.css'
import Image from 'next/image';

function scrollToTop() {
  if (!(typeof window !== 'undefined')) return;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export default function Home() {
  const [showWC, setShowWC] = useState(false)
  const lifeRef = useRef<HTMLInputElement>(null)
  const actRef = useRef<HTMLInputElement>(null)
  const subjRef = useRef<HTMLInputElement>(null)
  const WelcomeButton = [
    {
      name: 'LIFE at MWIT',
      icon: faPeopleRobbery,
      ref: lifeRef,
    },
    {
      name: 'All Activities',
      icon: faPuzzlePiece,
      ref: actRef,
    },
    {
      name: 'ตามสาขาวิชา',
      icon: faBook,
      ref: subjRef,
    },
  ]
  useEffect(() => {
    scrollToTop()
  }, [])
  return (
    <>
      <div className='flex flex-col w-full'>     
        <div
          className='w-full min-h-screen bg-black/80 px-8 py-6'
          ref={subjRef}
        >
          <div className='w-full h-full max-w-7xl mx-auto flex flex-col justify-center items-center gap-6'>
            <span className='font-CS font-bold text-2xl md:text-3xl lg:text-4xl mt-5 text-white'>
              กิจกรรมตามสาขาวิชา
            </span>
            <div className='flex flex-wrap gap-4 justify-center'>
              {subjAct.map((s, si) => (
                <div
                  key={si}
                  className='flex flex-col group w-full max-w-sm overflow-hidden rounded-xl'
                >
                  <Image
                    src={
                      process.env.CDN_URL + '/img/subject/' + s.img + '.webp'
                    }
                    className='w-full'
                    alt={s.name}
                    width={300}
                    height={200}
                  />

                  <div
                    className={'w-full relative grid bg-black '}
                  >
                    <div className='flex flex-col absolute bottom-full right-0 left-0 px-3 py-2 bg-black/60 group-hover:bg-black/80 transition-all duration-300 backdrop-blur-md'>
                      <span className='font-CS font-semibold text-white text-xl'>
                        {s.name}
                      </span>
                      <span className='font-IBMPlex font-semibold text-blue-300 text-base'>
                        {s.sub}
                      </span>
                    </div>
                    <Link className='w-full justify-center items-center font-IBMPlex font-semibold flex gap-1 py-2 px-3 bg-bmw/30 text-white/40 hover:bg-bmw/50 hover:text-white/70 transition-colors duration-300' href={'/curriculum/' + s.curr}>
                      <FontAwesomeIcon
                        icon={faFileInvoice}
                        className='pb-1'
                      />
                      <span className=''>Curriculum</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url(${
              process.env.CDN_URL + '/img/clubcover.webp'
            })`,
          }}
          className={
            'w-full flex items-end h-screen bg-cover ' +
            'bg-bottom' +
            ' bg-no-repeat bg-fixed relative justify-self-center self-center space-y-2'
          }
        >
          <div className='w-full h-full bg-black/70'>
            <div className='w-full h-full max-w-5xl flex flex-col gap-2 justify-center mx-auto px-8'>
              <span className='font-CS text-4xl md:text-5xl font-bold text-purple-300'>
                MWIT Club
              </span>
              <span className='text-base md:text-lg lg:text-xl font-IBMPlex text-white leading-relaxed md:leading-relaxed'>
                Online Exhibition การนำเสนอกิจกรรมชุมนุมที่จัดทำโดยนักเรียน MWIT
                สู่สายตาบุคคลภายนอกในรูปแบบ Blog โดยนักเรียนใน MWIT
                ทุกคนสามารถเปิดชุมนุมเพื่อรวมกลุ่มบุคคลที่มีความสนใจด้านเดียวกันมาทำกิจกรรมร่วมกัน
                ซึ่งในภาคเรียนนี้โรงเรียนของเราก็มีชุมนุมให้นักเรียนทุกคนได้เลือกเข้าถึง
                56 ชุมนุม!
              </span>
              <div className='flex gap-2 mt-2'>
                {/* <Link legacyBehavior href={'/club'}>
                  <a className='bg-white/20 hover:bg-white/60 hover:text-purple-700 transition-all duration-300 backdrop-blur-sm text-purple-200/80 rounded-full px-4 py-2 font-IBMPlex font-semibold'>
                    Online Exhibiton
                  </a>
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer></footer>
    </>
  )
}

  const subjAct = [
    {
      name: 'สาชาวิชาคณิตศาสตร์และวิทยาการคำนวณ',
      img: 'mth169',
      curr: 'mathcom',
    },
    {
      name: 'สาขาวิชาเคมี',
      img: 'chm169',
      curr: 'chemistry',
    },
    {
      name: 'สาขาวิชาชีววิทยาและวิทยาศาสตร์สุขภาพ',
      sub: 'กลุ่มสาระการเรียนรู้ชีววิทยา',
      img: 'bio169',
      curr: 'biology',
    },
    {
      name: 'สาขาวิชาชีววิทยาและวิทยาศาสตร์สุขภาพ',
      sub: 'กลุ่มสาระการเรียนรู้สุขศึกษาและพลศึกษา',
      img: 'hpe169',
      curr: 'hpe',
    },
    {
      name: 'สาขาวิชาฟิสิกส์',
      img: 'phy169',
      curr: 'physics',
    },
    {
      name: 'สาขาภาษาต่างประเทศ',
      img: 'fld169',
      curr: 'foreignlanguage',
    },
    {
      name: 'สาขาวิชาศิลปศาสตร์',
      sub: 'กลุ่มสาระการเรียนรู้สังคมศึกษาและศิลปะ',
      img: 'lba169',
      curr: 'liberalart',
    },
    {
      name: 'สาขาวิชาศิลปศาสตร์',
      sub: 'กลุ่มสาระการเรียนรู้ภาษาไทย',
      img: 'tha169',
      curr: 'thai',
    },
  ]
  