import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Floating particle component
const FloatingParticle = ({ delay, duration, x, y, size }) => {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, rgba(139, 92, 246, 0.3), transparent)`,
        filter: 'blur(2px)',
      }}
      initial={{ x: x, y: y, opacity: 0 }}
      animate={{
        x: x + (Math.random() - 0.5) * 200,
        y: y + (Math.random() - 0.5) * 200,
        opacity: [0, 1, 0.5, 1, 0],
      }}
      transition={{
        delay,
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

// Animated background orb
const OrbitingOrb = ({ delay, radius, duration, color }) => {
  return (
    <motion.div
      className="absolute"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ delay, duration, repeat: Infinity, ease: 'linear' }}
      style={{
        width: radius * 2,
        height: radius * 2,
        left: '50%',
        top: '50%',
        marginLeft: -radius,
        marginTop: -radius,
      }}
    >
      <motion.div
        className="absolute w-3 h-3 rounded-full"
        style={{
          background: color,
          right: 0,
          top: '50%',
          filter: 'blur(1px)',
          boxShadow: `0 0 10px ${color}`,
        }}
      />
    </motion.div>
  );
};

// Animated text character
const AnimatedChar = ({ char, delay, index }) => {
  const characterVariants = {
    hidden: { opacity: 0, y: 20, rotateX: 90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay,
        duration: 0.6,
        ease: 'easeOut',
      },
    },
    hover: {
      y: -10,
      color: '#F59E0B',
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.span
      variants={characterVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="inline-block"
      style={{ perspective: '1000px' }}
    >
      {char}
    </motion.span>
  );
};

export default function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

  const title = 'Vyavastha';

  // Generate particles
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    delay: Math.random() * 2,
    duration: 4 + Math.random() * 2,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 30 + 10,
  }));

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden" 
         style={{
           background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #292450 50%, #1a1f3a 75%, #0f172a 100%)',
           backgroundSize: '400% 400%',
         }}>
      {/* Animated gradient background */}
      <motion.div
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #292450 50%, #1a1f3a 75%, #0f172a 100%)',
          backgroundSize: '400% 400%',
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 opacity-60">
        {particles.map((particle) => (
          <FloatingParticle
            key={particle.id}
            delay={particle.delay}
            duration={particle.duration}
            x={particle.x}
            y={particle.y}
            size={particle.size}
          />
        ))}
      </div>

      {/* Orbiting elements */}
      <div className="absolute inset-0 opacity-30">
        <OrbitingOrb delay={0} radius={120} duration={15} color="rgba(139, 92, 246, 0.5)" />
        <OrbitingOrb delay={0.5} radius={80} duration={20} color="rgba(245, 158, 11, 0.5)" />
        <OrbitingOrb delay={1} radius={160} duration={25} color="rgba(20, 184, 166, 0.5)" />
      </div>

      {/* Main Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10"
      >
        {/* Glowing card background */}
        <motion.div
          animate={{
            boxShadow: [
              '0 0 40px rgba(139, 92, 246, 0.3), 0 0 80px rgba(245, 158, 11, 0.2)',
              '0 0 60px rgba(139, 92, 246, 0.5), 0 0 120px rgba(245, 158, 11, 0.3)',
              '0 0 40px rgba(139, 92, 246, 0.3), 0 0 80px rgba(245, 158, 11, 0.2)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="relative w-[380px] md:w-[420px] rounded-3xl overflow-hidden"
        >
          {/* Card background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800/80 via-purple-900/40 to-slate-900/80 backdrop-blur-xl" />

          {/* Animated border gradient */}
          <motion.div
            animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-3xl"
            style={{
              background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.5), rgba(245, 158, 11, 0.3), rgba(20, 184, 166, 0.3))',
              backgroundSize: '200% 200%',
              padding: '2px',
              maskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'exclude',
            }}
          />

          <div className="relative border border-white/20 rounded-3xl" style={{
            boxShadow: 'inset 0 0 20px rgba(139, 92, 246, 0.2), 0 0 30px rgba(139, 92, 246, 0.15)',
          }} />

          {/* Card content */}
          <div className="relative px-10 py-12">
            {/* Main Title with animated characters */}
            <motion.div className="text-6xl md:text-7xl font-bold text-center mb-2">
              {title.split('').map((char, i) => (
                <AnimatedChar
                  key={i}
                  char={char}
                  delay={0.3 + i * 0.1}
                  index={i}
                />
              ))}
            </motion.div>

            {/* Animated title background glow */}
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl md:text-7xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-amber-400 to-teal-400 blur-lg absolute top-12 left-0 right-0 -z-10"
            >
              Vyavastha
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-center text-gray-300 text-sm tracking-[0.2em] uppercase mb-3 font-rajdhani font-semibold"
            >
              Citizen Governance Portal
            </motion.p>

            {/* Animated divider */}
            <div className="flex justify-center gap-2 mb-8">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ scaleY: [1, 2, 1] }}
                  transition={{ delay: 0.8 + i * 0.15, duration: 0.8, repeat: Infinity }}
                  className="h-6 w-1 bg-gradient-to-b from-purple-400 via-amber-400 to-teal-400 rounded-full"
                />
              ))}
            </div>

            {/* Progress Bar Container */}
            <div className="mb-4">
              <div className="h-2.5 bg-gray-700/50 rounded-full overflow-hidden border border-gray-600/50 backdrop-blur-sm">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #8B5CF6 0%, #F59E0B 50%, #14B8A6 100%)',
                    boxShadow: '0 0 20px rgba(139, 92, 246, 0.8), inset 0 0 10px rgba(255, 255, 255, 0.2)',
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
              transition={{ delay: 1 }}
              className="flex justify-between items-center text-gray-300 text-sm font-medium"
            >
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Initializing System
              </motion.span>
              <span className="font-bold text-purple-400">{Math.round(progress)}%</span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Digital India Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="mt-12 relative z-10"
      >
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(139, 92, 246, 0.5)' }}
          className="flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-900/40 to-amber-900/40 border border-purple-400/50 backdrop-blur-md shadow-lg cursor-pointer transition-all"
        >
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="text-2xl"
          >
            🇮🇳
          </motion.span>
          <span className="text-gray-200 text-xs tracking-widest uppercase font-medium">Digital India Initiative</span>
        </motion.div>
      </motion.div>

      {/* Floating action dots */}
      <div className="absolute inset-0 pointer-events-none">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: ['#8B5CF6', '#F59E0B', '#14B8A6'][i % 3],
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              delay: i * 0.5,
              duration: 2,
              repeat: Infinity,
            }}
          />
        ))}
      </div>
    </div>
  );
}
