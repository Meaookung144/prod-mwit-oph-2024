import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'

const howToData = [
  {
    img: 'reg01.webp',
    name: 'เลือกเมนู "Register" บนแถบเมนูด้านบน กรอกข้อมูลให้ครบถ้วน กด "ลงทะเบียน" เพื่อสร้างบัญชี',
  },
  {
    img: 'reg02.webp',
    name: 'หากลงทะเบียนสำเร็จจะขึ้นคำแจ้งเตือน "ลงทะเบียนสำเร็จ!" ด้านบน',
  },
  {
    img: 'reg03.webp',
    name: 'ไปยังอีเมลของคุณเพื่อยืนยันบัญชี หากไม่บนในกล่องข้อความหลัก กรุณาตรวจสอบใน Spam Email',
  },
  {
    img: 'reg04.webp',
    name: 'หากอยู่ใน Spam Email ให้กด "Report not spam" เพื่อให้สามารถกดลิงก์ยืนยันได้',
  },
  {
    img: 'reg05.webp',
    name: 'กลับมาตรวจสอบในกล่องข้อความหลักอีกครั้ง กดลิงก์ที่อยู่ในข้อความเพื่อยืนยันอีเมล',
  },
  {
    img: 'reg06.webp',
    name: 'รอดำเนินการสักครู๋ จะพบข้อความ "ยืนยันอีเมลสำเร็จ!" จากนั้นสามารถเข้าสู่ระบบได้ทันที',
  },
  {
    img: 'reg07.webp',
    name: 'หลังเข้าสู่ระบบสามารถเลือกเมนู "Booking" ที่แถบเมนูด้านบนแล้วลงทะเบียนกิจกรรมได้เลย!',
  },
]

export const metadata: Metadata = {
    title: 'ขั้นตอนการสมัครบัญชีใหม่ | MWIT Open House 2024',
    description: 'ขั้นตอนการสมัครบัญชีใหม่และลงทะเบียนกิจกรรม | MWIT Open House 2024',
};

export default function HowToReg() {
  return (
    <>
      <main className='w-full bg-white/30'>
        <div className='flex flex-col text-black gap-10 items-center mx-auto justify-self-center w-full max-w-7xl px-8 py-10'>
          <div className='flex flex-col justify-center items-center gap-4'>
            <span className='font-CS font-bold text-3xl md:text-4xl lg:text-5xl'>
              ขั้นตอนการสร้างบัญชีใหม่
            </span>
            <div className='flex font-IBMPlexLoop text-gray-700 text-base md:text-lg gap-2'>
              <span className=''>ยังไม่มีบัญชี?</span>
              <Link className='underline' href={'/register'}>
                ลงทะเบียน
              </Link>
            </div>
            <div className='flex flex-wrap justify-center items-center text-center font-IBMPlexLoop text-gray-700 text-base md:text-lg gap-2'>
              <span className='text-nowrap'>พบปัญหาในการลงทะเบียน?</span>
              <Link legacyBehavior href={'https://m.me/MWITOpenHouse'}>
                <a className='underline text-nowrap'>
                  ติดต่อทาง Inbox Page MWIT Open House 2024
                </a>
              </Link>
            </div>
          </div>

          <div className='flex flex-wrap justify-center gap-4'>
            {howToData ? (
              howToData.map((b, i) => (
                <div
                  className='w-full max-w-sm flex flex-col rounded-2xl p-4 overflow-hidden bg-white'
                  key={i}
                >
                  <span className='text-2xl md:text-3xl font-CS font-bold text-black text-center'>
                    {i + 1}
                  </span>
                  <span className='text-sm md:text-base font-IBMPlexLoop text-black text-center'>
                    {b.name}
                  </span>
                  <div className='flex flex-col justify-end gap-1 grow'>
                    <Image
                      src={process.env.CDN_URL + '/img/support/' + b.img}
                      className='w-full'
                      alt={b.name}
                      width={500}
                      height={500}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className='flex flex-col gap-3 p-4 rounded-lg'>
                <div className='flex gap-2 text-xl justify-center items-center font-IBMPlexLoop'>
                  <FontAwesomeIcon icon={faSpinner} className='animate-spin' />
                  <span className=''>กำลังโหลดข้อมูล</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
