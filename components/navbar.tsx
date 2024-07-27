'use client'
import {
    faBarsStaggered,
    faCalendarCheck,
    faCalendarDay,
    faCameraRetro,
    faCircleUser,
    faCubes,
    faFileInvoice,
    faFlag,
    faFlaskVial,
    faHouse,
    faMicroscope,
    faPenToSquare,
    faRightToBracket,
    faSchoolFlag,
    faUserGear,
    faXmark,
    faHandshake,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import DropdownMenu from './ddmenu'
import DropdownMenuSm from './ddmenusm'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { signOut } from '../auth'
import { usePathname } from 'next/navigation'
import { Analytics } from '@vercel/analytics/react'
export default function Navbar({}) {
    const path = usePathname()
    const [menuOpen, setMenuOpen] = useState<boolean>(false)
    const { status } = useSession({ required: false })

    useEffect(() => {
        setMenuOpen(false)
    }, [path])

    return (
        <div className='w-full sticky z-50 top-0 px-4 bg-gradient-to-r from-bmw to-phd text-ymw text-lg lg:text-xl font-CS font-bold' id='navbar-oph24'>
            <div className='flex relative gap-3 md:gap-4 max-w-6xl mx-auto items-center'>
                <Analytics />
                <Link
                    href={'/'}
                    className='flex gap-3 md:gap-4 items-center py-[0.35rem]'
                >
                    <Image
                        src={process.env.CDN_URL + '/img/logo24.png'}
                        className='h-[1.8em]'
                        alt='MWIT Open House 2024'
                        width={50}
                        height={50}
                    />
                    <span className='whitespace-nowrap text-white'>
                      MWIT&nbsp;
                      <p className='inline bg-clip-text text-transparent bg-gradient-to-r from-[#88acff] to-[#ffec74]'>
                        Open House 2024
                      </p>
                    </span>
                </Link>

                <div className='absolute font-semibold right-0 top-0 bottom-0 items-center flex gap-5 justify-end text-white text-base md:text-lg'>
                    {navMenu.map((m, i) => {
                        if (
                            !m.auth ||
                            (status && m.auth === (status === 'authenticated'))
                        ) {
                            if (m.sub) {
                                return (
                                    <DropdownMenu
                                        m={{
                                            ...m,
                                            ...(m.sub
                                                ? { sub: m.sub }
                                                : { sub: [] }),
                                        }}
                                        key={i}
                                    />
                                )
                            } else if (
                                m.auth === (status === 'authenticated') ||
                                m.auth === undefined
                            ) {
                                return (
                                    <Link
                                        className='hidden md:flex items-center justify-center h-full gap-2 hover:text-[#febcff] transition-all duration-200'
                                        href={m.href}
                                        key={i}
                                    >
                                        <FontAwesomeIcon
                                            icon={m.icon}
                                            className='h-[0.9em] pb-[0.3rem]'
                                        />
                                        <span>{m.name}</span>
                                    </Link>
                                )
                            }
                        }
                    })}
                    <button
                        className='text-lg flex md:hidden'
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? (
                            <FontAwesomeIcon
                                icon={faXmark}
                                className='text-bbg/80'
                            />
                        ) : (
                            <FontAwesomeIcon icon={faBarsStaggered} />
                        )}
                    </button>
                </div>
            </div>
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className='absolute font-semibold top-full right-0 left-0 flex md:hidden flex-col items-start gap-4 bg-white/70 backdrop-blur-sm w-full px-6 py-4'
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.3 }}
                    >
                        {navMenu.map((m, i) => {
                            if (
                                !m.auth ||
                                (status &&
                                    m.auth === (status === 'authenticated'))
                            ) {
                                if (m.sub) {
                                    return (
                                        <DropdownMenuSm
                                            m={{
                                                ...m,
                                                ...(m.sub
                                                    ? { sub: m.sub }
                                                    : { sub: [] }),
                                            }}
                                            key={i}
                                        />
                                    )
                                } else if (
                                    m.auth === (status === 'authenticated') ||
                                    m.auth === undefined
                                ) {
                                    return (
                                        <Link
                                            className='flex w-full justify-start items-start gap-2 text-bbk hover:text-bmw transition-all duration-200'
                                            href={m.href}
                                            key={i}
                                        >
                                            <FontAwesomeIcon
                                                icon={m.icon}
                                                className='mt-[0.15rem] h-[1em]'
                                            />
                                            <span>{m.name}</span>
                                        </Link>
                                    )
                                }
                            }
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

const navMenu: {
    name: string
    href: string
    icon: any
    auth: boolean | undefined
    sub?: {
        name: string
        href: string
        icon: any
        auth: boolean | undefined
    }[]
}[] = [
    {
        name: 'Home',
        href: '/',
        icon: faHouse,
        auth: undefined,
    },
    {
        name: 'Schedule',
        href: '/schedule',
        icon: faCalendarDay,
        auth: undefined,
    },
    {
        name: 'Exhibitions',
        href: '',
        icon: faFlag,
        auth: undefined,
        sub: [
            // {
            //     name: 'Science Project',
            //     href: '/sciproject',
            //     icon: faMicroscope,
            //     auth: undefined,
            // },
            // {
            //     name: 'MWIT Club',
            //     href: '/club',
            //     icon: faCubes,
            //     auth: undefined,
            // },
            {
                name: 'Curriculum',
                href: '/curriculum',
                icon: faFileInvoice,
                auth: undefined,
            },
            {
                name: 'Meet MWIT',
                href: '/meetMWIT',
                icon: faHandshake,
                auth: undefined,
            },
            {
                name: 'School Tour',
                href: '/tour',
                icon: faSchoolFlag,
                auth: undefined,
            },
        ],
    },
    // {
    //     name: 'Register',
    //     href: '/register',
    //     icon: faPenToSquare,
    //     auth: false,
    // },
    {
        name: 'Account',
        href: '',
        icon: faCircleUser,
        auth: true,
        sub: [
            {
                name: 'My Account',
                href: '/account',
                icon: faUserGear,
                auth: true,
            },
            {
                name: 'Logout',
                href: '/logout',
                icon: faRightToBracket,
                auth: true,
            },
        ],
    },
]
