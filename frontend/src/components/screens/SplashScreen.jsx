import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

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
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-[#0F172A] via-slate-900 to-[#1e3a8a] flex flex-col items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-10 right-10 w-40 h-40 border border-cyan-500/20 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-20 left-20 w-32 h-32 border border-cyan-400/15 rounded-full"
        />
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
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
          {/* Card background with cyan glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#06B6D4]/20 via-slate-900/80 to-[#0891B2]/20 backdrop-blur-2xl" />
          <div className="absolute inset-0 border border-cyan-400/30 rounded-3xl shadow-2xl" style={{
            boxShadow: '0 0 40px rgba(6, 182, 212, 0.3), inset 0 0 20px rgba(6, 182, 212, 0.1)'
          }} />
          
          {/* Card content */}
          <div className="relative px-10 py-12">
            {/* Main Title - Hindi */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-6xl md:text-7xl font-bold text-center text-white mb-2"
              style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}
            >
              व्यवस्था
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-center text-cyan-300/80 text-sm tracking-[0.2em] uppercase mb-3 font-rajdhani"
            >
              Citizen Governance Portal
            </motion.p>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="h-0.5 w-12 mx-auto mb-8 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            />

            {/* Progress Bar Container */}
            <div className="mb-4">
              <div className="h-2.5 bg-slate-700/50 rounded-full overflow-hidden border border-cyan-400/20">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #06B6D4 0%, #0891B2 50%, #06B6D4 100%)',
                    boxShadow: '0 0 20px rgba(6, 182, 212, 0.8)'
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
              className="flex justify-between items-center text-cyan-300/60 text-sm font-medium"
            >
              <span>Initializing System</span>
              <span className="font-bold text-cyan-400">{Math.round(progress)}%</span>
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
        <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-cyan-500/10 border border-cyan-400/30 backdrop-blur-sm">
          <span className="text-cyan-300 font-bold text-xs tracking-wider">🇮🇳</span>
          <span className="text-cyan-300/80 text-xs tracking-widest uppercase font-medium">Digital India Initiative</span>
        </div>
      </motion.div>
    </div>
  );
}
