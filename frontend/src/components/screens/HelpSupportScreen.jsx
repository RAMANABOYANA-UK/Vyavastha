import { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle, Phone, Mail, FileText, AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import TealHeader from '../TealHeader';
import toast from 'react-hot-toast';

export default function HelpSupportScreen({ onBack }) {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTab, setActiveTab] = useState('faq');

  const faqs = [
    { q: t('help.faq_question_1'), a: t('help.faq_answer_1') },
    { q: t('help.faq_question_2'), a: t('help.faq_answer_2') },
    { q: t('help.faq_question_3'), a: t('help.faq_answer_3') },
    { q: t('help.faq_question_4'), a: t('help.faq_answer_4') },
    { q: t('help.faq_question_5'), a: t('help.faq_answer_5') },
    { q: t('help.faq_question_6'), a: t('help.faq_answer_6') },
    { q: t('help.faq_question_7'), a: t('help.faq_answer_7') },
    { q: t('help.faq_question_8'), a: t('help.faq_answer_8') },
  ];

  const contactCards = [
    { icon: Phone, label: t('help.helpline'), value: t('help.helplineNumber'), color: 'bg-green-50 border-green-200', iconColor: 'text-green-600', action: () => window.open('tel:18001031234') },
    { icon: Mail, label: t('help.help_email'), value: t('help.helpEmail'), color: 'bg-blue-50 border-blue-200', iconColor: 'text-blue-600', action: () => window.open('mailto:support@vyavastha.gov.in') },
    { icon: MessageCircle, label: t('help.liveChat'), value: t('help.liveChatHours'), color: 'bg-purple-50 border-purple-200', iconColor: 'text-purple-600', action: () => toast(t('help.liveChatOpening'), { icon: '💬' }) },
  ];

  const statusGuide = [
    { status: t('help.status_pending'), color: 'bg-yellow-100 text-yellow-700', desc: t('help.status_pending_desc') },
    { status: t('help.status_acknowledged'), color: 'bg-blue-100 text-blue-700', desc: t('help.status_acknowledged_desc') },
    { status: t('help.status_in_progress'), color: 'bg-orange-100 text-orange-700', desc: t('help.status_in_progress_desc') },
    { status: t('help.status_under_inspection'), color: 'bg-purple-100 text-purple-700', desc: t('help.status_under_inspection_desc') },
    { status: t('help.status_work_scheduled'), color: 'bg-indigo-100 text-indigo-700', desc: t('help.status_work_scheduled_desc') },
    { status: t('help.status_resolved'), color: 'bg-green-100 text-green-700', desc: t('help.status_resolved_desc') },
    { status: t('help.status_rejected'), color: 'bg-red-100 text-red-700', desc: t('help.status_rejected_desc') },
  ];

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <TealHeader title={t('help.title')} onBack={onBack} />

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

      {/* Content Area with Fragment Wrapper */}
      <div className="flex-1 overflow-y-auto p-4 pb-24">
        <>
          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <div className="flex flex-col gap-2">
              <p className="text-xs text-gray-400 mb-2">{t('help.tapToExpand')}</p>
              {faqs.map((item, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-4 py-3.5 text-left"
                  >
                    <span className="font-semibold text-gray-800 text-sm pr-4 leading-snug">{item.q}</span>
                    {openFaq === i ? (
                      <ChevronUp size={18} className="text-teal flex-shrink-0" />
                    ) : (
                      <ChevronDown size={18} className="text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Status Guide Tab */}
          {activeTab === 'status' && (
            <div className="flex flex-col gap-3">
              <p className="text-xs text-gray-400 mb-1">{t('help.understandingComplaintStatus')}</p>
              {statusGuide.map(({ status, color, desc }) => (
                <div key={status} className="bg-white rounded-xl shadow-sm p-4 flex items-start gap-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex-shrink-0 ${color}`}>{status}</span>
                  <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
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
              <p className="text-xs text-gray-400">{t('help.chooseHowToReachUs')}</p>
              {contactCards.map(({ icon: Icon, label, value, color, iconColor, action }) => (
                <button
                  key={label}
                  onClick={action}
                  className={`flex items-center gap-4 p-4 rounded-xl border ${color} text-left active:scale-[0.98] transition-transform`}
                >
                  <div className={`w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm`}>
                    <Icon size={22} className={iconColor} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 text-sm">{label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{value}</div>
                  </div>
                  <ChevronDown size={16} className="text-gray-400 ml-auto -rotate-90" />
                </button>
              ))}

              {/* Report Issue */}
              <div className="bg-white rounded-xl shadow-sm p-4 mt-2">
                <div className="flex items-center gap-2 mb-3">
                  <FileText size={18} className="text-teal" />
                  <span className="font-bold text-gray-800 text-sm">{t('help.reportAppIssue')}</span>
                </div>
                <textarea
                  placeholder={t('help.describeTheIssue')}
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:border-teal"
                />
                <button
                  onClick={() => toast.success(t('help.reportSubmittedSuccess'), { duration: 4000 })}
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
        </>
      </div>
    </div>
  );
}
