"use client";

import Head from 'next/head'
import { Fragment, useEffect, useRef, useState } from 'react'
import { AnimateSharedLayout, motion } from 'framer-motion'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBook,
  faCalendar,
  faCircleXmark,
  faFileInvoice,
  faFlaskVial,
  faPeopleRobbery,
  faPuzzlePiece,
} from '@fortawesome/free-solid-svg-icons'

import '../styles/Home.module.css'
import Image from "next/image";

function scrollToTop() {
  if (!(typeof window !== 'undefined')) return;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export default function Home() {
  const [showWC, setShowWC] = useState(false)
  const lifeRef = useRef<HTMLInputElement>(null)
  const actRef = useRef<HTMLInputElement>(null)
  const subjRef = useRef<HTMLInputElement>(null)
  // const WelcomeButton = [
  //   {
  //     name: 'LIFE at MWIT',
  //     icon: faPeopleRobbery,
  //     ref: lifeRef,
  //   },
  //   {
  //     name: 'All Activities',
  //     icon: faPuzzlePiece,
  //     ref: actRef,
  //   },
  //   {
  //     name: 'ตามสาขาวิชา',
  //     icon: faBook,
  //     ref: subjRef,
  //   },
  // ]
  useEffect(() => {
    scrollToTop()
  }, [])
  return <>
  </>;
}

  