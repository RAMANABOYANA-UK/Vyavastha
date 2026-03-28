import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Bell, ClipboardList, User, Plus } from 'lucide-react';
import { useUIStore, useAuthStore, useNotificationsStore } from '../store';

export default function BottomNav() {
  const { activeTab, setActiveTab, setScreen, setShowAuthModal } = useUIStore();
  const { isAuthenticated } = useAuthStore();
  const { unreadCount, fetchNotifications } = useNotificationsStore();

  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'complaints', icon: ClipboardList, label: 'Complaints' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  // Poll notifications every 15s so the badge stays live
  useEffect(() => {
    if (!isAuthenticated) return;
    fetchNotifications();
    const interval = setInterval(() => fetchNotifications(), 15000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleTabClick = (tabId) => {
    if ((tabId === 'notifications' || tabId === 'complaints' || tabId === 'profile') && !isAuthenticated) {
      setShowAuthModal(true, 'login');
      return;
    }
    setActiveTab(tabId);
  };

  const handleFabClick = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true, 'login');
      return;
    }
    setScreen('category');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-600 via-purple-500 to-amber-500 backdrop-blur-md flex items-center justify-around px-2 py-2 pb-4 z-50 shadow-[0_-4px_30px_rgba(139,92,246,0.4)]" style={{
      boxShadow: '0 -4px 30px rgba(139, 92, 246, 0.4)'
    }}>
      {/* First two tabs */}
      {tabs.slice(0, 2).map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        const showBadge = tab.id === 'notifications' && unreadCount > 0;
        
        return (
          <motion.button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`relative flex flex-col items-center gap-0.5 min-w-[56px] px-2 py-2.5 transition-all duration-300 rounded-lg border-b-2 ${
              isActive 
                ? 'text-white border-white bg-white/10 animate-bounce-in' 
                : 'text-white/70 border-transparent hover:bg-white/5'
            }`}
          >
            <div className="relative">
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              {showBadge && (
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="absolute -top-1.5 -right-2 min-w-[18px] h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-0.5"
                >
                  {unreadCount > 9 ? '9+' : unreadCount}
                </motion.span>
              )}
            </div>
            <span className="text-[11px] font-medium font-rajdhani">{tab.label}</span>
          </motion.button>
        );
      })}

      {/* FAB Button */}
      <motion.button
        onClick={handleFabClick}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [-4, 0, -4] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-purple-600 border-4 border-white text-white flex items-center justify-center shadow-2xl -mt-10 transition-all"
      >
        <Plus size={32} strokeWidth={2.5} />
      </motion.button>

      {/* Last two tabs */}
      {tabs.slice(2).map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <motion.button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`flex flex-col items-center gap-0.5 min-w-[56px] px-2 py-2.5 transition-all duration-300 rounded-lg border-b-2 ${
              isActive 
                ? 'text-white border-white bg-white/10 animate-bounce-in' 
                : 'text-white/70 border-transparent hover:bg-white/5'
            }`}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[11px] font-medium font-rajdhani">{tab.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
