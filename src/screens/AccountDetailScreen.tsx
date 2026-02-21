import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Bell, 
  Eye, 
  EyeOff, 
  Share2, 
  ArrowLeftRight, 
  Lightbulb, 
  MoreHorizontal,
  ShoppingCart,
  User,
  Smartphone
} from 'lucide-react';
import { Header, BottomNav } from '../components/Navigation';
import { MOCK_TRANSACTIONS } from '../constants';
import { AppScreen, Account } from '../types';

interface AccountDetailScreenProps {
  account: Account;
  onNavigate: (screen: AppScreen, data?: any) => void;
}

export const AccountDetailScreen: React.FC<AccountDetailScreenProps> = ({ account, onNavigate }) => {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div className="h-full bg-neo-bg overflow-hidden">
      <Header title="Mi Cuenta" onBack={() => onNavigate('HOME')} variant="centered" showActions={false} />

      <main className="px-6 py-4">
        <div className="neo-gradient-purple rounded-3xl p-5 text-white shadow-xl mb-6 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-white/80 text-xs font-medium mb-1">{account.type}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold">{account.currency}</span>
                  <span className="text-3xl font-bold">
                    {showBalance ? account.balance.toFixed(2) : '••••••••'}
                  </span>
                </div>
                <p className="text-white/60 text-[10px] mt-1">Saldo disponible</p>
              </div>
              <button 
                onClick={() => setShowBalance(!showBalance)}
                className="bg-white/20 p-2 rounded-xl backdrop-blur-sm"
              >
                {showBalance ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="flex justify-between items-end mt-6">
              <div className="space-y-0.5">
                <p className="text-[9px] text-white/60 font-medium">19207176209012</p>
                <p className="text-[9px] text-white/60 font-medium">CCI: 00219210717620909540</p>
              </div>
              <button className="bg-white text-neo-purple p-2 rounded-xl shadow-lg">
                <Share2 size={18} />
              </button>
            </div>
          </div>
          
          {/* Decorative circles */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-white/5 rounded-full"></div>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-8">
          {[
            { icon: ArrowLeftRight, label: 'Transferir' },
            { icon: Smartphone, label: 'Plinear', subLabel: 'plin' },
            { icon: Lightbulb, label: 'Pagar Servicios', action: 'PAY_SERVICES' },
            { icon: MoreHorizontal, label: 'Más' },
          ].map((item, i) => (
            <button 
              key={i} 
              onClick={() => item.action === 'PAY_SERVICES' && onNavigate('PAY_SERVICES_LIST')}
              className="flex flex-col items-center gap-1.5"
            >
              <div className="w-12 h-12 bg-purple-800 rounded-2xl flex items-center justify-center text-white shadow-md relative">
                {item.subLabel && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <span className="text-[8px] font-bold uppercase">{item.subLabel}</span>
                  </div>
                )}
                <item.icon size={24} />
              </div>
              <span className="text-[9px] font-bold text-purple-900 text-center leading-tight">
                {item.label}
              </span>
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-bold text-slate-900">Actividad reciente</h3>
          <button className="text-neo-purple text-xs font-bold">Ver todo</button>
        </div>

        <div className="space-y-3">
          {MOCK_TRANSACTIONS.slice(0, 4).map((tx) => (
            <div key={tx.id} className="bg-white rounded-2xl p-3 flex items-center gap-3 neo-shadow-card">
              <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 shrink-0">
                {tx.icon === 'shopping-cart' ? <ShoppingCart size={20} /> : <User size={20} />}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-900 text-sm truncate">{tx.description}</h4>
                <p className="text-[10px] text-slate-400 font-medium">{tx.date}</p>
              </div>
              <div className={`font-bold text-sm shrink-0 ${tx.type === 'INCOME' ? 'text-green-500' : 'text-red-500'}`}>
                {tx.type === 'INCOME' ? '+' : '-'}{account.currency} {Math.abs(tx.amount).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
