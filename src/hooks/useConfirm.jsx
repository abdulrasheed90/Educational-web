import { useState, useCallback } from 'react';
import ConfirmDialog from '../components/common/ConfirmDialog';

/**
 * Hook for using confirmation dialogs
 * Replaces window.confirm with proper UI
 */
export function useConfirm() {
  const [confirmState, setConfirmState] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
    onCancel: null,
    variant: 'danger',
    confirmText: 'Confirm',
    cancelText: 'Cancel'
  });

  const confirm = useCallback((options) => {
    return new Promise((resolve, reject) => {
      setConfirmState({
        isOpen: true,
        title: options.title || 'Confirm Action',
        message: options.message || 'Are you sure you want to proceed?',
        confirmText: options.confirmText || 'Confirm',
        cancelText: options.cancelText || 'Cancel',
        variant: options.variant || 'danger',
        onConfirm: () => {
          setConfirmState(prev => ({ ...prev, isOpen: false }));
          resolve(true);
        },
        onCancel: () => {
          setConfirmState(prev => ({ ...prev, isOpen: false }));
          reject(false);
        }
      });
    });
  }, []);

  const close = useCallback(() => {
    setConfirmState(prev => {
      if (prev.onCancel) {
        prev.onCancel();
      }
      return { ...prev, isOpen: false };
    });
  }, []);

  const handleConfirm = useCallback(() => {
    if (confirmState.onConfirm) {
      confirmState.onConfirm();
    }
    setConfirmState(prev => ({ ...prev, isOpen: false }));
  }, [confirmState.onConfirm]);

  const ConfirmComponent = () => (
    <ConfirmDialog
      isOpen={confirmState.isOpen}
      onClose={close}
      onConfirm={handleConfirm}
      title={confirmState.title}
      message={confirmState.message}
      confirmText={confirmState.confirmText}
      cancelText={confirmState.cancelText}
      variant={confirmState.variant}
    />
  );

  return { confirm, ConfirmComponent };
}
