import { type FC, type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { ToastContext } from './libs/toast-context';
import type { ToastContextValue, ToastMessage } from './libs/types';
import { Toast } from './toast';

const TOAST_DURATION_MS = 4000;

type Properties = {
  children: ReactNode;
};

const ToastProvider: FC<Properties> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const nextId = useRef(0);
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  const hideToast = useCallback((id: number) => {
    clearTimeout(timers.current.get(id));
    timers.current.delete(id);
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  useEffect(() => {
    const pending = timers.current;

    return () => {
      pending.forEach((timer) => clearTimeout(timer));
      pending.clear();
    };
  }, []);

  const showToast = useCallback<ToastContextValue['showToast']>(
    (toast) => {
      nextId.current += 1;
      const id = nextId.current;

      setToasts((current) => [...current, { ...toast, id }]);
      timers.current.set(
        id,
        setTimeout(() => hideToast(id), TOAST_DURATION_MS),
      );
    },
    [hideToast],
  );

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex flex-col items-center gap-2 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:items-end">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => hideToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext>
  );
};

export { ToastProvider };
