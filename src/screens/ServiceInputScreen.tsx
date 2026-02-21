import React, { useState } from 'react';
import { Info, Zap, Droplet, Wifi, Flame } from 'lucide-react';
import { Header } from '../components/Navigation';
import { AppScreen, Service } from '../types';

interface ServiceInputScreenProps {
  service: Service;
  onNavigate: (screen: AppScreen, data?: any) => void;
}

export const ServiceInputScreen: React.FC<ServiceInputScreenProps> = ({ service, onNavigate }) => {
  const [code, setCode] = useState('');

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
    <div className="min-h-screen bg-white flex flex-col">
      <Header title="Pagar Servicios" onBack={() => onNavigate('PAY_SERVICES_LIST')} variant="centered" showActions={false} />

      <main className="px-6 py-4 flex-1">
        <div className="bg-slate-50 rounded-3xl p-5 flex items-center gap-4 mb-8">
          <div className={`w-14 h-14 ${service.color} rounded-2xl flex items-center justify-center shrink-0`}>
            {getIcon(service.icon)}
          </div>
          <div>
            <h4 className="text-lg font-bold text-slate-900">{service.name}</h4>
            <p className="text-xs text-slate-400 font-medium">Servicio de electricidad</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-3">Código de cliente o número de suministro</label>
            <div className="relative">
              <input 
                type="text"
                placeholder="Ej: 1234567"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-5 text-sm text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-neo-orange transition-all"
              />
              <Info className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
            </div>
          </div>

          <div className="bg-purple-50 rounded-2xl p-5 flex gap-3">
            <div className="w-5 h-5 text-neo-purple mt-0.5 shrink-0">
              <LightbulbIcon />
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Puedes encontrar este código en la parte superior derecha de tu recibo físico o en tu factura electrónica.
            </p>
          </div>
        </div>
      </main>

      <div className="p-6 space-y-3 shrink-0">
        <button 
          onClick={() => onNavigate('PROCESSING', { nextScreen: 'DEBT_RESULT', service: service, title: 'Consultando deuda...', subtitle: 'Estamos buscando tus recibos' })}
          className="w-full py-4 bg-neo-purple text-white font-bold rounded-2xl neo-shadow-button active:scale-95 transition-transform"
        >
          Consultar deuda
        </button>
        <p className="text-[10px] text-slate-400 text-center tracking-wider">
          NeoBank protege tus datos de pago con seguridad bancaria.
        </p>
      </div>
    </div>
  );
};

const LightbulbIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .5 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
    <path d="M9 18h6" />
    <path d="M10 22h4" />
  </svg>
);
