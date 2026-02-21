import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronLeft,
  HelpCircle, 
  Menu, 
  MessageCircle, 
  Lock, 
  QrCode, 
  Lightbulb, 
  Smartphone,
  Eye,
  EyeOff,
  Fingerprint,
  Smile
} from 'lucide-react';
import { AUTH_CREDENTIALS } from '../constants';
import { AttentionModal } from '../components/Feedback';

interface LoginScreenProps {
  onLogin: () => void;
  onBack?: () => void;
  isPayServiceFlow?: boolean;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onBack, isPayServiceFlow = false }) => {
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleLogin = () => {
    if (dni === AUTH_CREDENTIALS.dni && password === AUTH_CREDENTIALS.password) {
      onLogin();
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-8 py-6 overflow-y-auto no-scrollbar">
      <header className="flex justify-between items-center mb-8 shrink-0 relative h-10">
        {isPayServiceFlow ? (
          <>
            <button onClick={onBack} className="text-neo-orange p-1 -ml-2 absolute left-0">
              <ChevronLeft size={28} />
            </button>
            <h1 className="text-2xl font-bold text-neo-orange w-full text-center">NeoBank</h1>
          </>
        ) : (
          <>
            <button className="text-neo-orange p-1 -ml-2">
              <WhatsAppIcon />
            </button>
            <h1 className="text-2xl font-bold text-neo-orange">NeoBank</h1>
            <div className="flex gap-2">
              <button className="text-neo-orange p-2">
                <HelpCircle size={28} />
              </button>
              <button className="text-neo-orange p-2 -mr-2">
                <Menu size={28} />
              </button>
            </div>
          </>
        )}
      </header>

      {!isPayServiceFlow && (
        <div className="text-center mb-8 shrink-0">
          <h2 className="text-3xl font-bold text-neo-orange mb-1 leading-tight">
            Hola
          </h2>
          <h3>
            ¡Qué bueno tenerte por aquí!
          </h3>
        </div>
      )}

      {isPayServiceFlow && (
        <div className="flex justify-center mb-6 shrink-0">
          <div className="w-16 h-16 bg-neo-orange rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200">
            <Lightbulb size={32} className="text-white" />
          </div>
        </div>
      )}

      {!isPayServiceFlow && (
        <div className="grid grid-cols-4 gap-4 mb-8 shrink-0">
          {[
            { icon: Lock, label: 'Bloquear tarjeta' },
            { icon: QrCode, label: 'Pagar con QR' },
            { 
              icon: Lightbulb, 
              label: 'Pagar servicios', 
              action: 'PAY_SERVICES',
              onClick: () => {
                window.dispatchEvent(new CustomEvent('NAVIGATE_PAY_SERVICE_FLOW'));
              }
            },
            { icon: Smartphone, label: 'Plinear a celular' },
          ].map((item, i) => (
            <button 
              key={i} 
              className="flex flex-col items-center gap-2"
              onClick={item.onClick}
            >
              <div className="w-12 h-12 bg-neo-orange rounded-xl flex items-center justify-center text-white shadow-md">
                <item.icon size={24} />
              </div>
              <span className="text-[9px] font-bold text-slate-700 text-center leading-tight">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      )}

      <div className="space-y-4 mb-8 shrink-0">
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1.5">Nombre de usuario</label>
          <input 
            type="text"
            placeholder="Nombre de usuario"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            className="w-full bg-slate-100 border-none rounded-xl py-3.5 px-5 text-sm text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-neo-orange transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1.5">Contraseña</label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"}
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-100 border-none rounded-xl py-3.5 px-5 text-sm text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-neo-orange transition-all"
            />
            <button 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
      </div>

      <button 
        onClick={handleLogin}
        className="w-full py-4 bg-purple-700 text-white font-bold rounded-xl shadow-lg shadow-purple-200 active:scale-95 transition-transform mb-8 shrink-0"
      >
        Ingresar
      </button>

      <div className="flex justify-center gap-8 mb-8 shrink-0">
        <button className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 border border-slate-200 rounded-full flex items-center justify-center text-slate-400">
            <Fingerprint size={28} className="text-slate-400" />
          </div>
          <span className="text-xs font-medium text-slate-400">Huella</span>
        </button>
        <button className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 border border-slate-200 rounded-full flex items-center justify-center text-slate-400">
            <Smile size={28} className="text-slate-400" />
          </div>
          <span className="text-xs font-medium text-slate-400">Face ID</span>
        </button>
      </div>

      <div className="mt-auto text-center space-y-4 shrink-0 pb-4">
        <button className="text-sm font-bold text-slate-800">¿Olvidaste tu contraseña?</button>
        <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 tracking-wider">
          <Lock size={12} />
          Conexión segura encriptada
        </div>
      </div>

      <AttentionModal 
        isOpen={showError}
        onClose={() => setShowError(false)}
        title="Atención"
        message="No te preocupes, intenta de nuevo. Pero recuerda que tienes 3 intentos antes de que se bloquee tu tarjeta."
        buttonText="Entendido"
      />
    </div>
  );
};

const WhatsAppIcon = () => (
  <svg width="44" height="44" viewBox="0 0 24 24" fill="currentColor" className="text-neo-orange">
    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.522-2.961-2.638-.087-.117-.708-.941-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217s.231.006.332.013c.105.007.246-.04.384.289.144.346.491 1.198.534 1.285.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.101-.177.211-.077.383.1.173.444.734.95 1.185.65.581 1.201.761 1.373.848.172.087.273.072.375-.045.101-.116.434-.506.549-.68.116-.173.231-.144.39-.087s1.011.477 1.184.563c.173.087.289.13.332.202.045.072.045.419-.1.824z" />
  </svg>
);
