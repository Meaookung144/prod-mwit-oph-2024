"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function TempClientUseEffect({ bodyId }: { bodyId: string }) {
    const path = usePathname();
    const isHome = path === "/" || path === "";
    
    function scrollToTop() {
        if (!(typeof window !== 'undefined')) return;
        window.scrollTo({ top: 0, behavior: 'instant' });
    }

    useEffect(() => {
        !isHome && sessionStorage.setItem('loadhome', 'true')
        if (isHome && sessionStorage.getItem('loadhome')) {
            scrollToTop()
        }
        console.log('path', path)
        if (path === '/schedule/') {
            scrollToTop()
        }
        path === '/club/[id]'
            ? sessionStorage.setItem('loadclub', 'true')
            : path !== '/club' && sessionStorage.setItem('loadclub', 'false')
    }, [isHome, path])

    useEffect(() => {
        if (isHome && bodyId) {
            console.log('bodyId', bodyId)
            const body = document.getElementById(bodyId)
            if (body) body.classList.add('w-full', 'absolute', 'top-[100%]')
        } else if (bodyId) {
            const body = document.getElementById(bodyId)
            if (body) body.classList.remove('w-full', 'absolute', 'top-[100%]')
        }
    }, [isHome, bodyId])

    return (<></>)
}