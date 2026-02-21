import React from 'react';
import { Check, X, Share2 } from 'lucide-react';
import { AppScreen } from '../types';

interface SuccessScreenProps {
  onNavigate: (screen: AppScreen) => void;
  amount?: number;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ onNavigate, amount = 46.50 }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col px-8 py-8 overflow-y-auto no-scrollbar">
      <header className="flex justify-between items-center mb-8 shrink-0">
        <div className="w-10"></div>
        <h1 className="text-lg font-bold text-neo-orange">Comprobante</h1>
        <button onClick={() => onNavigate('HOME')} className="text-neo-orange">
          <X size={24} />
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center shrink-0">
        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white mb-6 shadow-xl shadow-green-100">
          <Check size={48} strokeWidth={3} />
        </div>

        <h2 className="text-3xl font-bold text-neo-purple text-center mb-3">
          ¡Pago realizado con éxito!
        </h2>
        
        <p className="text-lg text-slate-500 text-center mb-8">
          Has pagado <span className="font-bold text-slate-800">S/ {amount.toFixed(2)}</span> a Luz del Sur
        </p>

        <div className="w-full bg-slate-50 rounded-3xl p-6 space-y-4 mb-8">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-xs font-medium">Número de Operación</span>
            <span className="text-slate-800 text-sm font-bold">12345678</span>
          </div>
          <div className="h-px bg-slate-200 w-full"></div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-xs font-medium">Fecha</span>
            <span className="text-slate-800 text-sm font-bold">Feb 24, 2026</span>
          </div>
          <div className="h-px bg-slate-200 w-full"></div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-xs font-medium">Hora</span>
            <span className="text-slate-800 text-sm font-bold">14:35:12</span>
          </div>
        </div>
      </main>

      <div className="space-y-3 shrink-0 pb-4">
        <button 
          onClick={() => onNavigate('HOME')}
          className="w-full py-4 bg-neo-purple text-white font-bold rounded-2xl neo-shadow-button active:scale-95 transition-transform"
        >
          Volver a inicio
        </button>
        <button className="w-full py-4 bg-slate-50 text-neo-purple font-bold rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-transform">
          <Share2 size={18} />
          Compartir constancia
        </button>
        
        <div className="pt-4 text-center">
          <p className="text-[10px] text-slate-400 font-medium">
            ¿Necesitas ayuda? <button className="text-neo-purple font-bold">Contactar soporte</button>
          </p>
        </div>
      </div>
    </div>
  );
};
