import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    // Animate progress from 0 to 100
    const duration = 3000; // 3 seconds
    const interval = 30;
    const increment = 100 / (duration / interval);
    
    const timer = setInterval(() => {
      setProgress(prev => {
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
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-purple-50 via-amber-50 to-teal-50 flex flex-col items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-40">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-10 right-10 w-40 h-40 border-2 border-purple-200 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-20 left-20 w-32 h-32 border-2 border-amber-200 rounded-full"
        />
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl" />
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10"
      >
        {/* Glassmorphism Card */}
        <div className="relative w-[380px] md:w-[420px] rounded-3xl overflow-hidden">
          {/* Card background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-purple-100/50 backdrop-blur-xl" />
          <div className="absolute inset-0 border-2 border-white/60 rounded-3xl shadow-2xl" style={{
            boxShadow: '0 8px 32px rgba(139, 92, 246, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.5)'
          }} />
          
          {/* Card content */}
          <div className="relative px-10 py-12">
            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-6xl md:text-7xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-amber-600 mb-2"
            >
              Vyavastha
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-center text-gray-600 text-sm tracking-[0.2em] uppercase mb-3 font-rajdhani font-semibold"
            >
              {t('splash.subtitle')}
            </motion.p>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="h-1 w-12 mx-auto mb-8 bg-gradient-to-r from-transparent via-purple-400 to-transparent rounded-full"
            />

            {/* Progress Bar Container */}
            <div className="mb-4">
              <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden border border-gray-300">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #8B5CF6 0%, #F59E0B 50%, #14B8A6 100%)',
                    boxShadow: '0 0 15px rgba(139, 92, 246, 0.5)'
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>

            {/* Progress Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex justify-between items-center text-gray-600 text-sm font-medium"
            >
              <span>{t('splash.initializing')}</span>
              <span className="font-bold text-purple-600">{Math.round(progress)}%</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Digital India Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="mt-12 relative z-10"
      >
        <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/60 border border-purple-200 backdrop-blur-sm shadow-lg">
          <span className="text-2xl">🇮🇳</span>
          <span className="text-gray-700 text-xs tracking-widest uppercase font-medium">{t('splash.digitalIndia')}</span>
        </div>
      </motion.div>
    </div>
  );
}
