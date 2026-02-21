import React, { useState } from 'react';
import { Search, ChevronRight, Zap, Droplet, Wifi, Flame } from 'lucide-react';
import { Header } from '../components/Navigation';
import { MOCK_SERVICES } from '../constants';
import { AppScreen, Service } from '../types';

interface PayServicesScreenProps {
  onNavigate: (screen: AppScreen, data?: any) => void;
}

export const PayServicesScreen: React.FC<PayServicesScreenProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('Recientes');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'zap': return <Zap size={24} className="text-white" />;
      case 'droplet': return <Droplet size={24} className="text-white" />;
      case 'wifi': return <Wifi size={24} className="text-white" />;
      case 'flame': return <Flame size={24} className="text-white" />;
      default: return <Zap size={24} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header title="Pagar Servicios" onBack={() => onNavigate('HOME')} variant="centered" showActions={false} />

      <main className="px-6 py-2">
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neo-orange" size={18} />
          <input 
            type="text"
            placeholder="Buscar servicio"
            className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-10 pr-4 text-sm text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-neo-orange transition-all"
          />
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
          {['Recientes', 'Luz', 'Agua', 'Internet'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-1.5 rounded-full font-bold text-xs transition-colors whitespace-nowrap ${
                activeTab === tab 
                  ? 'bg-neo-orange text-white' 
                  : 'bg-white border border-slate-200 text-slate-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-4">Recientes</h3>

        <div className="space-y-3">
          {MOCK_SERVICES.map((service) => (
            <button 
              key={service.id}
              onClick={() => onNavigate('SERVICE_INPUT', service)}
              className="w-full flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-2xl neo-shadow-card active:bg-slate-50 transition-colors text-left"
            >
              <div className={`w-12 h-12 ${service.color} rounded-full flex items-center justify-center shrink-0`}>
                {getIcon(service.icon)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-900 text-sm truncate">{service.name}</h4>
                <p className="text-[10px] text-slate-400 font-medium">S/ 120.50 • 15 Oct 2023</p>
              </div>
              <div className="w-8 h-8 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 shrink-0">
                <ChevronRight size={18} />
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-slate-400 font-medium">
            ¿No encuentras lo que buscas? <button className="text-neo-orange font-bold">Contáctanos</button>
          </p>
        </div>
      </main>
    </div>
  );
};
