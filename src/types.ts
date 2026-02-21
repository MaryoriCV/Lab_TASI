export interface User {
  id: string;
  name: string;
  dni: string;
}

export interface Account {
  id: string;
  type: string;
  number: string;
  balance: number;
  currency: 'S/' | '$';
  color: string;
  icon: string;
}

export interface Service {
  id: string;
  name: string;
  category: 'Luz' | 'Agua' | 'Internet' | 'Gas';
  icon: string;
  color: string;
}

export interface Receipt {
  id: string;
  serviceId: string;
  number: string;
  amount: number;
  dueDate: string;
  status: 'PENDIENTE' | 'VENCIDO' | 'PAGADO';
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: 'INCOME' | 'EXPENSE';
  icon: string;
}

export type AppScreen = 
  | 'SPLASH' 
  | 'LOGIN' 
  | 'HOME' 
  | 'ACCOUNT_DETAIL' 
  | 'PAY_SERVICES_LIST' 
  | 'SERVICE_INPUT' 
  | 'DEBT_RESULT' 
  | 'CONFIRM_PAYMENT' 
  | 'SUCCESS'
  | 'PROCESSING';
