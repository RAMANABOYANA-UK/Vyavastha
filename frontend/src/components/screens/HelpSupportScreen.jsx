import { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle, Phone, Mail, FileText, AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import TealHeader from '../TealHeader';
import toast from 'react-hot-toast';

const faqs = [
  { qKey: 'help.faqItems.submitComplaint.q', aKey: 'help.faqItems.submitComplaint.a' },
  { qKey: 'help.faqItems.resolveTime.q', aKey: 'help.faqItems.resolveTime.a' },
  { qKey: 'help.faqItems.trackStatus.q', aKey: 'help.faqItems.trackStatus.a' },
  { qKey: 'help.faqItems.points.q', aKey: 'help.faqItems.points.a' },
  { qKey: 'help.faqItems.anonymous.q', aKey: 'help.faqItems.anonymous.a' },
  { qKey: 'help.faqItems.rejected.q', aKey: 'help.faqItems.rejected.a' },
  { qKey: 'help.faqItems.notifications.q', aKey: 'help.faqItems.notifications.a' },
  { qKey: 'help.faqItems.rateService.q', aKey: 'help.faqItems.rateService.a' },
];

const contactCards = [
  { icon: Phone, labelKey: 'help.helpline', value: '1800-103-1234', color: 'bg-green-50 border-green-200', iconColor: 'text-green-600', action: () => window.open('tel:18001031234') },
  { icon: Mail, labelKey: 'help.email', value: 'support@vyavastha.gov.in', color: 'bg-blue-50 border-blue-200', iconColor: 'text-blue-600', action: () => window.open('mailto:support@vyavastha.gov.in') },
  { icon: MessageCircle, labelKey: 'help.liveChat', valueKey: 'help.liveChatHours', color: 'bg-purple-50 border-purple-200', iconColor: 'text-purple-600', actionType: 'liveChat' },
];

const statusGuide = [
  { statusKey: 'complaints.pending', color: 'bg-yellow-100 text-yellow-700', descKey: 'help.statusDesc.pending' },
  { statusKey: 'complaints.acknowledged', color: 'bg-blue-100 text-blue-700', descKey: 'help.statusDesc.acknowledged' },
  { statusKey: 'complaints.inProgress', color: 'bg-orange-100 text-orange-700', descKey: 'help.statusDesc.inProgress' },
  { statusKey: 'complaints.underInspection', color: 'bg-purple-100 text-purple-700', descKey: 'help.statusDesc.underInspection' },
  { statusKey: 'complaints.workScheduled', color: 'bg-indigo-100 text-indigo-700', descKey: 'help.statusDesc.workScheduled' },
  { statusKey: 'complaints.resolved', color: 'bg-green-100 text-green-700', descKey: 'help.statusDesc.resolved' },
  { statusKey: 'complaints.rejected', color: 'bg-red-100 text-red-700', descKey: 'help.statusDesc.rejected' },
];

export default function HelpSupportScreen({ onBack }) {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTab, setActiveTab] = useState('faq');

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <TealHeader title={t('profile.help_support')} onBack={onBack} />

      {/* Tabs */}
      <div className="flex bg-white border-b border-gray-100 px-4">
        {[
          { id: 'faq', label: t('help.faq'), icon: HelpCircle },
          { id: 'status', label: t('help.statusGuide'), icon: CheckCircle },
          { id: 'contact', label: t('help.contactUs'), icon: MessageCircle },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-1.5 px-4 py-3 text-sm font-semibold border-b-2 mr-2 transition-colors ${
              activeTab === id ? 'border-teal text-teal' : 'border-transparent text-gray-500'
            }`}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-24">

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div className="flex flex-col gap-2">
            <p className="text-xs text-gray-400 mb-2">{t('help.tapQuestion')}</p>
            {faqs.map((item, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-4 py-3.5 text-left"
                >
                  <span className="font-semibold text-gray-800 text-sm pr-4 leading-snug">{t(item.qKey)}</span>
                  {openFaq === i ? (
                    <ChevronUp size={18} className="text-teal flex-shrink-0" />
                  ) : (
                    <ChevronDown size={18} className="text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                    {t(item.aKey)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Status Guide Tab */}
        {activeTab === 'status' && (
          <div className="flex flex-col gap-3">
            <p className="text-xs text-gray-400 mb-1">{t('help.understandingStatus')}</p>
            {statusGuide.map(({ statusKey, color, descKey }) => (
              <div key={statusKey} className="bg-white rounded-xl shadow-sm p-4 flex items-start gap-3">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex-shrink-0 ${color}`}>{t(statusKey)}</span>
                <p className="text-sm text-gray-600 leading-relaxed">{t(descKey)}</p>
              </div>
            ))}
            <div className="bg-teal-50 border border-teal/20 rounded-xl p-4 mt-2">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle size={16} className="text-teal" />
                <span className="text-sm font-bold text-teal">{t('help.tip')}</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                {t('help.tipText')}
              </p>
            </div>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <div className="flex flex-col gap-4">
            <p className="text-xs text-gray-400">{t('help.chooseReach')}</p>
            {contactCards.map(({ icon: Icon, labelKey, value, valueKey, color, iconColor, action, actionType }) => (
              <button
                key={labelKey}
                onClick={() => {
                  if (actionType === 'liveChat') {
                    toast(t('help.liveChatSoon'), { icon: '💬' });
                    return;
                  }
                  action?.();
                }}
                className={`flex items-center gap-4 p-4 rounded-xl border ${color} text-left active:scale-[0.98] transition-transform`}
              >
                <div className={`w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm`}>
                  <Icon size={22} className={iconColor} />
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-sm">{t(labelKey)}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{value || t(valueKey)}</div>
                </div>
                <ChevronDown size={16} className="text-gray-400 ml-auto -rotate-90" />
              </button>
            ))}

            {/* Report Issue */}
            <div className="bg-white rounded-xl shadow-sm p-4 mt-2">
              <div className="flex items-center gap-2 mb-3">
                <FileText size={18} className="text-teal" />
                <span className="font-bold text-gray-800 text-sm">{t('help.reportIssue')}</span>
              </div>
              <textarea
                placeholder={t('help.describeProblem')}
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:border-teal"
              />
              <button
                onClick={() => toast.success(t('help.reportSubmitted'), { duration: 4000 })}
                className="mt-3 w-full py-2.5 bg-teal text-white rounded-lg text-sm font-semibold hover:bg-teal-600 transition-colors"
              >
                {t('help.submitReport')}
              </button>
            </div>

            <div className="text-center text-xs text-gray-400 mt-2">
              {t('help.supportHours')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
