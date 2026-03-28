import { ChevronRight, FileText, Settings, HelpCircle, Info, LogOut, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import TealHeader from '../TealHeader';
import { useAuthStore, useUIStore } from '../../store';
import toast from 'react-hot-toast';

export default function ProfileScreen() {
  const { t } = useTranslation();
  const { user, logout, isAuthenticated } = useAuthStore();
  const { setScreen, setActiveTab, setShowAuthModal, requestSwitchRole } = useUIStore();

  const handleLogout = () => {
    logout();
    toast.success(t('profile.loggedOutSuccessfully'));
    requestSwitchRole(); // Go back to role selection
  };

  const handleSwitchRole = () => {
    logout();
    toast(t('profile.switchingRole'), { icon: '🔄' });
    requestSwitchRole();
  };

  const menuItems = [
    { icon: FileText, label: t('profile.my_complaints'), screen: 'complaints' },
    { icon: Settings, label: t('profile.settings'), screen: 'settings' },
    { icon: HelpCircle, label: t('profile.help_support'), screen: 'help' },
    { icon: Info, label: t('profile.about_app'), screen: null },
  ];

  const handleMenuClick = (screen) => {
    if (screen) {
      setScreen(screen);
      setActiveTab(screen);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex-1 flex flex-col">
        <TealHeader title={t('profile.title')} />
        <div className="flex-1 flex flex-col items-center justify-center p-8 pb-20">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-5xl mb-4">
            👤
          </div>
          <h3 className="font-bold text-lg text-gray-700">{t('profile.welcome_vyavastha')}</h3>
          <p className="text-gray-500 text-sm text-center mt-2 mb-6">
            {t('profile.login_to_track')}
          </p>
          <button
            onClick={() => setShowAuthModal(true, 'login')}
            className="px-8 py-3 bg-teal text-white rounded-full font-semibold hover:bg-teal-600 transition-colors"
          >
            {t('profile.login_register')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <TealHeader title={t('profile.title')} />

      <div className="flex-1 p-5 flex flex-col gap-4 pb-20 overflow-y-auto">
        {/* Avatar Card */}
        <div className="flex items-center gap-4 bg-white rounded-xl p-5 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-teal flex items-center justify-center text-3xl text-white">
            {user?.name?.charAt(0).toUpperCase() || '👤'}
          </div>
          <div>
            <div className="font-extrabold text-[17px] text-gray-800">
              {user?.name || t('profile.activeCitizen')}
            </div>
            <div className="text-gray-500 text-sm">
              {user?.email || t('profile.citizen')}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-3">
          {[
            { value: user?.complaintsPosted || 0, label: t('profile.complaints_posted') },
            { value: user?.complaintsResolved || 0, label: t('profile.resolved') },
            { value: `⭐ ${user?.points || 0}`, label: t('profile.points') },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex-1 bg-white rounded-xl p-4 text-center shadow-sm"
            >
              <div className="font-extrabold text-xl text-teal">{stat.value}</div>
              <div className="text-[11px] text-gray-500 whitespace-pre-line leading-tight mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Menu Items */}
        {menuItems.map(({ icon: Icon, label, screen }, i) => (
          <div
            key={i}
            onClick={() => handleMenuClick(screen)}
            className="bg-white rounded-xl px-4 py-3.5 flex items-center justify-between shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Icon size={20} className="text-gray-500" />
              <span className="font-semibold text-gray-800">{label}</span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </div>
        ))}

        {/* Switch Role */}
        <div
          onClick={handleSwitchRole}
          className="bg-white rounded-xl px-4 py-3.5 flex items-center justify-between shadow-sm cursor-pointer hover:bg-blue-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Users size={20} className="text-blue-500" />
            <span className="font-semibold text-blue-600">{t('profile.switch_role')}</span>
          </div>
          <ChevronRight size={18} className="text-blue-400" />
        </div>

        {/* Logout */}
        <div
          onClick={handleLogout}
          className="bg-white rounded-xl px-4 py-3.5 flex items-center justify-between shadow-sm cursor-pointer hover:bg-red-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <LogOut size={20} className="text-red-400" />
            <span className="font-semibold text-red-400">{t('profile.logout')}</span>
          </div>
          <ChevronRight size={18} className="text-red-300" />
        </div>
      </div>
    </div>
  );
}
