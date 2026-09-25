import React from 'react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#4e051a] text-white px-5 py-3.5 shadow-2xl border border-[#6b1d2f] flex items-center gap-3">
        <span className="material-symbols-outlined text-[#ffd9dd] text-[20px]">
          verified
        </span>
        <span className="text-[13px] font-medium tracking-wide">{message}</span>
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white ml-2 p-0.5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>
    </div>
  );
};
