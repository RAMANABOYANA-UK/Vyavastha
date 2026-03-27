import { useState } from 'react';
import { Bell, Moon, Globe, Lock, Trash2, ChevronRight, ShieldCheck, Smartphone, X } from 'lucide-react';
import TealHeader from '../TealHeader';
import { useAuthStore, useUIStore } from '../../store';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { useTranslation } from 'react-i18next';

export default function SettingsScreen({ onBack }) {
  const { user, setUserLanguage } = useAuthStore();
  const { setScreen } = useUIStore();
  const { i18n } = useTranslation();

  const [notifComplaints, setNotifComplaints] = useState(true);
  const [notifUpdates, setNotifUpdates] = useState(true);
  const [notifCommunity, setNotifCommunity] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showChangePwd, setShowChangePwd] = useState(false);
  const [pwdForm, setPwdForm] = useState({ current: '', newPwd: '', confirm: '' });
  const [pwdLoading, setPwdLoading] = useState(false);
  const [searchLang, setSearchLang] = useState('');

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇮🇳' },
    { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
    { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'th', name: 'ไทย', flag: '🇹🇭' },
    { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'fil', name: 'Tagalog', flag: '🇵🇭' },
    { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' },
    { code: 'cs', name: 'Čeština', flag: '🇨🇿' },
    { code: 'he', name: 'עברית', flag: '🇮🇱' },
    { code: 'uk', name: 'Українська', flag: '🇺🇦' },
  ];

  const currentLanguage = languages.find(l => l.code === i18n.language) || languages[0];
  const filteredLanguages = languages.filter(lang =>
    lang.name.toLowerCase().includes(searchLang.toLowerCase()) ||
    lang.code.toLowerCase().includes(searchLang.toLowerCase())
  );

  const handleLanguageChange = async (langCode) => {
    i18n.changeLanguage(langCode);
    await setUserLanguage(langCode);
    setShowLanguageModal(false);
    setSearchLang('');
    toast.success(`Language changed to ${languages.find(l => l.code === langCode)?.name}`);
  };

  const handleChangePassword = async () => {
    if (!pwdForm.current || !pwdForm.newPwd) {
      toast.error('Please fill all password fields');
      return;
    }
    if (pwdForm.newPwd.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }
    if (pwdForm.newPwd !== pwdForm.confirm) {
      toast.error('Passwords do not match');
      return;
    }
    setPwdLoading(true);
    try {
      await api.put('/auth/password', { currentPassword: pwdForm.current, newPassword: pwdForm.newPwd });
      toast.success('Password changed successfully!');
      setShowChangePwd(false);
      setPwdForm({ current: '', newPwd: '', confirm: '' });
    } catch (err) {
      toast.error(err?.error || 'Failed to change password');
    } finally {
      setPwdLoading(false);
    }
  };

  const Toggle = ({ value, onChange }) => (
    <button
      onClick={() => onChange(!value)}
      className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 ${value ? 'bg-teal' : 'bg-gray-300'}`}
    >
      <span className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${value ? 'translate-x-6' : 'translate-x-0'}`} />
    </button>
  );

  const Section = ({ title, children }) => (
    <div className="mb-4">
      <div className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1 mb-2">{title}</div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {children}
      </div>
    </div>
  );

  const Row = ({ icon: Icon, iconColor = 'text-gray-500', label, right, onClick, border = true }) => (
    <div
      onClick={onClick}
      className={`flex items-center justify-between px-4 py-3.5 ${onClick ? 'cursor-pointer hover:bg-gray-50 active:bg-gray-100' : ''} ${border ? 'border-b border-gray-100 last:border-0' : ''}`}
    >
      <div className="flex items-center gap-3">
        <Icon size={19} className={iconColor} />
        <span className="text-sm font-semibold text-gray-700">{label}</span>
      </div>
      {right}
    </div>
  );

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <TealHeader title="Settings" onBack={onBack} />

      <div className="flex-1 overflow-y-auto p-4 pb-24">

        {/* Notifications */}
        <Section title="Notifications">
          <Row
            icon={Bell}
            iconColor="text-teal"
            label="Complaint Updates"
            right={<Toggle value={notifComplaints} onChange={setNotifComplaints} />}
          />
          <Row
            icon={Bell}
            iconColor="text-blue-500"
            label="Status Updates"
            right={<Toggle value={notifUpdates} onChange={setNotifUpdates} />}
          />
          <Row
            icon={Bell}
            iconColor="text-purple-500"
            label="Community Activity"
            right={<Toggle value={notifCommunity} onChange={setNotifCommunity} />}
          />
        </Section>

        {/* Appearance */}
        <Section title="Appearance">
          <Row
            icon={Moon}
            iconColor="text-indigo-500"
            label="Dark Mode"
            right={
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Coming soon</span>
                <Toggle value={darkMode} onChange={() => toast('Dark mode coming soon!', { icon: '🌙' })} />
              </div>
            }
          />
          <Row
            icon={Globe}
            iconColor="text-green-500"
            label="Language"
            right={
              <div className="flex items-center gap-1 text-gray-400">
                <span className="text-2xl">{currentLanguage.flag}</span>
                <span className="text-sm text-gray-500">{currentLanguage.name}</span>
                <ChevronRight size={16} />
              </div>
            }
            onClick={() => setShowLanguageModal(true)}
          />
        </Section>

        {/* Security */}
        <Section title="Security">
          <Row
            icon={Lock}
            iconColor="text-orange-500"
            label="Change Password"
            right={<ChevronRight size={16} className="text-gray-400" />}
            onClick={() => setShowChangePwd(v => !v)}
          />
          <Row
            icon={ShieldCheck}
            iconColor="text-green-500"
            label="Two-Factor Authentication"
            right={<span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Coming soon</span>}
          />
          <Row
            icon={Smartphone}
            iconColor="text-blue-500"
            label="Active Sessions"
            right={<ChevronRight size={16} className="text-gray-400" />}
            onClick={() => toast('1 active session on this device', { icon: '📱' })}
          />
        </Section>

        {/* Change Password Form */}
        {showChangePwd && (
          <div className="bg-white rounded-xl shadow-sm p-4 mb-4 border border-teal/30">
            <p className="text-sm font-bold text-gray-700 mb-3">Change Password</p>
            {[
              { key: 'current', placeholder: 'Current password' },
              { key: 'newPwd', placeholder: 'New password (min 6 chars)' },
              { key: 'confirm', placeholder: 'Confirm new password' },
            ].map(({ key, placeholder }) => (
              <input
                key={key}
                type="password"
                placeholder={placeholder}
                value={pwdForm[key]}
                onChange={e => setPwdForm(p => ({ ...p, [key]: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-2 focus:outline-none focus:border-teal"
              />
            ))}
            <div className="flex gap-2 mt-1">
              <button
                onClick={() => setShowChangePwd(false)}
                className="flex-1 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleChangePassword}
                disabled={pwdLoading}
                className="flex-1 py-2 rounded-lg bg-teal text-white text-sm font-semibold disabled:opacity-60"
              >
                {pwdLoading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        )}

        {/* Danger Zone */}
        <Section title="Account">
          <Row
            icon={Trash2}
            iconColor="text-red-400"
            label="Delete Account"
            right={<ChevronRight size={16} className="text-gray-400" />}
            onClick={() => toast.error('Please contact support to delete your account.')}
          />
        </Section>

        {/* App Version */}
        <div className="text-center text-xs text-gray-400 mt-4">
          VYAVASTHA App v1.0.0 · Build 2026.03
        </div>
      </div>

      {/* Language Modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl max-h-96 w-80 flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-800">Select Language</h2>
              <button
                onClick={() => {
                  setShowLanguageModal(false);
                  setSearchLang('');
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            {/* Search */}
            <div className="p-3 border-b border-gray-200">
              <input
                type="text"
                placeholder="Search language..."
                value={searchLang}
                onChange={e => setSearchLang(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal"
              />
            </div>

            {/* Languages List */}
            <div className="flex-1 overflow-y-auto">
              {filteredLanguages.length === 0 ? (
                <div className="flex items-center justify-center h-32 text-gray-400">
                  No languages found
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredLanguages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 active:bg-teal/10 ${
                        i18n.language === lang.code ? 'bg-teal/10 border-l-4 border-teal' : ''
                      }`}
                    >
                      <span className="text-2xl">{lang.flag}</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{lang.name}</p>
                        <p className="text-xs text-gray-400">{lang.code.toUpperCase()}</p>
                      </div>
                      {i18n.language === lang.code && (
                        <div className="ml-auto w-2 h-2 bg-teal rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
