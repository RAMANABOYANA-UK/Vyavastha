import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 3000;
    const interval = 30;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #4a1a5c 0%, #6b2d7a 25%, #8b4a9c 50%, #6b2d7a 75%, #4a1a5c 100%)',
      }}
    >
      {/* Animated gradient background */}
      <motion.div
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #4a1a5c 0%, #6b2d7a 25%, #8b4a9c 50%, #6b2d7a 75%, #4a1a5c 100%)',
          backgroundSize: '400% 400%',
          opacity: 0.8,
        }}
      />

      {/* Main Content Container */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center justify-center gap-8 px-4"
      >
        {/* Vyavastha Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-6xl md:text-7xl font-bold text-white text-center"
          style={{
            textShadow: '0 0 30px rgba(255, 255, 255, 0.3), 0 0 60px rgba(139, 92, 246, 0.2)',
          }}
        >
          Vyavastha
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center text-gray-100 text-lg tracking-widest uppercase font-light"
        >
          Citizen Governance Portal
        </motion.p>

        {/* Animated divider line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100px' }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent"
        />

        {/* Progress Bar Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="w-64 md:w-80 mt-8"
        >
          {/* Progress Bar */}
          <div className="h-1.5 bg-gray-600/40 rounded-full overflow-hidden backdrop-blur-sm border border-gray-500/30 mb-4">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #ff9a56 0%, #ffb570 50%, #ff9a56 100%)',
                boxShadow: '0 0 15px rgba(255, 154, 86, 0.8)',
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Progress Text */}
          <div className="flex justify-between items-center text-gray-200 text-sm">
            <motion.span
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="font-light"
            >
              Initializing System
            </motion.span>
            <span className="font-medium tracking-widest">{Math.round(progress)}%</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
