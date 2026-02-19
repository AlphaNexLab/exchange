"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  Shield, 
  CheckCircle,
  ExternalLink,
  Copy,
  AlertTriangle,
  Loader
} from 'lucide-react';
import { MOCK_OFFERS, EXPLORER_TX } from '@/lib/constants';
import { formatCurrency, formatERG, truncateAddress, calculateTotal } from '@/lib/utils';
import { useWallet } from '@/lib/hooks/useWallet';

type TradeStep = 'amount' | 'payment' | 'paid' | 'verification' | 'success';

interface VerifierNode {
  id: number;
  name: string;
  status: 'pending' | 'verified' | 'failed';
}

export default function TradePageClient() {
  const params = useParams();
  const router = useRouter();
  const { wallet } = useWallet();
  const [currentStep, setCurrentStep] = useState<TradeStep>('amount');
  const [amount, setAmount] = useState<number>(0);
  const [countdown, setCountdown] = useState(1800); // 30 minutes
  const [verifiers, setVerifiers] = useState<VerifierNode[]>([
    { id: 1, name: 'Verifier 1', status: 'pending' },
    { id: 2, name: 'Verifier 2', status: 'pending' },
    { id: 3, name: 'Verifier 3', status: 'pending' },
    { id: 4, name: 'Verifier 4', status: 'pending' },
    { id: 5, name: 'Verifier 5', status: 'pending' },
  ]);
  const [mockTxHash] = useState('f7a8b9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0');

  const offer = MOCK_OFFERS.find(o => o.id === params.id);

  useEffect(() => {
    if (currentStep === 'payment' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, countdown]);

  useEffect(() => {
    if (currentStep === 'verification') {
      let verified = 0;
      const verifyNode = () => {
        if (verified < 3) {
          setVerifiers(prev => {
            const newVerifiers = [...prev];
            const pendingIndex = newVerifiers.findIndex(v => v.status === 'pending');
            if (pendingIndex !== -1) {
              newVerifiers[pendingIndex].status = 'verified';
            }
            return newVerifiers;
          });
          verified++;
          if (verified < 3) {
            setTimeout(verifyNode, 2000);
          } else {
            setTimeout(() => setCurrentStep('success'), 1000);
          }
        }
      };
      setTimeout(verifyNode, 1000);
    }
  }, [currentStep]);

  if (!offer) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Offer Not Found</h1>
          <Button onClick={() => router.push('/exchange')}>
            Back to Exchange
          </Button>
        </div>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const total = calculateTotal(amount || offer.amount, offer.pricePerErg);

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {['amount', 'payment', 'paid', 'verification', 'success'].map((step, index) => {
        const stepIndex = ['amount', 'payment', 'paid', 'verification', 'success'].indexOf(currentStep);
        const isActive = index === stepIndex;
        const isCompleted = index < stepIndex;
        
        return (
          <React.Fragment key={step}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              isCompleted ? 'bg-emerald-500 text-white' :
              isActive ? 'bg-electric-500 text-white' :
              'bg-slate-700 text-slate-400'
            }`}>
              {isCompleted ? <CheckCircle className="w-5 h-5" /> : index + 1}
            </div>
            {index < 4 && (
              <div className={`w-16 h-0.5 mx-2 ${
                isCompleted ? 'bg-emerald-500' : 'bg-slate-700'
              }`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => router.push('/exchange')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Exchange
          </Button>
          <h1 className="text-2xl font-bold">Buy ERG from {truncateAddress(offer.seller)}</h1>
        </div>

        <StepIndicator />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 'amount' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Select Amount</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Amount of ERG to buy
                      </label>
                      <div className="relative">
                        <Input
                          type="number"
                          value={amount || offer.amount}
                          onChange={(e) => setAmount(Number(e.target.value))}
                          max={offer.amount}
                          min={1}
                          className="text-lg"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                          ERG
                        </div>
                      </div>
                      <p className="text-sm text-slate-400 mt-1">
                        Available: {formatERG(offer.amount)}
                      </p>
                    </div>

                    <div className="bg-space-700/30 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>{formatCurrency((amount || offer.amount) * offer.pricePerErg)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-slate-400">
                        <span>Network fee (1%):</span>
                        <span>{formatCurrency((amount || offer.amount) * offer.pricePerErg * 0.01)}</span>
                      </div>
                      <hr className="border-slate-600" />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span className="text-emerald-400">{formatCurrency(total)}</span>
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      onClick={() => setCurrentStep('payment')}
                      disabled={!amount && !offer.amount}
                    >
                      Continue to Payment
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {currentStep === 'payment' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-emerald-400" />
                      Payment Instructions
                      <Badge variant="emerald" className="ml-auto">
                        {formatTime(countdown)}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-amber-300 mb-1">
                            Payment Timeout: 30 minutes
                          </p>
                          <p className="text-amber-200/80 text-sm">
                            Complete your payment within 30 minutes or this trade will be cancelled.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Send {formatCurrency(total)} to:
                      </label>
                      <div className="bg-space-700/50 p-4 rounded-lg border border-slate-600">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-lg">{offer.tag}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(offer.tag)}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-slate-400 text-sm mt-1">
                          Payment method: {offer.method}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Payment Instructions:</h4>
                      <ol className="list-decimal list-inside space-y-2 text-sm text-slate-300">
                        <li>Open your {offer.method} app</li>
                        <li>Send exactly {formatCurrency(total)} to {offer.tag}</li>
                        <li>Add reference: "ERG-{offer.id.toUpperCase()}"</li>
                        <li>Complete the payment</li>
                        <li>Return here and click "I've Paid"</li>
                      </ol>
                    </div>

                    <Button
                      className="w-full"
                      onClick={() => setCurrentStep('paid')}
                    >
                      I've Sent the Payment
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {currentStep === 'paid' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Confirmation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-electric-500/10 border border-electric-500/30 p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-electric-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-electric-300 mb-1">
                            Payment Received Confirmation
                          </p>
                          <p className="text-electric-200/80 text-sm">
                            Please confirm that you have sent the payment. Our verification network will 
                            confirm the transaction before releasing your ERG.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-space-700/30 p-4 rounded-lg">
                      <h4 className="font-medium mb-3">Payment Summary:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Amount sent:</span>
                          <span>{formatCurrency(total)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">To:</span>
                          <span className="font-mono">{offer.tag}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Method:</span>
                          <span>{offer.method}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Reference:</span>
                          <span className="font-mono">ERG-{offer.id.toUpperCase()}</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      onClick={() => setCurrentStep('verification')}
                    >
                      Yes, I've Paid
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {currentStep === 'verification' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Loader className="w-5 h-5 animate-spin text-electric-400" />
                      Frontier Verification
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-electric-500/10 border border-electric-500/30 p-4 rounded-lg">
                      <p className="text-electric-300 text-sm">
                        Our verification network is confirming your payment. This process typically takes 2-5 minutes.
                        3 out of 5 verifiers need to confirm the payment for ERG to be released.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Verification Progress:</h4>
                      {verifiers.map((verifier) => (
                        <motion.div
                          key={verifier.id}
                          className="flex items-center justify-between p-3 bg-space-700/30 rounded-lg"
                          initial={{ opacity: 0.5 }}
                          animate={{ 
                            opacity: verifier.status === 'verified' ? 1 : 0.7,
                            scale: verifier.status === 'verified' ? 1.02 : 1
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <span className="text-sm">{verifier.name}</span>
                          <div className="flex items-center gap-2">
                            {verifier.status === 'pending' && (
                              <Loader className="w-4 h-4 animate-spin text-slate-400" />
                            )}
                            {verifier.status === 'verified' && (
                              <CheckCircle className="w-4 h-4 text-emerald-400" />
                            )}
                            <Badge variant={
                              verifier.status === 'verified' ? 'verified' :
                              verifier.status === 'failed' ? 'destructive' :
                              'pending'
                            }>
                              {verifier.status}
                            </Badge>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="text-center text-slate-400">
                      <p>Verified: {verifiers.filter(v => v.status === 'verified').length}/3 required</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {currentStep === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-emerald-500/50 bg-emerald-500/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle className="w-6 h-6" />
                      Trade Completed Successfully!
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center py-8">
                      <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-10 h-10 text-emerald-400" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">
                        {formatERG(amount || offer.amount)} sent to your wallet!
                      </h3>
                      <p className="text-slate-400">
                        Your ERG has been successfully transferred. The transaction is now complete.
                      </p>
                    </div>

                    <div className="bg-space-700/30 p-4 rounded-lg">
                      <h4 className="font-medium mb-3">Transaction Details:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">ERG Received:</span>
                          <span className="text-emerald-400 font-bold">
                            {formatERG(amount || offer.amount)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Total Paid:</span>
                          <span>{formatCurrency(total)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Transaction Hash:</span>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs">
                              {truncateAddress(mockTxHash, 8)}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(mockTxHash)}
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => window.open(`${EXPLORER_TX}${mockTxHash}`, '_blank')}
                            >
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        className="flex-1"
                        onClick={() => router.push('/exchange')}
                      >
                        Trade Again
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => window.open(`${EXPLORER_TX}${mockTxHash}`, '_blank')}
                      >
                        View on Explorer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">Seller Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Address:</span>
                  <Badge variant="address" className="font-mono">
                    {truncateAddress(offer.seller)}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Rating:</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current text-amber-400" />
                    <span className="font-bold">{offer.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Trades:</span>
                  <span className="font-bold">{offer.trades}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Method:</span>
                  <Badge variant={
                    offer.method === 'Revolut' ? 'revolut' :
                    offer.method === 'Wise' ? 'wise' :
                    offer.method === 'PayPal' ? 'paypal' : 'secondary'
                  }>
                    {offer.method}
                  </Badge>
                </div>
                
                <hr className="border-slate-700" />
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Price per ERG:</span>
                    <span className="font-bold">{formatCurrency(offer.pricePerErg)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Available:</span>
                    <span className="font-bold">{formatERG(offer.amount)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}