import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { SplashScreen } from './screens/SplashScreen';
import { LoginScreen } from './screens/LoginScreen';
import { HomeScreen } from './screens/HomeScreen';
import { AccountDetailScreen } from './screens/AccountDetailScreen';
import { PayServicesScreen } from './screens/PayServicesScreen';
import { ServiceInputScreen } from './screens/ServiceInputScreen';
import { DebtResultScreen } from './screens/DebtResultScreen';
import { ConfirmPaymentScreen } from './screens/ConfirmPaymentScreen';
import { SuccessScreen } from './screens/SuccessScreen';
import { LoadingOverlay } from './components/Feedback';
import { BottomNav } from './components/Navigation';
import { AppScreen, Account, Service, Receipt } from './types';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('SPLASH');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPayServiceFlow, setIsPayServiceFlow] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedReceipts, setSelectedReceipts] = useState<Receipt[]>([]);
  const [loadingData, setLoadingData] = useState<{ nextScreen: AppScreen; title: string; subtitle: string; data?: any } | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleSpecialFlow = () => {
      setIsPayServiceFlow(true);
      setCurrentScreen('LOGIN');
    };
    window.addEventListener('NAVIGATE_PAY_SERVICE_FLOW', handleSpecialFlow);
    return () => window.removeEventListener('NAVIGATE_PAY_SERVICE_FLOW', handleSpecialFlow);
  }, []);

  useEffect(() => {
    if (currentScreen === 'PROCESSING' && loadingData) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              handleNavigate(loadingData.nextScreen, loadingData.data);
              setLoadingData(null);
            }, 500);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [currentScreen, loadingData]);

  const handleNavigate = (screen: AppScreen, data?: any) => {
    if (screen === 'PROCESSING') {
      setLoadingData(data);
      setCurrentScreen('PROCESSING');
      return;
    }

    if (screen === 'ACCOUNT_DETAIL') setSelectedAccount(data);
    if (screen === 'SERVICE_INPUT') setSelectedService(data);
    if (screen === 'CONFIRM_PAYMENT') setSelectedReceipts(data.receipts);
    
    setCurrentScreen(screen);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    if (isPayServiceFlow) {
      setCurrentScreen('PAY_SERVICES_LIST');
      setIsPayServiceFlow(false);
    } else {
      setCurrentScreen('HOME');
    }
  };

  const handlePayServiceFromLogin = () => {
    setIsPayServiceFlow(true);
    setCurrentScreen('LOGIN');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'SPLASH':
        return <SplashScreen onComplete={() => setCurrentScreen('LOGIN')} />;
      case 'LOGIN':
        return (
          <LoginScreen 
            onLogin={handleLogin} 
            isPayServiceFlow={isPayServiceFlow} 
            onBack={() => {
              if (isPayServiceFlow) {
                setIsPayServiceFlow(false);
              }
            }}
          />
        );
      case 'HOME':
        return <HomeScreen onNavigate={handleNavigate} />;
      case 'ACCOUNT_DETAIL':
        return selectedAccount ? <AccountDetailScreen account={selectedAccount} onNavigate={handleNavigate} /> : null;
      case 'PAY_SERVICES_LIST':
        return <PayServicesScreen onNavigate={handleNavigate} />;
      case 'SERVICE_INPUT':
        return selectedService ? <ServiceInputScreen service={selectedService} onNavigate={handleNavigate} /> : null;
      case 'DEBT_RESULT':
        return selectedService ? <DebtResultScreen service={selectedService} onNavigate={handleNavigate} /> : null;
      case 'CONFIRM_PAYMENT':
        return <ConfirmPaymentScreen receipts={selectedReceipts} onNavigate={handleNavigate} />;
      case 'SUCCESS':
        const totalPaid = selectedReceipts.reduce((sum, r) => sum + r.amount, 0) + 1.50;
        return <SuccessScreen onNavigate={handleNavigate} amount={totalPaid} />;
      case 'PROCESSING':
        return loadingData ? <LoadingOverlay title={loadingData.title} subtitle={loadingData.subtitle} progress={progress} /> : null;
      default:
        return <HomeScreen onNavigate={handleNavigate} />;
    }
  };

  const showBottomNav = ['HOME', 'ACCOUNT_DETAIL'].includes(currentScreen);

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-200 p-0 sm:p-4">
      <div className="w-full max-w-[430px] h-screen sm:h-[850px] bg-white shadow-2xl relative overflow-hidden sm:rounded-[3rem] border-[8px] border-slate-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className={`h-full overflow-y-auto no-scrollbar ${showBottomNav ? 'pb-20' : ''}`}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
        
        {showBottomNav && (
          <BottomNav activeScreen={currentScreen} onNavigate={handleNavigate} />
        )}
      </div>
    </div>
  );
}
