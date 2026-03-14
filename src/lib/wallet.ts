// EVM wallet helpers (address formatting + legacy stubs)

export class WalletError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'WalletError';
  }
}

export function truncateAddress(addr: string): string {
  if (!addr) return '';
  if (addr.length <= 12) return addr;
  return addr.slice(0, 6) + '...' + addr.slice(-4);
}

export function formatAddress(addr: string): string {
  return truncateAddress(addr);
}

/** @deprecated Prefer wagmi useBalance — kept for older call sites */
export function formatErg(weiOrNano: string | number): string {
  const n = typeof weiOrNano === 'string' ? Number(weiOrNano) : weiOrNano;
  if (!Number.isFinite(n)) return '0.00';
  return (n / 1e18).toFixed(4);
}

/** Demo stub — real txs go through wagmi/viem */
export async function mockSignAndSubmitTx(_txData: unknown): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return '0xf7a8b9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9';
}
