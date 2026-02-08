import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, X } from 'lucide-react';

/**
 * Production-ready confirmation dialog
 * Replaces window.confirm with a proper UI component
 */
export default function ConfirmDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger' // 'danger' | 'warning' | 'info'
}) {
  if (!isOpen) return null;

  const variantStyles = {
    danger: {
      button: 'bg-red-600 hover:bg-red-700',
      icon: 'text-red-500',
      bg: 'bg-red-500/10'
    },
    warning: {
      button: 'bg-yellow-600 hover:bg-yellow-700',
      icon: 'text-yellow-500',
      bg: 'bg-yellow-500/10'
    },
    info: {
      button: 'bg-blue-600 hover:bg-blue-700',
      icon: 'text-blue-500',
      bg: 'bg-blue-500/10'
    }
  };

  const styles = variantStyles[variant];

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Dialog */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#111113] border border-[#1F1F23] rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-start gap-4">
                <div className={`${styles.bg} p-3 rounded-full`}>
                  <AlertTriangle className={`w-6 h-6 ${styles.icon}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
                  <p className="text-[#94A3B8] mb-6">{message}</p>
                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={onClose}
                      className="px-4 py-2 text-[#94A3B8] hover:text-white hover:bg-[#1F1F23] rounded-lg transition-colors"
                    >
                      {cancelText}
                    </button>
                    <button
                      onClick={handleConfirm}
                      className={`px-4 py-2 ${styles.button} text-white rounded-lg transition-colors font-medium`}
                    >
                      {confirmText}
                    </button>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-[#94A3B8] hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
