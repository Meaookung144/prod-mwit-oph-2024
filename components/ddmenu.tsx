"use client";

import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, motion } from 'framer-motion'
import { signOut } from 'next-auth/react';
import Link from 'next/link'
import { useState } from 'react'

interface DropdownMenuProps {
  m: {
    name: string
    icon: any
    sub: {
      name: string
      icon: any
      href: string
      auth: boolean | undefined
    }[]
  }
}

export default function DropdownMenu({ m, ...props }: DropdownMenuProps) {
  const [hover, setHover] = useState(false)
  async function logout() {
    await signOut({ redirect: true, callbackUrl: '/' })
  }
  return (
    <button
      className='hidden group relative h-full md:flex items-center justify-center gap-2'
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...props}
    >
      <div className='group-hover:text-[#cdbcff] flex items-center justify-center gap-2 transition-all duration-200'>
        <FontAwesomeIcon icon={m.icon} className='h-[0.9em] pb-[0.3rem]' />
        <span>{m.name}</span>
        <FontAwesomeIcon icon={faAngleDown} className='h-[0.9em] pb-[0.3rem]' />
      </div>
      <AnimatePresence>
        {hover ? (
          <motion.div
            className='absolute pb-1 rounded-b-lg bg-phd/90 backdrop-blur-sm -right-2 top-full flex flex-col items-start gap-1'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {m.sub
              .map((s, si) => {
                return (
                  <Link href={s.href == "/logout" ? '#' : s.href} onClick={s.href == '/logout' ? logout : undefined} key={si} className={
                    (si === 0 ? '' : 'border-t-white border-t') +
                    ' flex w-full px-3 pt-1 items-center justify-start gap-2 text-white hover:bg-phd/80 transition-all duration-200'
                  }>
                    <FontAwesomeIcon
                      icon={s.icon}
                      className='w-[0.9em] pb-[0.3rem]'
                    />
                    <span className='whitespace-nowrap'>{s.name}</span> 
                  </Link>
                )
              })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </button>
  )
}
