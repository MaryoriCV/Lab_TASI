import React from 'react';
import { ChevronLeft, Zap, ChevronDown, Lock, Info } from 'lucide-react';
import { Header } from '../components/Navigation';
import { MOCK_ACCOUNTS, MOCK_USER } from '../constants';
import { AppScreen, Receipt } from '../types';

interface ConfirmPaymentScreenProps {
  receipts: Receipt[];
  onNavigate: (screen: AppScreen, data?: any) => void;
}

export const ConfirmPaymentScreen: React.FC<ConfirmPaymentScreenProps> = ({ receipts, onNavigate }) => {
  const subtotal = receipts.reduce((sum, r) => sum + r.amount, 0);
  const commission = 1.50;
  const total = subtotal + commission;
  const account = MOCK_ACCOUNTS[0];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header title="Confirmar Pago" onBack={() => onNavigate('DEBT_RESULT')} variant="centered" showActions={false} />

      <main className="px-6 py-4 flex-1 space-y-6">
        <section>
          <h3 className="text-lg font-bold text-slate-900 mb-4">Detalles del Servicio</h3>
          <div className="bg-slate-50 rounded-3xl p-5 flex items-center gap-4 relative">
            <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-neo-purple shrink-0">
              <Zap size={28} />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] font-bold text-neo-purple uppercase tracking-widest">LUZ</span>
              <h4 className="text-lg font-bold text-slate-900 truncate">Luz del Sur</h4>
              <p className="text-xs text-slate-400 font-medium truncate">Cliente: {MOCK_USER.name} Cubas</p>
              <p className="text-xs text-slate-400 font-medium truncate">Ref: 1294 8576 001</p>
            </div>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-purple-100 rounded-2xl flex items-center justify-center text-neo-purple opacity-30 shrink-0">
               <Zap size={20} />
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-bold text-slate-900 mb-4">Resumen de Recibos</h3>
          <div className="space-y-3">
            {receipts.map((receipt) => (
              <div key={receipt.id} className="bg-white border border-slate-100 rounded-3xl p-5 neo-shadow-card">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Recibo {receipt.number}</h4>
                    <p className="text-[10px] text-slate-400 font-medium">Vencimiento: {receipt.dueDate}</p>
                  </div>
                  <span className="text-base font-bold text-slate-900">S/{receipt.amount.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">CUENTA DE ORIGEN</h3>
          <div className="bg-purple-50 border border-purple-100 rounded-3xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-neo-purple rounded-2xl flex items-center justify-center text-white shrink-0">
              <div className="w-5 h-5 border-2 border-white rounded-md flex items-center justify-center">
                 <div className="w-2.5 h-1.5 bg-white rounded-sm"></div>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-slate-900 text-sm truncate">Cuenta de Ahorros **** 3321</h4>
              <p className="text-[10px] text-slate-400 font-medium">Disponible: S/ 240.00</p>
            </div>
            <ChevronDown className="text-neo-purple shrink-0" size={20} />
          </div>
        </section>

        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-medium">Fecha de pago</span>
            <span className="text-slate-900 font-bold">Hoy, 24 de Febrero, 2026</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center gap-1">
              <span className="text-slate-400 font-medium">Comisión de servicio</span>
              <Info size={12} className="text-slate-300" />
            </div>
            <span className="text-slate-900 font-bold">S/1.50</span>
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden">
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <p className="text-white/60 text-[9px] font-bold uppercase tracking-widest mb-1">TOTAL A PAGAR</p>
              <h2 className="text-4xl font-bold">S/ {total.toFixed(2)}</h2>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl px-2 py-1.5 flex items-center gap-1.5 border border-white/20">
              <Lock size={12} />
              <span className="text-[9px] font-bold uppercase tracking-wider">PAGO SEGURO</span>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-purple-500/20 to-transparent"></div>
        </div>
      </main>

      <div className="p-6 space-y-3 shrink-0">
        <button 
          onClick={() => onNavigate('PROCESSING', { nextScreen: 'SUCCESS', title: 'Procesando operación', subtitle: 'Por favor espera unos segundos mientras validamos tu información' })}
          className="w-full py-4 bg-neo-purple text-white font-bold rounded-2xl neo-shadow-button active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          <Lock size={18} />
          Confirmar pago
        </button>
        <p className="text-[10px] text-slate-400 text-center font-medium">
          Transacción protegida por cifrado de 256 bits
        </p>
      </div>
    </div>
  );
};
