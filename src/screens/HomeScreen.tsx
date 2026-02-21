import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  PiggyBank, 
  Wallet, 
  Banknote, 
  ChevronRight, 
  Eye, 
  EyeOff 
} from 'lucide-react';
import { Header, BottomNav } from '../components/Navigation';
import { MOCK_ACCOUNTS, MOCK_USER } from '../constants';
import { AppScreen, Account } from '../types';

interface HomeScreenProps {
  onNavigate: (screen: AppScreen, data?: any) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const [showBalances, setShowBalances] = useState(true);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'piggy-bank': return <PiggyBank size={32} className="text-purple-600" />;
      case 'wallet': return <Wallet size={32} className="text-blue-600" />;
      case 'banknote': return <Banknote size={32} className="text-green-600" />;
      default: return <PiggyBank size={32} />;
    }
  };

  return (
    <div className="h-full bg-neo-bg overflow-hidden">
      <Header />
      
      <main className="px-6 py-2">
        <div className="mb-4">
          <p className="text-neo-purple text-sm font-medium">Buenos días</p>
          <h2 className="text-xl font-bold text-neo-purple">Bienvenida, {MOCK_USER.name}</h2>
        </div>

        <div className="bg-white rounded-3xl p-5 neo-shadow-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-neo-orange">Productos</h3>
            <button 
              onClick={() => setShowBalances(!showBalances)}
              className="text-neo-orange p-1"
            >
              {showBalances ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="space-y-3">
            {MOCK_ACCOUNTS.map((account) => (
              <button 
                key={account.id}
                onClick={() => onNavigate('ACCOUNT_DETAIL', account)}
                className="w-full flex items-center gap-3 p-1 active:bg-slate-50 rounded-2xl transition-colors text-left"
              >
                <div className={`w-14 h-14 ${account.color} rounded-2xl flex items-center justify-center shrink-0`}>
                  {getIcon(account.icon)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 text-sm truncate">{account.type}</h4>
                  <p className="text-[10px] text-slate-400 font-medium">{account.number}</p>
                  <div className="mt-0.5 flex items-baseline gap-1">
                    <span className="text-neo-orange font-bold text-sm">{account.currency}</span>
                    <span className="text-neo-orange font-bold text-xl">
                      {showBalances ? account.balance.toFixed(2) : '••••••••'}
                    </span>
                  </div>
                </div>
                <ChevronRight className="text-neo-orange shrink-0" size={20} />
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
