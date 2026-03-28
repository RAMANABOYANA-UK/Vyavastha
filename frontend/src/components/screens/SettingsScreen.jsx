import { useState } from 'react';
import { Bell, Moon, Lock, Trash2, ChevronRight, ShieldCheck, Smartphone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import TealHeader from '../TealHeader';
import toast from 'react-hot-toast';
import api from '../../services/api';

export default function SettingsScreen({ onBack }) {
  const { t } = useTranslation();
  const [notifComplaints, setNotifComplaints] = useState(true);
  const [notifUpdates, setNotifUpdates] = useState(true);
  const [notifCommunity, setNotifCommunity] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showChangePwd, setShowChangePwd] = useState(false);
  const [pwdForm, setPwdForm] = useState({ current: '', newPwd: '', confirm: '' });
  const [pwdLoading, setPwdLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!pwdForm.current || !pwdForm.newPwd) {
      toast.error(t('settings.fillAllFields'));
      return;
    }
    if (pwdForm.newPwd.length < 6) {
      toast.error(t('settings.passwordMinLength'));
      return;
    }
    if (pwdForm.newPwd !== pwdForm.confirm) {
      toast.error(t('settings.passwordsMustMatch'));
      return;
    }
    setPwdLoading(true);
    try {
      await api.put('/auth/password', { currentPassword: pwdForm.current, newPassword: pwdForm.newPwd });
      toast.success(t('settings.passwordChangedSuccessfully'));
      setShowChangePwd(false);
      setPwdForm({ current: '', newPwd: '', confirm: '' });
    } catch (err) {
      toast.error(err?.error || t('settings.failedToChangePassword'));
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
      <TealHeader title={t('settings.title')} onBack={onBack} />

      <div className="flex-1 overflow-y-auto p-4 pb-24">

        {/* Notifications */}
        <Section title={t('settings.notifications')}>
          <Row
            icon={Bell}
            iconColor="text-teal"
            label={t('settings.complaintUpdates')}
            right={<Toggle value={notifComplaints} onChange={setNotifComplaints} />}
          />
          <Row
            icon={Bell}
            iconColor="text-blue-500"
            label={t('settings.statusUpdates')}
            right={<Toggle value={notifUpdates} onChange={setNotifUpdates} />}
          />
          <Row
            icon={Bell}
            iconColor="text-purple-500"
            label={t('settings.communityActivity')}
            right={<Toggle value={notifCommunity} onChange={setNotifCommunity} />}
          />
        </Section>

        {/* Appearance */}
        <Section title={t('settings.appearance')}>
          <Row
            icon={Moon}
            iconColor="text-indigo-500"
            label={t('settings.darkMode')}
            right={
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">{t('settings.comingSoon')}</span>
                <Toggle value={darkMode} onChange={() => toast(t('settings.darkMode') + ' ' + t('settings.comingSoon') + '!', { icon: '🌙' })} />
              </div>
            }
          />
        </Section>

        {/* Security */}
        <Section title={t('settings.security')}>
          <Row
            icon={Lock}
            iconColor="text-orange-500"
            label={t('settings.changePassword')}
            right={<ChevronRight size={16} className="text-gray-400" />}
            onClick={() => setShowChangePwd(v => !v)}
          />
          <Row
            icon={ShieldCheck}
            iconColor="text-green-500"
            label={t('settings.twoFactorAuth')}
            right={<span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{t('settings.comingSoon')}</span>}
          />
          <Row
            icon={Smartphone}
            iconColor="text-blue-500"
            label={t('settings.activeSessions')}
            right={<ChevronRight size={16} className="text-gray-400" />}
            onClick={() => toast(t('settings.activeSessionMessage'), { icon: '📱' })}
          />
        </Section>

        {/* Change Password Form */}
        {showChangePwd && (
          <div className="bg-white rounded-xl shadow-sm p-4 mb-4 border border-teal/30">
            <p className="text-sm font-bold text-gray-700 mb-3">{t('settings.changePasswordForm')}</p>
            {[
              { key: 'current', placeholder: t('settings.currentPassword') },
              { key: 'newPwd', placeholder: t('settings.newPassword') },
              { key: 'confirm', placeholder: t('settings.confirmPassword') },
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
                {t('common.cancel')}
              </button>
              <button
                onClick={handleChangePassword}
                disabled={pwdLoading}
                className="flex-1 py-2 rounded-lg bg-teal text-white text-sm font-semibold disabled:opacity-60"
              >
                {pwdLoading ? 'Saving...' : t('common.save')}
              </button>
            </div>
          </div>
        )}

        {/* Danger Zone */}
        <Section title={t('settings.account')}>
          <Row
            icon={Trash2}
            iconColor="text-red-400"
            label={t('common.delete')}
            right={<ChevronRight size={16} className="text-gray-400" />}
            onClick={() => toast.error(t('common.error'))}
          />
        </Section>

        {/* App Version */}
        <div className="text-center text-xs text-gray-400 mt-4">
          VYAVASTHA App v1.0.0 · Build 2026.03
        </div>
      </div>
    </div>
  );
}
