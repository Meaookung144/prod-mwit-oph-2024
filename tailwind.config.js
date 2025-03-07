/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                IBMPlexLoop: ['var(--font-IBM-Plex-Loop)', 'sans-serif'],
                IBMPlex: ['var(--font-IBM-Plex)', 'sans-serif'],
                B612Mono: ['var(--font-B612-Mono)', 'sans-serif'],
                CS: ["Cloud Soft", "sans-serif"],
                PPA: ["PPAgrandir-Grand", "sans-serif"],
                PPALight: ["PPAgrandir-Grand Light", "sans-serif"]
                    // Kodchasan: ["Kodchasan", "sans-serif"]
            },
            colors: {
                pa: '#4c538b',
                pb: '#a16f6c',
                ymw: "#f6bf2e",
                bmw: "#204396",
                ora: "#ea7754",
                ybg: "#ffe631",
                bbg: "#72caed",
                oft: "#f5854d",
                bft: "#3c1ba5",
                phd: "#7d4086",
                ylg: "#fef2a0",
                gpt: "#cae074",
                sdbg: "#0f082c",
                sddt: "#a2b4ff",
                sdtm: "#8292d2",
                sdtt: "#ffd98c",
                sdf1: "#6773c6",
                sdf2: "#b8596d",
                sdth: "#e78f45",
                bbk: "#10224d",
                yrg: "#fff29f",
                brg: "#a2b4ff",
                pcb: "#e5d9e7",
                bcb: "#b3c1ff",
                ycb: "#ffd257",
                ycbg: "#fcf7d4",
                bvl: "#c9deff",
                ynb: "#C69D10",
                // pvl: "#"
            },
            gridTemplateColumns: {
                "fitc-2": 'auto auto',
                "fitc-3": 'auto auto auto'
            }
        },
    },
    plugins: [
        require('tailwind-scrollbar'),
    ],
}