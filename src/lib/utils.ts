import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount)
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`
  }
  return num.toString()
}

export function formatANX(amount: number): string {
  return `${amount.toLocaleString()} ANX`
}

export function calculateTotal(amount: number, pricePerAnx: number, networkFee = 0.01): number {
  const subtotal = amount * pricePerAnx
  return subtotal * (1 + networkFee)
}

export function truncateAddress(address: string, chars = 6): string {
  if (address.length <= chars * 2) return address
  return `${address.slice(0, chars)}...${address.slice(-3)}`
}