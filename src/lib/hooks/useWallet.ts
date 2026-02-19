"use client";

import { useState, useEffect, useCallback } from 'react';
import { 
  connectNautilus, 
  disconnectNautilus, 
  isNautilusConnected, 
  checkNautilusAvailable,
  WalletError,
  getAddressBalance
} from '../wallet';
import { WalletState, INITIAL_WALLET_STATE } from '../constants';

export interface UseWalletReturn {
  wallet: WalletState;
  isConnecting: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  refreshBalance: () => Promise<void>;
  isNautilusAvailable: boolean;
}

export function useWallet(): UseWalletReturn {
  const [wallet, setWallet] = useState<WalletState>(INITIAL_WALLET_STATE);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isNautilusAvailable, setIsNautilusAvailable] = useState(false);

  // Check if Nautilus is available
  useEffect(() => {
    checkNautilusAvailable().then(setIsNautilusAvailable);
  }, []);

  // Check if already connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (!isNautilusAvailable) return;
      
      try {
        const connected = await isNautilusConnected();
        if (connected) {
          // Re-establish connection
          await connect();
        }
      } catch (error) {
        console.warn('Failed to check wallet connection:', error);
      }
    };

    checkConnection();
  }, [isNautilusAvailable]);

  const connect = useCallback(async () => {
    if (isConnecting) return;
    
    setIsConnecting(true);
    setError(null);

    try {
      const { address, balance, balanceNanoErgs } = await connectNautilus();
      
      setWallet({
        connected: true,
        address,
        balance,
        balanceNanoErgs
      });
      
      // Store in localStorage for persistence
      localStorage.setItem('ergo_wallet_connected', 'true');
      localStorage.setItem('ergo_wallet_address', address);
      
    } catch (error) {
      const walletError = error as WalletError;
      
      let errorMessage = walletError.message;
      if (walletError.code === 'NAUTILUS_NOT_INSTALLED') {
        errorMessage = 'Install Nautilus wallet from nautilus.io to connect';
      } else if (walletError.code === 'CONNECTION_REJECTED') {
        errorMessage = 'Connection rejected. Please try again.';
      }
      
      setError(errorMessage);
      console.error('Wallet connection failed:', error);
    } finally {
      setIsConnecting(false);
    }
  }, [isConnecting]);

  const disconnect = useCallback(async () => {
    try {
      await disconnectNautilus();
      setWallet(INITIAL_WALLET_STATE);
      setError(null);
      
      // Clear localStorage
      localStorage.removeItem('ergo_wallet_connected');
      localStorage.removeItem('ergo_wallet_address');
      
    } catch (error) {
      console.error('Wallet disconnect failed:', error);
    }
  }, []);

  const refreshBalance = useCallback(async () => {
    if (!wallet.connected || !wallet.address) return;

    try {
      const balanceData = await getAddressBalance(wallet.address);
      const balance = (balanceData.nanoErgs / 1e9).toFixed(2);
      
      setWallet(prev => ({
        ...prev,
        balance,
        balanceNanoErgs: balanceData.nanoErgs.toString()
      }));
    } catch (error) {
      console.warn('Failed to refresh balance:', error);
    }
  }, [wallet.connected, wallet.address]);

  // Auto-refresh balance every 30 seconds when connected
  useEffect(() => {
    if (!wallet.connected) return;

    const interval = setInterval(refreshBalance, 30000);
    return () => clearInterval(interval);
  }, [wallet.connected, refreshBalance]);

  return {
    wallet,
    isConnecting,
    error,
    connect,
    disconnect,
    refreshBalance,
    isNautilusAvailable
  };
}