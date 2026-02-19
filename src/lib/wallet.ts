// Ergo Wallet Connection using Nautilus dApp Connector API

interface ErgoWallet {
  getBalance: () => Promise<string>; // nanoErgs as string
  getChangeAddress: () => Promise<string>;
  getUsedAddresses: () => Promise<string[]>;
  signTx: (tx: any) => Promise<any>;
  submitTx: (tx: any) => Promise<string>;
}

interface ErgoConnector {
  nautilus: {
    connect: () => Promise<boolean>;
    disconnect: () => Promise<boolean>;
    isConnected: () => Promise<boolean>;
  };
}

declare global {
  interface Window {
    ergoConnector?: ErgoConnector;
    ergo?: ErgoWallet;
  }
}

export class WalletError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'WalletError';
  }
}

export async function checkNautilusAvailable(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  return !!window.ergoConnector?.nautilus;
}

export async function connectNautilus(): Promise<{ address: string; balance: string; balanceNanoErgs: string }> {
  if (typeof window === 'undefined') {
    throw new WalletError('Not in browser environment', 'NOT_BROWSER');
  }

  const ergoConnector = window.ergoConnector;
  if (!ergoConnector?.nautilus) {
    throw new WalletError(
      'Nautilus wallet not found. Install it from nautilus.io', 
      'NAUTILUS_NOT_INSTALLED'
    );
  }

  try {
    const connected = await ergoConnector.nautilus.connect();
    if (!connected) {
      throw new WalletError('Connection rejected by user', 'CONNECTION_REJECTED');
    }

    const ergo = window.ergo;
    if (!ergo) {
      throw new WalletError('Ergo object not available', 'ERGO_NOT_AVAILABLE');
    }

    const address = await ergo.getChangeAddress();
    const balanceNanoErgs = await ergo.getBalance();
    const balance = formatErg(balanceNanoErgs);

    return { address, balance, balanceNanoErgs };
  } catch (error) {
    if (error instanceof WalletError) throw error;
    throw new WalletError(
      `Failed to connect to Nautilus: ${(error as Error).message}`, 
      'CONNECTION_FAILED'
    );
  }
}

export async function disconnectNautilus(): Promise<void> {
  if (typeof window === 'undefined') return;
  
  const ergoConnector = window.ergoConnector;
  if (ergoConnector?.nautilus) {
    try {
      await ergoConnector.nautilus.disconnect();
    } catch (error) {
      console.warn('Failed to disconnect wallet:', error);
    }
  }
}

export async function isNautilusConnected(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  
  const ergoConnector = window.ergoConnector;
  if (!ergoConnector?.nautilus) return false;
  
  try {
    return await ergoConnector.nautilus.isConnected();
  } catch {
    return false;
  }
}

export function formatErg(nanoErgs: string | number): string {
  const nanoErgsNum = typeof nanoErgs === 'string' ? parseInt(nanoErgs) : nanoErgs;
  if (isNaN(nanoErgsNum)) return '0.00';
  return (nanoErgsNum / 1e9).toFixed(2);
}

export function truncateAddress(addr: string): string {
  if (addr.length <= 12) return addr;
  return addr.slice(0, 8) + '...' + addr.slice(-4);
}

export function formatAddress(addr: string): string {
  return truncateAddress(addr);
}

// Mock transaction signing for demo purposes
export async function mockSignAndSubmitTx(txData: any): Promise<string> {
  // In a real app, this would use ergo.signTx() and ergo.submitTx()
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate signing delay
  
  // Return mock transaction hash
  return 'f7a8b9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0';
}

// Get balance for a specific address (using explorer API)
export async function getAddressBalance(address: string): Promise<{ nanoErgs: number; tokens: any[] }> {
  try {
    const response = await fetch(`https://api.ergoplatform.com/api/v1/addresses/${address}/balance/confirmed`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn('Failed to fetch balance from explorer:', error);
    // Return mock data on failure
    return { nanoErgs: 2847300000000, tokens: [] }; // 2847.3 ERG
  }
}