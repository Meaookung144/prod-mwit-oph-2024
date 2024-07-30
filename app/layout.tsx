import { Metadata } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import LandingPage from '../components/landing'
import { B612_Mono, IBM_Plex_Sans_Thai, IBM_Plex_Sans_Thai_Looped } from 'next/font/google'
import localFont from 'next/font/local'
import { useId } from 'react'
import Provider from '../components/utils/provider'
import TempClientUseEffect from '../components/utils/tmpclienthook'

const IBMPlexLoop = IBM_Plex_Sans_Thai_Looped({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'thai'],
  variable: '--font-IBM-Plex-Loop',
})

const IBMPlex = IBM_Plex_Sans_Thai({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'thai'],
  variable: '--font-IBM-Plex',
})

const B612Mono = B612_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-B612-Mono',
})
 
export const metadata: Metadata = {
  title: 'MWIT Open House 2024',
  description: 'MWIT Open House 2024 เปิดบ้านโรงเรียนมหิดลวิทยานุสรณ์ พบกับกิจกรรมและนิทรรศการมากมายตลอดวันที่ 23 - 24 สิงหาคม 2567 ในรูปแบบออนไซต์',
  openGraph: {
    title: 'MWIT Open House 2024',
    description: 'MWIT Open House 2024 เปิดบ้านโรงเรียนมหิดลวิทยานุสรณ์ พบกับกิจกรรมและนิทรรศการมากมายตลอดวันที่ 23 - 24 สิงหาคม 2567 ในรูปแบบออนไซต์',
    url: 'https://openhouse.mwit.ac.th',
    type: 'website',
    images: [
      {
        url: process.env.CDN_URL + '/img/ogimage.png?set=1',
        width: 1200,
        height: 630,
        alt: 'MWIT Open House 2024',
      },
    ],
  },
  twitter: {
    site: '@mwit',
    card: 'summary_large_image',
    title: 'MWIT Open House 2024',
    description: 'MWIT Open House 2024 เปิดบ้านโรงเรียนมหิดลวิทยานุสรณ์ พบกับกิจกรรมและนิทรรศการมากมายตลอดวันที่ 23 - 24 สิงหาคม 2567 ในรูปแบบออนไซต์',
    images: [
        {
            url: process.env.CDN_URL + '/img/ogimage.png?set=1',
            width: 1200,
            height: 630,
            alt: 'MWIT Open House 2024',
        },
        ],
  },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const bodyId = useId()
    return (
        <html lang='en' className={`${IBMPlexLoop.variable} ${IBMPlex.variable} ${B612Mono.variable}`}>
            <Head>
                <Link rel='manifest' href='/manifest.json' />
                <Link
                    rel='apple-touch-icon'
                    href={process.env.CDN_URL + '/img/icon-512x512.png'}
                />
                <meta name='theme-color' content='#fcf4a0' />
                <Link rel='icon' href='/favicon.ico' />
            </Head>
            <Provider>
              <body>
                  <div className={'fixed -z-10 bg-[url("/img/wbg.png")] bg-no-repeat bg-cover	 w-full h-screen'} />
                  <LandingPage />
                  <TempClientUseEffect bodyId={bodyId} />
                  <div className='flex flex-col w-full min-h-screen' id={bodyId}>
                    {children}
                  </div>
              </body>
            </Provider>
        </html>
    )
  }