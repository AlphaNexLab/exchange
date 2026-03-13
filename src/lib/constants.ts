export const MOCK_OFFERS: Offer[] = [
  { 
    id: '1', 
    seller: '9f4QF8jQSi...xK3', 
    amount: 500, 
    pricePerAnx: 1.85, 
    method: 'Revolut', 
    tag: '@ergo_seller1', 
    rating: 4.8, 
    trades: 142 
  },
  { 
    id: '2', 
    seller: '9hY3bQx7Kp...mN2', 
    amount: 1200, 
    pricePerAnx: 1.82, 
    method: 'Revolut', 
    tag: '@crypto_paolo', 
    rating: 4.9, 
    trades: 89 
  },
  { 
    id: '3', 
    seller: '9eZVqXpkRt...jQ7', 
    amount: 250, 
    pricePerAnx: 1.88, 
    method: 'Wise', 
    tag: 'ergo.seller@email.com', 
    rating: 4.6, 
    trades: 56 
  },
  { 
    id: '4', 
    seller: '9iDw3nPxYm...vR5', 
    amount: 800, 
    pricePerAnx: 1.84, 
    method: 'Revolut', 
    tag: '@erg_madrid', 
    rating: 5.0, 
    trades: 203 
  },
  { 
    id: '5', 
    seller: '9gTqMjAxBn...kL9', 
    amount: 2000, 
    pricePerAnx: 1.80, 
    method: 'PayPal', 
    tag: 'ergseller@proton.me', 
    rating: 4.7, 
    trades: 67 
  },
  { 
    id: '6', 
    seller: '9fRsKcNwDp...hS4', 
    amount: 350, 
    pricePerAnx: 1.86, 
    method: 'Wise', 
    tag: 'wise_ergo_trader', 
    rating: 4.5, 
    trades: 31 
  },
];

export const MOCK_STATS = {
  totalTrades: 26847,
  totalVolume: 5300000,
  totalSellers: 2405
};

export const PAYMENT_METHODS = ['Revolut', 'Wise', 'PayPal'] as const;

export type PaymentMethod = typeof PAYMENT_METHODS[number];

export interface Offer {
  id: string;
  seller: string;
  amount: number;
  pricePerAnx: number;
  method: PaymentMethod;
  tag: string;
  rating: number;
  trades: number;
}

// Ergo Platform Constants
export const PLATFORM_FEE_PERCENT = 1; // 1% fee
export const PLATFORM_FEE_ADDRESS = '9gxmJ4attdDx1NnZL7tWkN2U9iwZbPWWSEcfcPHbJXc7xsLq6QK';

// Explorer URLs (Ergo marketplace assets + EVM address explorers)
export const EXPLORER_TX = 'https://sigmaspace.io/en/transaction/';
export const EXPLORER_TOKEN = 'https://sigmaspace.io/en/token/';
export const EXPLORER_ADDR = 'https://sigmaspace.io/en/address/';
export const EXPLORER_API = 'https://api.ergoplatform.com/api/v1';

/** EVM address explorers keyed by chain id */
export const EVM_EXPLORER_ADDR: Record<number, string> = {
  1: 'https://etherscan.io/address/',
  8453: 'https://basescan.org/address/',
  42161: 'https://arbiscan.io/address/',
  10: 'https://optimistic.etherscan.io/address/',
  137: 'https://polygonscan.com/address/',
  11155111: 'https://sepolia.etherscan.io/address/',
};

export function getEvmAddressExplorer(chainId: number | undefined, address: string): string {
  const base = (chainId && EVM_EXPLORER_ADDR[chainId]) || EVM_EXPLORER_ADDR[1];
  return `${base}${address}`;
}

// Wallet Connection States (EVM)
export interface WalletState {
  connected: boolean;
  address: string;
  balance: string; // native token, formatted
  balanceNanoErgs: string; // raw wei (legacy field name kept for compatibility)
  chainId?: number;
  connectorName?: string;
  symbol?: string;
}

export const INITIAL_WALLET_STATE: WalletState = {
  connected: false,
  address: '',
  balance: '0',
  balanceNanoErgs: '0',
  symbol: 'ANX',
};