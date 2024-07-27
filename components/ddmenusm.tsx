import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { signOut, useSession } from "next-auth/react"
import { useState } from 'react'

interface DropdownMenuSmProps {
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

export default function DropdownMenuSm({ m, ...props }: DropdownMenuSmProps) {
  const [openMenu, setOpenMenu] = useState(false)
  const { status } = useSession({ required: false })
  async function logout() {
    await signOut({ redirect: true, callbackUrl: '/' })
  }
  console.log(m.sub)
  return (
    <button
      className='group flex w-full justify-start items-start gap-2 text-bbk transition-all duration-200'
      onClick={() => setOpenMenu(!openMenu)}
    >
      <FontAwesomeIcon
        icon={m.icon}
        className='mt-[0.15rem] w-[1em] group-focus:text-bmw'
      />
      <div className='flex flex-col grow'>
        <div className='flex group-focus:text-bmw'>
          <span className=''>{m.name}</span>
          <div className='flex grow justify-end items-center'>
            <FontAwesomeIcon
              icon={openMenu ? faAngleUp : faAngleDown}
              className=''
            />
          </div>
        </div>
        <AnimatePresence>
          {openMenu && (
            <motion.div
              className='flex flex-col w-full pt-2'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {m.sub
                .filter((s) => {return s.auth === null || s.auth === undefined || (status && s.auth === (status === 'authenticated'))})
                .map((s, si) => (
                  <Link className='flex w-full py-1 items-center justify-start gap-2 text-bbk hover:text-bmw transition-all duration-200' href={s.href == "/logout" ? '#' : s.href} onClick={s.href == '/logout' ? logout : undefined} key={si}>
                    <FontAwesomeIcon
                      icon={s.icon}
                      className='w-[0.9em] pb-[0.3rem]'
                    />
                    <span className='whitespace-nowrap'>{s.name}</span>
                  </Link>
                ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </button>
  )
}
