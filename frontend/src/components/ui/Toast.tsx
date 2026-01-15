/**
 * Premium Toast Notification System
 * High-quality notifications with smooth animations and queue management
 */

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextValue {
  toasts: Toast[];
  showToast: (toast: Omit<Toast, 'id'>) => void;
  dismissToast: (id: string) => void;
  success: (message: string, description?: string) => void;
  error: (message: string, description?: string) => void;
  warning: (message: string, description?: string) => void;
  info: (message: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newToast: Toast = { ...toast, id };

    setToasts((prev) => [...prev, newToast]);

    // Auto dismiss
    const duration = toast.duration || 5000;
    setTimeout(() => {
      dismissToast(id);
    }, duration);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = useCallback(
    (message: string, description?: string) => {
      showToast({ type: 'success', message, description });
    },
    [showToast]
  );

  const error = useCallback(
    (message: string, description?: string) => {
      showToast({ type: 'error', message, description });
    },
    [showToast]
  );

  const warning = useCallback(
    (message: string, description?: string) => {
      showToast({ type: 'warning', message, description });
    },
    [showToast]
  );

  const info = useCallback(
    (message: string, description?: string) => {
      showToast({ type: 'info', message, description });
    },
    [showToast]
  );

  return (
    <ToastContext.Provider
      value={{ toasts, showToast, dismissToast, success, error, warning, info }}
    >
      {children}
      <ToastContainer toasts={toasts} dismissToast={dismissToast} />
    </ToastContext.Provider>
  );
};

const ToastContainer = ({
  toasts,
  dismissToast,
}: {
  toasts: Toast[];
  dismissToast: (id: string) => void;
}) => {
  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 space-y-3 max-w-md w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast, index) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            index={index}
            onDismiss={() => dismissToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

const toastStyles: Record<ToastType, { bg: string; icon: string; iconBg: string }> = {
  success: {
    bg: 'from-neon-green/20 to-green-900/20 border-neon-green',
    icon: '✓',
    iconBg: 'bg-neon-green text-black',
  },
  error: {
    bg: 'from-neon-red/20 to-red-900/20 border-neon-red',
    icon: '✕',
    iconBg: 'bg-neon-red text-white',
  },
  warning: {
    bg: 'from-neon-orange/20 to-orange-900/20 border-neon-orange',
    icon: '⚠',
    iconBg: 'bg-neon-orange text-black',
  },
  info: {
    bg: 'from-neon-blue/20 to-blue-900/20 border-neon-blue',
    icon: 'ℹ',
    iconBg: 'bg-neon-blue text-black',
  },
};

const ToastItem = ({
  toast,
  index,
  onDismiss,
}: {
  toast: Toast;
  index: number;
  onDismiss: () => void;
}) => {
  const style = toastStyles[toast.type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="pointer-events-auto"
    >
      <div
        className={`
          glass-effect backdrop-blur-xl
          bg-gradient-to-br ${style.bg}
          border-l-4 border-${style.bg.split('-')[1]}
          rounded-xl shadow-2xl
          p-4
          flex items-start gap-3
          transform hover:scale-[1.02] transition-transform
        `}
      >
        {/* Icon */}
        <div className={`${style.iconBg} w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0`}>
          {style.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-white mb-1">{toast.message}</p>
          {toast.description && (
            <p className="text-sm text-gray-300">{toast.description}</p>
          )}
          {toast.action && (
            <button
              onClick={toast.action.onClick}
              className="mt-2 text-sm font-medium text-neon-blue hover:text-neon-purple transition-colors"
            >
              {toast.action.label}
            </button>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={onDismiss}
          className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Progress Bar */}
        <motion.div
          className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${style.bg.split(' ')[0]} rounded-bl-xl`}
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: (toast.duration || 5000) / 1000, ease: 'linear' }}
        />
      </div>
    </motion.div>
  );
};
