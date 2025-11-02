"use client";
import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(true);

  // Espera 400ms antes de liberar o conteúdo inicial
  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="relative"
      >
        {children}

        {/* Overlay de transição dourada */}
        <AnimatePresence>
          {isAnimating && (
            <motion.div
              key="overlay"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="fixed inset-0 z-[999] flex items-center justify-center"
              style={{
                background:
                  "radial-gradient(circle at center, #D4AF37 0%, #001F3F 100%)",
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="font-serif text-5xl font-semibold tracking-wider"
                style={{ color: "#fff", letterSpacing: "3px" }}
              >
                MD
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
