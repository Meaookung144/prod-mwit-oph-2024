import Link from 'next/link'
import { currData } from '../../data/curr'
import Image from 'next/image'
import { Metadata } from 'next'

const meta: Metadata = {
  title: 'MWIT Curriculum | MWIT Open House 2024',
  description:
    'หลักสูตร คำอธิบายรายวิชา และลักษณะการเรียนการสอนแต่ละสาขาของโรงเรียนมหิดลวิทยานุสรณ์ | MWIT Open House 2024',
}

export default function Curriculum() {
  return (
    <>
      <main className='w-full bg-gray-300/30'>
        <div className='flex flex-col text-black items-center mx-auto justify-self-center w-full max-w-6xl px-6 pt-10 pb-2'>
          <span className='font-CS font-bold text-bmw text-3xl md:text-4xl lg:text-5xl'>
            MWIT Curriculum
          </span>
          <div className='px-3 py-1 mt-2 mb-4 font-IBMPlex text-center text-base md:text-lg text-bbk'>
            หลักสูตร คำอธิบายรายวิชา
            และลักษณะการเรียนการสอนแต่ละสาขาของโรงเรียนมหิดลวิทยานุสรณ์
          </div>
        </div>

        <div className='flex flex-wrap relative overflow-y-hidden max-w-6xl mx-auto px-6 justify-center gap-4 pb-10'>
          {currData.map((c, i) => (
            <Link className='rounded-xl bg-white hover:bg-gray-200 hover:scale-105 transition-all duration-300 shadow-lg max-w-xs overflow-hidden' href={'/curriculum/' + c.id} key={i}>
                <Image
                  src={
                    process.env.CDN_URL + '/img/subject/' + c.cover + '.webp'
                  }
                  className='w-full'
                  alt={c.name}
                  width={400}
                  height={200}
                />
                <div className='px-3 py-2 flex flex-col gap-1'>
                  <span className='font-CS font-semibold text-xl text-bmw'>
                    {c.name}
                  </span>
                  {c.sub && (
                    <span className='font-IBMPlex font-semibold text-base text-bbk'>
                      {c.sub}
                    </span>
                  )}
                </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}
