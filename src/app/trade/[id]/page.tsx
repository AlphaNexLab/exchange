import { MOCK_OFFERS } from '@/lib/constants';
import TradePageClient from '@/components/trade-page-client';

// Required for static export
export function generateStaticParams() {
  return MOCK_OFFERS.map((offer) => ({
    id: offer.id,
  }));
}

export default function TradePage() {
  return <TradePageClient />;
}