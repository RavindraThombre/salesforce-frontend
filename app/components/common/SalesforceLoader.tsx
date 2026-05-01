"use client";

import { motion } from "framer-motion";

export default function SalesforceLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
      <div className="relative flex flex-col items-center justify-center">
        {/* Outer rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
          className="w-24 h-24 rounded-full border-4 border-blue-100 border-t-blue-500 border-r-cyan-400 shadow-2xl"
        />

        {/* Inner pulsing cloud */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0.7 }}
          animate={{ scale: [0.9, 1.08, 0.9], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="absolute"
        >
          <div className="text-4xl drop-shadow-lg">☁️</div>
        </motion.div>

        {/* Floating glow dots */}
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute w-32 h-32"
        >
          <span className="absolute top-2 left-6 w-2.5 h-2.5 rounded-full bg-blue-400 blur-[1px]" />
          <span className="absolute bottom-4 right-5 w-3 h-3 rounded-full bg-cyan-300 blur-[1px]" />
          <span className="absolute top-8 right-2 w-2 h-2 rounded-full bg-blue-300 blur-[1px]" />
        </motion.div>

        {/* Brand Text */}
        <motion.div
          initial={{ opacity: 0.6 }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-8 text-center"
        >
          <h2
            className="text-xl sm:text-2xl font-bold tracking-tight"
            style={{
              color: "var(--wes-g-color-palette-blue-20, #032D60)",
              fontFamily:
                "var(--wes-g-font-family-display), Inter, system-ui, sans-serif",
            }}
          >
            BlueCloudMentor
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Loading your Salesforce journey...
          </p>
        </motion.div>
      </div>
    </div>
  );
}
