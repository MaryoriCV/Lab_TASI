import React, { useState } from 'react';
import { User, Info, Check } from 'lucide-react';
import { Header } from '../components/Navigation';
import { MOCK_RECEIPTS, MOCK_USER, MOCK_ACCOUNTS} from '../constants';
import { AppScreen, Receipt, Service } from '../types';
import { AttentionModal } from '../components/Feedback';

interface DebtResultScreenProps {
  service: Service;
  onNavigate: (screen: AppScreen, data?: any) => void;
}

export const DebtResultScreen: React.FC<DebtResultScreenProps> = ({ service, onNavigate }) => {
  const [selectedReceipts, setSelectedReceipts] = useState<string[]>(['r1']);
  const [showFundsError, setShowFundsError] = useState(false);

  const toggleReceipt = (id: string) => {
    if (selectedReceipts.includes(id)) {
      setSelectedReceipts(selectedReceipts.filter(rid => rid !== id));
    } else {
      setSelectedReceipts([...selectedReceipts, id]);
    }
  };

  const totalAmount = MOCK_RECEIPTS
    .filter(r => selectedReceipts.includes(r.id))
    .reduce((sum, r) => sum + r.amount, 0);

  const handlePay = () => {
    // Simulate insufficient funds if total is too high (just for demo)
    if (totalAmount > MOCK_ACCOUNTS[0].balance) {
      setShowFundsError(true);
    } else {
      onNavigate('CONFIRM_PAYMENT', { receipts: MOCK_RECEIPTS.filter(r => selectedReceipts.includes(r.id)) });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header title="Resultado de deuda" onBack={() => onNavigate('SERVICE_INPUT', { service })} variant="centered" showActions={false} />

      <main className="px-6 py-4 flex-1">
        <div className="bg-white rounded-3xl overflow-hidden neo-shadow-card mb-6">
          <div className="bg-purple-100 p-4 flex flex-col items-center">
            <div className="bg-white/50 rounded-full px-3 py-0.5 mb-2">
              <span className="text-[9px] font-bold text-neo-purple uppercase tracking-widest">Cliente</span>
            </div>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-neo-purple mb-2">
              <User size={24} />
            </div>
          </div>
          <div className="p-4 text-center">
            <h4 className="text-lg font-bold text-slate-900">{MOCK_USER.name} Cubas</h4>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-slate-900">Recibos Pendientes (3)</h3>
          <button 
            onClick={() => setSelectedReceipts(MOCK_RECEIPTS.map(r => r.id))}
            className="text-neo-purple text-xs font-bold"
          >
            Seleccionar Todos
          </button>
        </div>

        <div className="space-y-3 mb-6">
          {MOCK_RECEIPTS.map((receipt) => {
            const isSelected = selectedReceipts.includes(receipt.id);
            return (
              <button 
                key={receipt.id}
                onClick={() => toggleReceipt(receipt.id)}
                className={`w-full bg-white rounded-2xl p-4 flex items-center gap-3 neo-shadow-card border-2 transition-all text-left ${
                  isSelected ? 'border-neo-purple' : 'border-transparent'
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] text-slate-400 font-bold">{receipt.number}</span>
                    {receipt.status === 'VENCIDO' && (
                      <span className="bg-red-50 text-red-500 text-[9px] font-bold px-2 py-0.5 rounded-full">VENCIDO</span>
                    )}
                  </div>
                  <div className="text-lg font-bold text-slate-900">S/ {receipt.amount.toFixed(2)}</div>
                  <p className="text-[9px] text-slate-400 font-medium">Vencimiento: {receipt.dueDate}</p>
                </div>
                <div className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-colors shrink-0 ${
                  isSelected ? 'bg-neo-purple border-neo-purple text-white' : 'border-slate-200'
                }`}>
                  {isSelected && <Check size={16} strokeWidth={3} />}
                </div>
              </button>
            );
          })}
        </div>

        <div className="bg-purple-50 rounded-2xl p-4 flex gap-3 mb-6">
          <Info className="text-neo-purple shrink-0" size={20} />
          <p className="text-[10px] text-slate-500 leading-relaxed">
            Los pagos realizados después de las 6 p.m. se procesarán al siguiente día hábil. Los pagos atrasados pueden conllevar un cargo por demora en el pago final.
          </p>
        </div>
      </main>

      <div className="bg-white p-5 border-t border-slate-100 shrink-0">
        <div className="flex justify-between items-center mb-4">
          <span className="text-slate-500 text-sm font-medium">Total seleccionado({selectedReceipts.length})</span>
          <span className="text-xl font-bold text-slate-900">S/ {totalAmount.toFixed(2)}</span>
        </div>
        <button 
          onClick={handlePay}
          disabled={selectedReceipts.length === 0}
          className="w-full py-4 bg-neo-purple text-white font-bold rounded-2xl neo-shadow-button active:scale-95 transition-transform disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2"
        >
          <div className="w-5 h-5 border-2 border-white rounded-md flex items-center justify-center">
            <div className="w-2.5 h-1.5 bg-white rounded-sm"></div>
          </div>
          Pagar servicios
        </button>
      </div>

      <AttentionModal 
        isOpen={showFundsError}
        onClose={() => setShowFundsError(false)}
        title="Atención"
        message="No tienes fondos suficientes en esta cuenta para completar la operación."
        buttonText="Entendido"
        availableBalance={`S/ ${MOCK_ACCOUNTS[0].balance.toString()}`}
      />
    </div>
  );
};
