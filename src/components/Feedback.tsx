import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  buttonText: string;
  availableBalance?: string;
}

export const AttentionModal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  message, 
  buttonText,
  availableBalance 
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl p-8 w-full max-w-sm text-center neo-shadow-card"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center">
                <AlertTriangle className="text-orange-500 w-8 h-8" />
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-4">{title}</h3>
            <p className="text-slate-500 mb-6 leading-relaxed">
              {message}
            </p>

            {availableBalance && (
              <div className="bg-slate-50 rounded-full py-2 px-4 inline-flex items-center gap-2 mb-8">
                <span className="text-xs text-slate-400 font-semibold">Disponible:</span>
                <span className="text-sm font-bold">{availableBalance}</span>
              </div>
            )}

            <button 
              onClick={onClose}
              className="w-full py-4 bg-neo-purple text-white font-bold rounded-2xl neo-shadow-button active:scale-95 transition-transform"
            >
              {buttonText}
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const LoadingOverlay: React.FC<{ title: string; subtitle: string; progress?: number }> = ({ title, subtitle, progress }) => {
  return (
    <div className="absolute inset-0 z-50 bg-white flex flex-col items-center justify-center p-8">
      <div className="relative w-24 h-24 mb-12">
        <div className="absolute inset-0 border-4 border-orange-100 rounded-full"></div>
        <motion.div 
          className="absolute inset-0 border-4 border-neo-orange rounded-full border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
            <div className="w-6 h-6 bg-neo-orange rounded-sm flex items-center justify-center">
              <div className="w-3 h-1 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mb-2">{title}</h2>
      <p className="text-slate-500 mb-12">{subtitle}</p>

      {progress !== undefined && (
        <div className="w-full max-w-xs">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-bold text-neo-orange tracking-wider">Procesando</span>
            <span className="text-[10px] font-bold text-slate-400">{progress}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-neo-orange"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col items-center gap-2 mt-12">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-neo-orange rounded-lg flex items-center justify-center">
             <span className="text-white text-[10px] font-bold">N</span>
          </div>
          <span className="font-bold text-slate-800">NeoBank</span>
        </div>
        <p className="text-[10px] text-slate-400 tracking-widest">Banca Digital Segura</p>
      </div>
    </div>
  );
};
