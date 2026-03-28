import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useUIStore, useAuthStore } from '../../store';

export function HomeScreen_getBanners() {
  return [
    {
      bg: 'bg-gradient-to-br from-blue-400 to-indigo-500',
      title: 'Smart City, Smart Citizens',
      emoji: '🏙️',
      sub: 'Your voice builds better infrastructure',
      textColor: 'text-white',
    },
    {
      bg: 'bg-gradient-to-br from-purple-400 via-indigo-400 to-blue-500',
      title: 'Report. Track. Transform.',
      emoji: '🎯',
      sub: 'AI-powered civic engagement',
      textColor: 'text-white',
    },
    {
      bg: 'bg-gradient-to-br from-blue-400 via-purple-400 to-indigo-500',
      title: 'Vyavastha\nService',
      emoji: '🇮🇳',
      sub: 'VYAVASTHA - Citizen Grievance Portal',
      textColor: 'text-white',
    },
  ];
}

export default function HomeScreen() {
  const { t } = useTranslation();
  const [slide, setSlide] = useState(0);
  const { setScreen, setShowAuthModal } = useUIStore();
  const { isAuthenticated, user } = useAuthStore();

  const banners = [
    {
      bg: 'bg-gradient-to-br from-purple-400 to-purple-600',
      title: `${t('home.smartCity')}\n${t('common.citizen')}`,
      emoji: '🏙️',
      sub: t('home.buildBetter'),
      textColor: 'text-white',
    },
    {
      bg: 'bg-gradient-to-br from-amber-400 via-amber-500 to-purple-600',
      title: t('home.reportTrack'),
      emoji: '🎯',
      sub: t('home.aiPowered'),
      textColor: 'text-white',
    },
    {
      bg: 'bg-gradient-to-br from-teal-400 via-purple-500 to-amber-500',
      title: t('home.vyavasthaPortal'),
      emoji: '🇮🇳',
      sub: t('common.appName'),
      textColor: 'text-white',
    },
  ];

  const actionCards = [
    { 
      icon: '📋', 
      title: t('home.post_complaint'), 
      sub: t('home.post_complaint_sub'), 
      gradient: 'from-purple-500 to-purple-600',
      screen: 'category' 
    },
    { 
      icon: '⭐', 
      title: t('home.rate_service'), 
      sub: t('home.rate_service_sub'), 
      gradient: 'from-amber-500 to-amber-600',
      screen: 'rateToilet' 
    },
    { 
      icon: '👥', 
      title: t('home.community'), 
      sub: t('home.community_sub'), 
      gradient: 'from-teal-500 to-teal-600',
      screen: 'community' 
    },
    { 
      icon: '🧠', 
      title: t('home.quiz'), 
      sub: t('home.quiz_sub'), 
      gradient: 'from-purple-600 to-amber-500',
      screen: 'quiz' 
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((s) => (s + 1) % banners.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleActionClick = (screen) => {
    if (!screen) return;
    if (!isAuthenticated) {
      setShowAuthModal(true, 'login');
      return;
    }
    setScreen(screen);
  };

  const banner = banners[slide];

  // Get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('home.greeting');
    if (hour < 17) return t('home.greeting_afternoon');
    return t('home.greeting_evening');
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-purple-50 via-amber-50 to-teal-50">
      {/* Banner */}
      <div 
        className={`h-72 ${banner.bg} flex flex-col items-center justify-center gap-3 transition-all duration-500 relative px-6 shadow-lg`}
      >
        <div className="text-7xl mb-2 drop-shadow-lg">{banner.emoji}</div>
        <div className={`font-extrabold text-2xl md:text-4xl ${banner.textColor || 'text-white'} text-center leading-tight whitespace-pre-line drop-shadow-lg`}>
          {banner.title}
        </div>
        <div className={`text-base ${banner.textColor || 'text-white'} text-center opacity-90`}>{banner.sub}</div>
        
        {/* Dots */}
        <div className="flex gap-2 absolute bottom-4">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === slide ? 'w-6 bg-white' : 'w-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Greeting Card */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="mt-5 mb-4 bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-purple-600 font-extrabold text-xl">
                {getGreeting()},<br />
                {t('common.welcome')} {isAuthenticated ? user?.name || t('common.citizen') : t('common.activeCitizen')} 👋
              </div>
              <div className="text-gray-500 text-sm mt-1">
                {t('home.todayActions')}
              </div>
            </div>
            {/* XP Badge */}
            <motion.div 
              className="bg-gradient-to-r from-purple-500 to-amber-500 px-4 py-2 rounded-xl text-white shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-xs">{t('home.yourXP')}</p>
              <p className="text-xl font-bold">{user?.points || 850}</p>
            </motion.div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-4">
          {actionCards.map((card, i) => (
            <motion.div
              key={i}
              onClick={() => handleActionClick(card.screen)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className={`h-[170px] rounded-2xl bg-gradient-to-br ${card.gradient} p-5 text-white flex flex-col justify-between shadow-lg transition-all cursor-pointer animate-complaint-form-in`}
            >
              <div className="text-4xl">{card.icon}</div>
              <div>
                <div className="font-bold text-lg leading-tight">
                  {card.title}
                </div>
                <div className="text-sm opacity-90 mt-1">{card.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 pb-6">
          {[
            { value: user?.complaintsPosted || 3, label: t('home.posted'), icon: '📝', color: 'from-purple-500 to-purple-600' },
            { value: user?.complaintsResolved || 2, label: t('complaint.resolved'), icon: '✅', color: 'from-teal-500 to-teal-600' },
            { value: `#12`, label: t('home.yourRank'), icon: '🏆', color: 'from-amber-500 to-amber-600' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 * i }}
              whileHover={{ scale: 1.05 }}
              className={`bg-gradient-to-br ${stat.color} rounded-2xl p-5 text-white text-center shadow-lg animate-status-progress`}
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="font-bold text-2xl">{stat.value}</div>
              <div className="text-sm opacity-80">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
