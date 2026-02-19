# Ergo Frontier Exchange

**Trade ERG. Peer to Peer. Trustless.**

The first decentralized P2P ERG/fiat exchange with cryptographic payment verification. No exchange. No middleman. Just math.

![Ergo Frontier Exchange](https://ergofrontier.com/preview.png)

## 🚀 Features

- **Trustless Trading**: Smart contract escrow ensures secure P2P ERG trades
- **Real Wallet Integration**: Connect your Nautilus wallet and see your real ERG balance
- **Decentralized Verification**: Independent verifiers cryptographically confirm fiat payments
- **Multiple Payment Methods**: Support for Revolut, Wise, and PayPal
- **Zero KYC**: No registration, no personal data, just connect and trade
- **Mobile Responsive**: Beautiful design that works perfectly on all devices

## 🛠 Tech Stack

- **Svelte** based on https://github.com/ergo-basics/template
- **Tailwind CSS** for stunning responsive design
- **Framer Motion** for smooth animations (if is compatible with svelte)
- **shadcn/ui** components
- **Nautilus Wallet Integration** via EIP-12 dApp connector
- **Static Export** for IPFS deployment

## 🎨 Design Philosophy

TODO: Remember, the brand theme is western. Check the logs, there is the color.
P.D: But i love the navy blue too ...

**LEGENDARY** - Every pixel crafted to perfection:
- Deep space navy backgrounds with subtle noise textures
- Electric blue accents for CTAs and active states
- Warm amber highlights honoring Ergo's heritage
- Smooth animations and micro-interactions
- Professional typography with perfect spacing

## 💼 How It Works

### For Buyers (Dead Simple):
1. **Connect Wallet** → Link your Nautilus wallet
2. **Pick Offer** → Browse verified sellers in the order book
3. **Send Payment** → Pay seller via Revolut/Wise/PayPal
4. **Get ERG** → Verification network confirms payment, ERG sent to your wallet

### For Sellers:
1. **List ERG** → Set amount, price, and payment method
2. **Lock in Escrow** → Smart contract secures your ERG
3. **Receive Orders** → Buyers send fiat directly to you
4. **Auto Release** → Verification confirms payment, ERG released automatically

## 🔐 Security

- **Smart Contract Escrow**: ERG locked until payment cryptographically verified
- **Distributed Verification**: 5 independent verifiers, 3/5 consensus required
- **Privacy Preserved**: Verifiers see transaction confirmation only, not account details
- **No Single Point of Failure**: Fully decentralized, unstoppable protocol

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+**
- **Nautilus Wallet** for real wallet integration (optional for development)

### Installation

```bash
# Clone the repository
git clone https://github.com/ergo-frontier/exchange.git
cd exchange

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Nautilus Wallet Integration

The app integrates with real Nautilus wallets:

- **Install Nautilus**: Download from [nautilus.io](https://nautilus.io)
- **Connect**: Click "Connect Wallet" to link your real ERG wallet
- **See Balance**: View your actual ERG balance and address
- **Trading**: Currently mock (secure P2P protocol coming soon)

Without Nautilus installed, the app gracefully degrades with helpful instructions.

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── page.tsx        # Landing page with animated hero
│   ├── exchange/       # Order book and trading interface
│   ├── sell/           # Create sell offers
│   ├── trade/[id]/     # Multi-step trading flow
│   └── how-it-works/   # Protocol explanation
├── components/
│   ├── ui/             # shadcn/ui components
│   └── navigation.tsx  # Navigation with wallet integration
└── lib/
    ├── wallet.ts       # Nautilus wallet connection
    ├── constants.ts    # Mock data and configuration
    └── utils.ts        # Utility functions
```

## 🎭 Mock Data vs Real Integration

**Current Status**: Beautiful, fully functional UI with real wallet connection

- ✅ **Real**: Nautilus wallet connection, live ERG balances
- ✅ **Real**: Explorer links, transaction formatting
- 🔄 **Mock**: Order book, trading flow, payment verification
- 🔄 **Coming**: Live order book, smart contract integration

## 🌐 Deployment

### Static Export (IPFS Ready)

```bash
npm run build  # Creates out/ directory
```

The built site is a completely static export, perfect for:
- **IPFS hosting**
- **GitHub Pages**
- **Netlify/Vercel**
- **Any static hosting**

### Environment

No environment variables needed - everything is client-side!

## 🎨 Design System

### Colors
- **Primary**: Deep space navy (`#0a0e1a`) with noise texture
- **Electric**: Brilliant blue (`#3b82f6`) for CTAs and focus states
- **Amber**: Warm gold (`#f59e0b`) honoring Ergo's heritage
- **Success**: Emerald green (`#10b981`) for confirmations
- **Text**: Crisp whites and muted slates

### Typography
- **Primary**: Inter for clean, modern readability
- **Mono**: JetBrains Mono for addresses and amounts
- **Hierarchy**: Bold headlines, medium weights, tight letter-spacing

### Animations
- **Micro-interactions**: Hover effects, button transforms
- **Page transitions**: Smooth fade-ins and slide animations
- **Verification flow**: Dramatic node-by-node confirmation sequence

## 🤝 Contributing

We welcome contributions! Please:

1. **Fork** the repository
2. **Create** a feature branch
3. **Build** something amazing
4. **Test** thoroughly
5. **Submit** a pull request

### Code Style
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **ESLint/Prettier** for formatting
- **Semantic** component names

## 📜 License

MIT License - see [LICENSE](LICENSE) for details.

## 🔗 Links

- **Website**: [ergofrontier.com](https://ergofrontier.com)
- **Ergo Platform**: [ergoplatform.org](https://ergoplatform.org)
- **Nautilus Wallet**: [nautilus.io](https://nautilus.io)
- **Explorer**: [sigmaspace.io](https://sigmaspace.io)

## 🙏 Acknowledgments

- **Ergo Platform** for the brilliant UTXO blockchain
- **Nautilus Team** for the excellent wallet
- **shadcn/ui** for beautiful component primitives
- **Framer Motion** for buttery smooth animations

---

**Built with ❤️ by the Ergo Frontier team**

*Unstoppable. Decentralized. Yours.*
