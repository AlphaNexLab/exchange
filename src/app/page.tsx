"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation } from '@/components/navigation';
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  Users, 
  DollarSign,
  Star,
  TrendingUp,
  ChevronRight,
  CheckCircle
} from 'lucide-react';
import { MOCK_STATS } from '@/lib/constants';
import { formatNumber, formatCurrency } from '@/lib/utils';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function HomePage() {
  const [animatedStats, setAnimatedStats] = useState({
    trades: 0,
    volume: 0,
    sellers: 0
  });

  useEffect(() => {
    const animateStats = () => {
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        const progress = currentStep / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);

        setAnimatedStats({
          trades: Math.floor(MOCK_STATS.totalTrades * easeOut),
          volume: Math.floor(MOCK_STATS.totalVolume * easeOut),
          sellers: Math.floor(MOCK_STATS.totalSellers * easeOut)
        });

        currentStep++;
        if (currentStep > steps) {
          clearInterval(timer);
        }
      }, stepTime);
    };

    const timer = setTimeout(animateStats, 1000);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: Shield,
      title: "Trustless Escrow",
      description: "Smart contracts hold ERG until payment is verified by independent verifiers"
    },
    {
      icon: Zap,
      title: "Instant Trading",
      description: "Connect wallet, pick offer, pay seller, get ERG. Simple as that."
    },
    {
      icon: Users,
      title: "Decentralized",
      description: "No middleman, no KYC, no exchange risk. Pure peer-to-peer trading."
    },
    {
      icon: DollarSign,
      title: "Low Fees",
      description: "Only 1% network fee. No deposit, withdrawal or platform fees."
    }
  ];

  const steps = [
    { number: 1, title: "Connect Wallet", description: "Link your Nautilus wallet" },
    { number: 2, title: "Choose Offer", description: "Browse ERG sellers" },
    { number: 3, title: "Send Payment", description: "Pay via Revolut/Wise" },
    { number: 4, title: "Get ERG", description: "Verification complete, ERG sent to your wallet" }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 px-4">
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-emerald-200 bg-clip-text text-transparent">
                Buy ERG directly.
                <br />
                <span className="text-blue-400">No exchange.</span>
                <br />
                <span className="text-emerald-400">No middleman.</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                The first decentralized P2P ERG/fiat exchange with cryptographic verification.
                Trade ERG for fiat directly with sellers, secured by smart contracts.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/exchange">
                  <Button size="lg" className="text-lg px-8 py-4 h-auto group">
                    Start Trading
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                
                <Link href="/how-it-works">
                  <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto">
                    How It Works
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Floating orbs animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-64 h-64 rounded-full opacity-20 blur-3xl ${
                    i === 0 ? 'bg-blue-500' : i === 1 ? 'bg-emerald-500' : 'bg-purple-500'
                  }`}
                  animate={{
                    x: [0, 100, -100, 0],
                    y: [0, -100, 100, 0],
                  }}
                  transition={{
                    duration: 10 + i * 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${20 + i * 20}%`,
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 px-4">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="text-4xl font-bold text-blue-400 mb-2">
                  {formatNumber(animatedStats.trades)}
                </div>
                <div className="text-gray-400">Total Trades</div>
              </div>
              
              <div className="p-6">
                <div className="text-4xl font-bold text-emerald-400 mb-2">
                  {formatCurrency(animatedStats.volume)}
                </div>
                <div className="text-gray-400">Volume Traded</div>
              </div>
              
              <div className="p-6">
                <div className="text-4xl font-bold text-white mb-2">
                  {animatedStats.sellers}
                </div>
                <div className="text-gray-400">Active Sellers</div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              {...fadeInUp}
            >
              <h2 className="text-4xl font-bold mb-4">Why Choose Ergo Frontier?</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Experience the future of cryptocurrency trading with our secure, decentralized platform
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={stagger}
              initial="initial"
              animate="animate"
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div key={index} variants={fadeInUp}>
                    <Card className="h-full hover:border-blue-500/50 transition-all duration-300 group">
                      <CardHeader className="text-center">
                        <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/20 transition-colors">
                          <Icon className="w-8 h-8 text-blue-400" />
                        </div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-400 text-center">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-4 bg-navy-800/20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              {...fadeInUp}
            >
              <h2 className="text-4xl font-bold mb-4">Trading Made Simple</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Four steps to get ERG in your wallet. No registration, no KYC, no hassle.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="relative text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                  
                  {/* Arrow between steps */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 -right-4 text-gray-500">
                      <ChevronRight className="w-8 h-8" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="p-12 bg-gradient-to-br from-navy-800 to-navy-700 border-blue-500/20">
                <CardContent className="space-y-6">
                  <h2 className="text-3xl font-bold">Ready to Start Trading?</h2>
                  <p className="text-xl text-gray-300">
                    Join the decentralized revolution. Trade ERG securely with real people.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link href="/exchange">
                      <Button size="lg" className="text-lg px-8 py-4 h-auto group">
                        View Exchange
                        <TrendingUp className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                      </Button>
                    </Link>
                    <Link href="/sell">
                      <Button variant="emerald" size="lg" className="text-lg px-8 py-4 h-auto">
                        Start Selling
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}