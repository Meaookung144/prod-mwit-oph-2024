import { motion } from 'framer-motion'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

interface ButtonProps {
  m: {
    name: string
    fa: boolean
    icon: any
    href: string | undefined
    disabled: boolean
    inner?: boolean
  }
  toHome: () => void
}

export default function Button({ m, toHome, ...props }: ButtonProps) {
  const [hoverMotion, setHoverMotion] = useState(false)
  const [hover, setHover] = useState(false)
  const path = usePathname()
  const router = useRouter()
  const menuVar = {
    initial: { opacity: 0, scale: 0.8 },
    active: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        delay: hoverMotion ? 0 : 1,
        type: 'spring',
      },
    },
    hovering: {
      scale: 1.05,
      transition: {
        duration: 0.5,
        type: 'spring',
        // delay: 0,
        // scale: { delay: 0 },
      },
    },
  }
  return (
    <motion.a
      {...props}
      className={
        (m.disabled
          ? 'bg-white/30 text-bmw/50'
          : 'bg-white/50' +
            ' hover:bg-ymw/70 text-bmw hover:text-black cursor-pointer') +
        ' grayscale-0 transition-colors duration-200 rounded-xl p-3 grid grid-flow-row content-center gap-2 md:gap-3 justify-items-center hover:drop-shadow-lg'
      }
      variants={menuVar}
      initial={'initial'}
      animate={'active'}
      whileHover={m.disabled ? undefined : 'hovering'}
      onHoverStart={() => {
        setHoverMotion(true)
        setHover(true)
      }}
      onHoverEnd={() => setHover(false)}
      onClick={
        m.name === 'Home'
          ? toHome
          : m.inner
          ? () => router.push(m.href || path)
          : () => {}
      }
      // disabled={m.disabled}
      href={m.inner && m.href ? undefined : m.href}
      target='_blank'
      rel='noopener noreferrer'
    >
      {m.fa ? (
        <FontAwesomeIcon icon={m.icon} className='h-6 md:h-8 lg:h-10' />
      ) : (
        <Image
          src={m.icon}
          className={
            'h-6 md:h-8 lg:h-10 ' +
            (m.disabled ? 'opacity-20' : hover && 'grayscale')
          }
          alt={m.name}
          height={100}
          width={100}
          style={{ height: 'auto', objectFit: 'contain', position: 'relative' }}
        />
      )}
      <span className='font-CS font-bold text-xs sm:text-base md:text-lg lg:text-xl text-center'>
        {m.name}
      </span>
    </motion.a>
  )
}
