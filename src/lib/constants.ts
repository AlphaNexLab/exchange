export const MOCK_OFFERS: Offer[] = [
  { 
    id: '1', 
    seller: '9f4QF8jQSi...xK3', 
    amount: 500, 
    pricePerErg: 1.85, 
    method: 'Revolut', 
    tag: '@ergo_seller1', 
    rating: 4.8, 
    trades: 142 
  },
  { 
    id: '2', 
    seller: '9hY3bQx7Kp...mN2', 
    amount: 1200, 
    pricePerErg: 1.82, 
    method: 'Revolut', 
    tag: '@crypto_paolo', 
    rating: 4.9, 
    trades: 89 
  },
  { 
    id: '3', 
    seller: '9eZVqXpkRt...jQ7', 
    amount: 250, 
    pricePerErg: 1.88, 
    method: 'Wise', 
    tag: 'ergo.seller@email.com', 
    rating: 4.6, 
    trades: 56 
  },
  { 
    id: '4', 
    seller: '9iDw3nPxYm...vR5', 
    amount: 800, 
    pricePerErg: 1.84, 
    method: 'Revolut', 
    tag: '@erg_madrid', 
    rating: 5.0, 
    trades: 203 
  },
  { 
    id: '5', 
    seller: '9gTqMjAxBn...kL9', 
    amount: 2000, 
    pricePerErg: 1.80, 
    method: 'PayPal', 
    tag: 'ergseller@proton.me', 
    rating: 4.7, 
    trades: 67 
  },
  { 
    id: '6', 
    seller: '9fRsKcNwDp...hS4', 
    amount: 350, 
    pricePerErg: 1.86, 
    method: 'Wise', 
    tag: 'wise_ergo_trader', 
    rating: 4.5, 
    trades: 31 
  },
];

export const MOCK_STATS = {
  totalTrades: 2847,
  totalVolume: 1200000,
  totalSellers: 156
};

export const PAYMENT_METHODS = ['Revolut', 'Wise', 'PayPal'] as const;

export type PaymentMethod = typeof PAYMENT_METHODS[number];

export interface Offer {
  id: string;
  seller: string;
  amount: number;
  pricePerErg: number;
  method: PaymentMethod;
  tag: string;
  rating: number;
  trades: number;
}

// Ergo Platform Constants
export const PLATFORM_FEE_PERCENT = 1; // 1% fee
export const PLATFORM_FEE_ADDRESS = '9gxmJ4attdDx1NnZL7tWkN2U9iwZbPWWSEcfcPHbJXc7xsLq6QK';

// Explorer URLs
export const EXPLORER_TX = 'https://sigmaspace.io/en/transaction/';
export const EXPLORER_TOKEN = 'https://sigmaspace.io/en/token/';
export const EXPLORER_ADDR = 'https://sigmaspace.io/en/address/';
export const EXPLORER_API = 'https://api.ergoplatform.com/api/v1';

// Wallet Connection States
export interface WalletState {
  connected: boolean;
  address: string;
  balance: string; // in ERG (formatted)
  balanceNanoErgs: string; // raw nanoErgs
}

export const INITIAL_WALLET_STATE: WalletState = {
  connected: false,
  address: '',
  balance: '0',
  balanceNanoErgs: '0'
};