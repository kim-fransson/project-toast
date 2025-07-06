import React from "react";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  function createToast({ message, variant }) {
    setToasts((current) => [
      ...current,
      { id: crypto.randomUUID(), variant, message },
    ]);
  }

  function dismissToast(id) {
    setToasts((current) =>
      current.filter((toast) => toast.id !== id)
    );
  }

  const memoizedValue = React.useMemo(
    () => ({ toasts, createToast, dismissToast }),
    [toasts]
  );

  return (
    <ToastContext value={memoizedValue}>{children}</ToastContext>
  );
}

export default ToastProvider;
