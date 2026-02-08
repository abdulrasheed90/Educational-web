import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

/**
 * Production-ready alert component
 * Replaces window.alert with a proper UI component
 */
export default function Alert({ 
  isOpen, 
  onClose, 
  type = 'info', // 'success' | 'error' | 'warning' | 'info'
  title,
  message,
  duration = 5000
}) {
  if (!isOpen) return null;

  // Auto-close after duration
  if (duration > 0 && onClose) {
    setTimeout(() => {
      onClose();
    }, duration);
  }

  const typeStyles = {
    success: {
      icon: CheckCircle,
      iconColor: 'text-green-500',
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
      titleColor: 'text-green-400'
    },
    error: {
      icon: AlertCircle,
      iconColor: 'text-red-500',
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      titleColor: 'text-red-400'
    },
    warning: {
      icon: AlertCircle,
      iconColor: 'text-yellow-500',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      titleColor: 'text-yellow-400'
    },
    info: {
      icon: Info,
      iconColor: 'text-blue-500',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      titleColor: 'text-blue-400'
    }
  };

  const styles = typeStyles[type];
  const Icon = styles.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className={`fixed top-4 right-4 z-50 ${styles.bg} ${styles.border} border rounded-xl p-4 max-w-md shadow-2xl`}
        >
          <div className="flex items-start gap-3">
            <Icon className={`w-5 h-5 ${styles.iconColor} flex-shrink-0 mt-0.5`} />
            <div className="flex-1 min-w-0">
              {title && (
                <h4 className={`font-semibold ${styles.titleColor} mb-1`}>{title}</h4>
              )}
              <p className="text-white text-sm">{message}</p>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="text-[#94A3B8] hover:text-white transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
