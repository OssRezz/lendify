import { useEffect, useRef } from "react";

export const Modal = ({ show, onClose, children }) => {
  const modalRef = useRef();

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose?.();
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    if (show) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4"
    >
      <div
        ref={modalRef}
        className="bg-white w-full max-w-xl p-6 rounded-lg shadow-lg animate-fade-in"
      >
        {children}
      </div>
    </div>
  );
};
