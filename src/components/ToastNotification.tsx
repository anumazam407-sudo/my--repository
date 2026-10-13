import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, Sparkles } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { toastMessage } = useShop();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce duration-300">
      <div className="bg-[#1E1B18] text-[#FAF8F5] px-4 py-3 rounded-xl shadow-2xl border border-amber-400/40 flex items-center gap-2.5 text-xs font-medium">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
