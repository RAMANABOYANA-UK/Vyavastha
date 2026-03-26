import { motion } from 'framer-motion';
import { Heart, Share2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export function AnimatedComplaintCard({ complaint, onUpvote }) {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleUpvote = () => {
    setIsUpvoted(!isUpvoted);
    if (onUpvote) onUpvote(complaint?.id);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 1000);
  };

  const statusColors = {
    pending: 'from-amber-400 to-amber-600',
    inProgress: 'from-blue-400 to-blue-600',
    resolved: 'from-teal-400 to-teal-600',
    urgent: 'from-red-400 to-red-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100 overflow-hidden"
    >
      {/* Header with status */}
      <div className={`bg-gradient-to-r ${statusColors[complaint?.status || 'pending']} p-3`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {complaint?.status === 'resolved' && (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6 }}
              >
                <CheckCircle2 size={20} className="text-white" />
              </motion.div>
            )}
            {complaint?.status === 'urgent' && (
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <AlertCircle size={20} className="text-white" />
              </motion.div>
            )}
            <span className="text-white font-semibold text-sm capitalize">
              {complaint?.status || 'Pending'}
            </span>
          </div>
          <span className="text-white text-xs opacity-80">{complaint?.category}</span>
        </div>
      </div>

      {/* Progress bar */}
      {complaint?.progress && (
        <div className="h-1 bg-gray-200">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-amber-500"
            initial={{ width: 0 }}
            animate={{ width: `${complaint.progress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-gray-800 mb-2">{complaint?.title}</h3>
        <p className="text-gray-600 text-sm mb-3">{complaint?.description}</p>

        {/* Location badge */}
        {complaint?.location && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-block bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs mb-3"
          >
            📍 {complaint.location}
          </motion.div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3 mt-4">
          {/* Upvote button */}
          <motion.button
            onClick={handleUpvote}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-colors ${
              isUpvoted
                ? 'bg-red-100 text-red-600'
                : 'bg-gray-100 text-gray-600 hover:bg-red-50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={isUpvoted ? { scale: [1, 1.3, 1] } : {}}
            >
              <Heart size={16} fill={isUpvoted ? 'currentColor' : 'none'} />
            </motion.div>
            <span className="text-sm font-medium">
              {complaint?.upvotes || 0}
            </span>
          </motion.button>

          {/* Share button */}
          <motion.button
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-purple-50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 size={16} />
            <span className="text-sm font-medium">Share</span>
          </motion.button>

          {/* View details button */}
          <motion.button
            className="flex-1 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-amber-500 text-white font-medium hover:shadow-lg transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-sm">View</span>
          </motion.button>
        </div>

        {/* Success indicator */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="mt-2 p-2 bg-green-100 text-green-700 rounded-lg text-xs font-medium text-center"
          >
            ✓ Upvoted!
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export function CategoryCardAnimated({ icon, title, count, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.08, rotateY: 10 }}
      whileTap={{ scale: 0.95 }}
      className="relative cursor-pointer"
    >
      <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-100 text-center h-32 flex flex-col items-center justify-center"
      >
        <motion.div
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-5xl mb-2"
        >
          {icon}
        </motion.div>
        <h3 className="font-bold text-gray-800 text-sm">{title}</h3>
        <p className="text-xs text-purple-600 font-semibold mt-1">{count} reports</p>
      </div>

      {/* Animated badge */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 1 }}
        className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
      >
        +
      </motion.div>
    </motion.div>
  );
}

export function CommunityInteractionButtons({ complaint }) {
  const [reaction, setReaction] = useState(null);

  const reactions = [
    { emoji: '👍', label: 'Support', color: 'from-blue-500 to-blue-600' },
    { emoji: '❤️', label: 'Appreciate', color: 'from-red-500 to-red-600' },
    { emoji: '😢', label: 'Sympathize', color: 'from-yellow-500 to-yellow-600' },
    { emoji: '🔥', label: 'Urgent', color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {reactions.map((r) => (
        <motion.button
          key={r.label}
          onClick={() => setReaction(r.label)}
          className={`py-2 rounded-lg transition-all ${
            reaction === r.label
              ? `bg-gradient-to-r ${r.color} text-white`
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={reaction === r.label ? { scale: [1, 1.1, 1] } : {}}
        >
          <div className="text-xl">{r.emoji}</div>
          <span className="text-xs font-medium block">{r.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
