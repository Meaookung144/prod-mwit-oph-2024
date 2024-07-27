/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})
const nextConfig = withPWA({
  reactStrictMode: false,
  swcMinify: true,
  trailingSlash: true,
  // assetPrefix: process.env.NODE_ENV === 'production' ? 'https://openhouse.mwit.ac.th/' : '',
  env: {
    // API_URL: 'https://ophdev.loca.lt',
    // CDN_URL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.CDN_URL + '',
    CDN_URL:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://mwit-oph-2024.vercel.app',
    ORI_URL:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://mwit-oph-2024.vercel.app',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/img/**',
      },
      {
        protocol: 'https',
        hostname: 'mwit-oph-2024.vercel.app',
        port: '',
        pathname: '/img/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '**',
      },
    ],
    disableStaticImages: true,
  },
  // async headers() {
  //     return [{
  //         // matching all API routes
  //         source: "/api/:path*",
  //         headers: [
  //             { key: "Access-Control-Allow-Credentials", value: "true" },
  //             { key: "Access-Control-Allow-Origin", value: "http://localhost:3000" },
  //             {
  //                 key: "Access-Control-Allow-Methods",
  //                 value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  //             },
  //             {
  //                 key: "Access-Control-Allow-Headers",
  //                 value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  //             },
  //         ],
  //     }, ]
  // },
})

module.exports = nextConfig
