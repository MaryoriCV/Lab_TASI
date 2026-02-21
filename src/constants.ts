import { Account, Service, Receipt, Transaction, User } from './types';

export const AUTH_CREDENTIALS = {
  dni: 'Maryori',
  password: '123456'
};

export const MOCK_USER: User = {
  id: '1',
  name: 'Maryori',
  dni: '75843948'
};

export const MOCK_ACCOUNTS: Account[] = [
  {
    id: 'acc1',
    type: 'Cuenta Ahorro Soles',
    number: '****3321',
    balance: 50.00,
    currency: 'S/',
    color: 'bg-purple-100',
    icon: 'piggy-bank'
  },
  {
    id: 'acc2',
    type: 'Cuenta CTS',
    number: '****3548',
    balance: 1680.00,
    currency: 'S/',
    color: 'bg-blue-100',
    icon: 'wallet'
  },
  {
    id: 'acc3',
    type: 'Cuenta Sueldo',
    number: '****4982',
    balance: 1120.00,
    currency: 'S/',
    color: 'bg-green-100',
    icon: 'banknote'
  }
];

export const MOCK_SERVICES: Service[] = [
  { id: 's1', name: 'Luz del Sur', category: 'Luz', icon: 'zap', color: 'bg-yellow-900' },
  { id: 's2', name: 'SedaPal', category: 'Agua', icon: 'droplet', color: 'bg-cyan-700' },
  { id: 's3', name: 'Movistar Internet', category: 'Internet', icon: 'wifi', color: 'bg-green-600' },
  { id: 's4', name: 'Cálidda', category: 'Gas', icon: 'flame', color: 'bg-slate-800' }
];

export const MOCK_RECEIPTS: Receipt[] = [
  { id: 'r1', serviceId: 's1', number: '#987654', amount: 45.00, dueDate: 'Ene 25, 2026', status: 'VENCIDO' },
  { id: 'r2', serviceId: 's1', number: '#987655', amount: 32.50, dueDate: 'Feb 26, 2026', status: 'PENDIENTE' },
  { id: 'r3', serviceId: 's1', number: '#987656', amount: 12.00, dueDate: 'Mar 24, 2026', status: 'PENDIENTE' }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', description: 'Supermercado Metro', amount: -45.00, date: 'Hace 2 horas', type: 'EXPENSE', icon: 'shopping-cart' },
  { id: 't2', description: 'Juan Perez', amount: 120.00, date: 'Ayer', type: 'INCOME', icon: 'user' }
];
