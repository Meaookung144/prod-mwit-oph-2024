import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import FooterLink from "./footerlink"
import { faFacebookMessenger, faFacebookSquare } from "@fortawesome/free-brands-svg-icons"
import Link from "next/link"

export default function Footer() {
    return (
        <div className='bg-gradient-to-r from-bmw from-10% to-phd to-90%'>
        <div className='py-4 px-8 w-full max-w-6xl mx-auto flex flex-col md:flex-row justify-center items-center md:items-start gap-y-4 gap-x-6'>
          <Image
            src={process.env.CDN_URL + '/img/logo.png'}
            className='h-20 self-center'
            alt='MWIT Open House 2024'
            width={100}
            height={200}
          />
          <div className='flex flex-col w-fit max-w-lg gap-3 items-center md:items-start'>
            <span className='text-white font-CS font-semibold text-lg md:text-xl text-center'>
              MWIT&nbsp;
              <p className='inline bg-clip-text text-transparent bg-gradient-to-r from-[#88acff] to-[#ffec74]'>
                Open House 2024
              </p>
            </span>
            <FooterLink
              footerLink={footerLinkLeft.concat(footerLinkRight)}
              className='grow md:hidden flex flex-col flex-wrap items-center md:items-end font-IBMPlexLoop gap-2 text-white text-base md:text-lg'
            />
            <div className='flex flex-wrap text-white gap-3'>
              {shareSocial.map((s, i) => (
                // <button
                //   onClick={() =>
                //     window.open(s.href, '_blank', 'noopener,noreferrer')
                //   }
                //   key={i}
                // >
                <a
                  key={i}
                  href={s.href}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FontAwesomeIcon
                    icon={s.icon}
                    className='h-8 hover:text-blue-300 hover:scale-105 transition-all duration-200'
                  />
                </a>
                // </button>
              ))}
            </div>
            <div className='flex flex-col items-center md:items-start text-center font-IBMPlexLoop gap-x-2'>
              <span className='text-white text-sm md:text-base'>
                โรงเรียนมหิดลวิทยานุสรณ์
              </span>
              <span className='text-white text-xs md:text-sm whitespace-pre-wrap'>
                364 หมู่ 5 ต.ศาลายา อ.พุทธมณฑล จ.นครปฐม 73170
              </span>
            </div>
            <Link className='text-gray-300 font-IBMPlexLoop text-xs text-center' href="/credits">
              เครดิตนักพัฒนาเว็บไซต์
            </Link>
          </div>
          <div className='grow' />
          <div className='max-w-md gap-10 lg:gap-24 hidden md:grid grid-flow-col font-IBMPlexLoop text-white text-base lg:text-md'>
            <FooterLink
              footerLink={footerLinkLeft}
              className='flex flex-col flex-wrap items-center md:items-end gap-2'
            />
            <FooterLink
              footerLink={footerLinkRight}
              className='flex flex-col flex-wrap items-center md:items-end gap-2'
            />
          </div>
        </div>
      </div>
    )
}

const shareSocial = [
    {
      name: 'facebook',
      icon: faFacebookSquare,
      href: 'https://facebook.com/MWITOpenHouse',
    },
    {
      name: 'messenger',
      icon: faFacebookMessenger,
      href: 'https://m.me/MWITOpenHouse',
    },
  ]
  
  const footerLinkRight = [
    {
      name: 'Science Project',
      href: '/sciproject',
      nt: false,
    },
    {
      name: 'MWIT Square 16th',
      href: 'https://square.mwit.ac.th',
      nt: true,
    },
    {
      name: 'ระบบรับสมัครเข้าม.4',
      href: 'https://apply.mwit.ac.th',
      nt: true,
    },
    {
      name: 'เว็บไซต์โรงเรียน',
      href: 'https://www.mwit.ac.th/html',
      nt: true,
    },
  ]
  
  const footerLinkLeft = [
    {
      name: 'Home',
      href: '/',
      nt: false,
    },
    {
      name: 'Curriculum',
      href: '/curriculum',
      nt: false,
    },
    {
      name: 'MWIT Club',
      href: '/club',
      nt: false,
    },
    {
      name: 'Terms & Conditions',
      href: '/tos',
      nt: false,
    },
  ]