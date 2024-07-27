'use client';

import { Suspense } from "react";

import '../styles/globals.css'
import { AnimatePresence, motion } from 'framer-motion'

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AnimatePresence exitBeforeEnter>
                <motion.div
                    className='flex justify-center grow'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Suspense>
                        {children}
                    </Suspense>
                </motion.div>
            </AnimatePresence>
        </>
    )
}