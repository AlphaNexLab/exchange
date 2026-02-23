"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Wallet, 
  Home, 
  BarChart3, 
  DollarSign, 
  HelpCircle, 
  Server,
  ChevronDown,
  Copy,
  ExternalLink,
  RefreshCw,
  LogOut,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWallet } from '@/lib/hooks/useWallet';
import { formatAddress } from '@/lib/wallet';
import { EXPLORER_ADDR } from '@/lib/constants';

interface NavigationProps {}

export function Navigation({}: NavigationProps = {}) {
  const pathname = usePathname();
  const { wallet, isConnecting, error, connect, disconnect, refreshBalance, isNautilusAvailable } = useWallet();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showError, setShowError] = useState(false);

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/exchange', label: 'Exchange', icon: BarChart3 },
    { href: '/sell', label: 'Sell', icon: DollarSign },
    { href: '/how-it-works', label: 'How It Works', icon: HelpCircle },
    { href: '/nodes', label: 'Nodes', icon: Server },
  ];

  const handleConnect = async () => {
    setShowError(false);
    await connect();
  };

  const copyAddress = async () => {
    if (wallet.address) {
      await navigator.clipboard.writeText(wallet.address);
      // Could show a toast here
    }
  };

  const openExplorer = () => {
    if (wallet.address) {
      window.open(`${EXPLORER_ADDR}${wallet.address}`, '_blank');
    }
  };

  return (
    <>
      <nav className="border-b border-slate-700/30 bg-space-800/60 backdrop-blur-lg sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-9 h-9 bg-gradient-to-br from-amber-500 to-copper-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-amber-500/30 transition-all duration-300">
                <span className="text-space-900 font-bold text-sm">★</span>
              </div>
              <span className="text-xl font-frontier font-bold text-slate-50 tracking-wider group-hover:text-amber-300 transition-colors">
                ERGO FRONTIER
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold tracking-tight transition-all duration-300",
                      isActive
                        ? "text-amber-300 bg-amber-500/10 border border-amber-500/20 glow-frontier"
                        : "text-slate-300 hover:text-white hover:bg-space-700/50 hover:text-amber-300 border border-transparent"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Wallet Section */}
            <div className="flex items-center space-x-3">
              {!wallet.connected ? (
                <Button
                  onClick={handleConnect}
                  variant={isNautilusAvailable ? "invite" : "default"}
                  disabled={isConnecting}
                  loading={isConnecting}
                  className="flex items-center space-x-2"
                >
                  <Wallet className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {isConnecting ? "Connecting..." : "Connect Wallet"}
                  </span>
                </Button>
              ) : (
                <div className="relative">
                  <Button
                    onClick={() => setShowDropdown(!showDropdown)}
                    variant="emerald"
                    className="flex items-center space-x-2 pr-3"
                  >
                    <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse" />
                    <div className="hidden sm:flex flex-col items-start">
                      <span className="text-xs font-medium">
                        {formatAddress(wallet.address)}
                      </span>
                      <span className="text-xs opacity-90">
                        {wallet.balance} ERG
                      </span>
                    </div>
                    <span className="sm:hidden font-bold">
                      {wallet.balance} ERG
                    </span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>

                  {/* Wallet Dropdown */}
                  {showDropdown && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-space-800/95 backdrop-blur-lg border border-slate-700/50 rounded-xl shadow-2xl z-50">
                      <div className="p-4 border-b border-slate-700/50">
                        <div className="text-sm text-slate-400 mb-1">Wallet Address</div>
                        <div className="font-mono text-xs text-slate-300 break-all">
                          {wallet.address}
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div>
                            <div className="text-sm text-slate-400">Balance</div>
                            <div className="text-lg font-bold text-emerald-400">
                              {wallet.balance} ERG
                            </div>
                          </div>
                          <Badge variant="verified" className="text-xs">
                            Connected
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="p-2">
                        <button
                          onClick={copyAddress}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-space-700/50 rounded-lg transition-all"
                        >
                          <Copy className="w-4 h-4" />
                          <span>Copy Address</span>
                        </button>
                        
                        <button
                          onClick={openExplorer}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-space-700/50 rounded-lg transition-all"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>View on Explorer</span>
                        </button>
                        
                        <button
                          onClick={refreshBalance}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-space-700/50 rounded-lg transition-all"
                        >
                          <RefreshCw className="w-4 h-4" />
                          <span>Refresh Balance</span>
                        </button>
                        
                        <hr className="my-2 border-slate-700/50" />
                        
                        <button
                          onClick={() => {
                            disconnect();
                            setShowDropdown(false);
                          }}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-red-300 hover:text-red-200 hover:bg-red-500/10 rounded-lg transition-all"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Disconnect</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden pb-4 pt-2">
            <div className="flex items-center justify-around">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex flex-col items-center space-y-1 p-2 rounded-lg text-xs font-medium transition-all",
                      isActive
                        ? "text-amber-300 bg-amber-500/10"
                        : "text-slate-400 hover:text-amber-300"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Error Toast */}
      {error && !showError && (
        <div className="fixed top-20 right-4 bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl shadow-lg backdrop-blur-sm z-50 max-w-sm">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">{error}</p>
              {error.includes('nautilus.io') && (
                <a 
                  href="https://nautilus.io" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-red-200 hover:text-red-100 underline mt-1 block"
                >
                  Download Nautilus Wallet →
                </a>
              )}
            </div>
            <button
              onClick={() => setShowError(true)}
              className="text-red-400 hover:text-red-300 text-xs"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </>
  );
}