"use client";

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select } from '@/components/ui/select';
import { 
  Star, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpDown,
  Wallet,
  Shield,
  Clock
} from 'lucide-react';
import { MOCK_OFFERS, PAYMENT_METHODS, type PaymentMethod, type Offer } from '@/lib/constants';
import { formatCurrency, formatERG, truncateAddress } from '@/lib/utils';
import { useWallet } from '@/lib/hooks/useWallet';
import Link from 'next/link';

type SortOption = 'price-asc' | 'price-desc' | 'amount-asc' | 'amount-desc' | 'rating-desc';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function ExchangePage() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('price-asc');
  const { wallet, connect } = useWallet();

  const sortOptions = [
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'amount-asc', label: 'Amount: Low to High' },
    { value: 'amount-desc', label: 'Amount: High to Low' },
    { value: 'rating-desc', label: 'Rating: High to Low' },
  ];

  const methodOptions = [
    { value: 'all', label: 'All Methods' },
    ...PAYMENT_METHODS.map(method => ({ value: method, label: method }))
  ];

  const filteredAndSortedOffers = useMemo(() => {
    let filtered = selectedMethod === 'all' 
      ? MOCK_OFFERS 
      : MOCK_OFFERS.filter(offer => offer.method === selectedMethod);

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.pricePerErg - b.pricePerErg;
        case 'price-desc':
          return b.pricePerErg - a.pricePerErg;
        case 'amount-asc':
          return a.amount - b.amount;
        case 'amount-desc':
          return b.amount - a.amount;
        case 'rating-desc':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }, [selectedMethod, sortBy]);

  const OfferCard = ({ offer }: { offer: Offer }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover:border-blue-500/50 transition-all duration-300 group cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs">
                  {truncateAddress(offer.seller)}
                </Badge>
                <Badge variant="trust" className="text-xs flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  {offer.rating}
                </Badge>
              </div>
              <p className="text-sm text-gray-400">{offer.trades} trades completed</p>
            </div>
            <Badge variant={offer.method === 'Revolut' ? 'emerald' : 'secondary'}>
              {offer.method}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">Amount</p>
              <p className="text-xl font-bold text-white">{formatERG(offer.amount)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Price per ERG</p>
              <p className="text-xl font-bold text-emerald-400">
                {formatCurrency(offer.pricePerErg)}
              </p>
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">Payment to</p>
            <p className="text-white font-mono text-sm bg-navy-700/50 px-3 py-2 rounded-lg">
              {offer.tag}
            </p>
          </div>
          
          <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
            <span>Total: {formatCurrency(offer.amount * offer.pricePerErg)}</span>
            <span>+ 1% network fee</span>
          </div>
          
          <Link href={`/trade/${offer.id}`}>
            <Button 
              className="w-full group-hover:glow-electric transition-all"
              disabled={!wallet.connected}
            >
              {wallet.connected ? 'Buy ERG' : 'Connect Wallet to Trade'}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div className="text-center mb-8" {...fadeInUp}>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            ERG Exchange
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Browse verified sellers and buy ERG directly with fiat payment methods
          </p>
        </motion.div>

        {/* Wallet Status */}
        {!wallet.connected && (
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-amber-500/10 border-amber-500/30">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Wallet className="w-5 h-5 text-amber-400" />
                  <span className="text-amber-300">Connect your wallet to start trading</span>
                </div>
                <Button 
                  variant="amber" 
                  size="sm"
                  onClick={connect}
                  className="border-amber-500/50 text-space-900 hover:bg-amber-600"
                >
                  Connect Wallet
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Filters and Sort */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 mb-8 p-4 bg-navy-800/30 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400 whitespace-nowrap">Filter by:</span>
            <Select
              options={methodOptions}
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value as PaymentMethod | 'all')}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400 whitespace-nowrap">Sort by:</span>
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
            />
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-400 sm:ml-auto">
            <span>{filteredAndSortedOffers.length} offers</span>
          </div>
        </motion.div>

        {/* Market Stats */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <TrendingDown className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-gray-400">Best Price</span>
              </div>
              <div className="text-lg font-bold text-emerald-400">
                {formatCurrency(Math.min(...MOCK_OFFERS.map(o => o.pricePerErg)))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-400">Avg Price</span>
              </div>
              <div className="text-lg font-bold text-blue-400">
                {formatCurrency(MOCK_OFFERS.reduce((sum, o) => sum + o.pricePerErg, 0) / MOCK_OFFERS.length)}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <Shield className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-400">Total Available</span>
              </div>
              <div className="text-lg font-bold text-white">
                {formatERG(MOCK_OFFERS.reduce((sum, o) => sum + o.amount, 0))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-400">Avg Response</span>
              </div>
              <div className="text-lg font-bold text-white">~2 min</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Offers Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {filteredAndSortedOffers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredAndSortedOffers.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No offers found</h3>
            <p className="text-gray-400 mb-4">
              Try adjusting your filters to see more results
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSelectedMethod('all');
                setSortBy('price-asc');
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}

        {/* Info Banner */}
        <motion.div 
          className="mt-12 p-6 bg-blue-500/10 border border-blue-500/20 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="flex items-start gap-4">
            <Shield className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-blue-300 mb-2">Secure Trading</h3>
              <p className="text-blue-200/80 mb-2">
                All trades are secured by Ergo smart contracts and verified by our decentralized network.
                Your ERG is only released when payment is confirmed on the seller's account.
              </p>
              <Link href="/how-it-works" className="text-blue-400 hover:text-blue-300 text-sm underline">
                Learn more about our security →
              </Link>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}