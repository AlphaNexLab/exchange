import type { PaymentMethod } from "./constants";
import { AuthRequiredError, getSessionToken } from "./auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export interface ApiOffer {
  id: string;
  seller: string;
  amount: number;
  amountEth: string;
  pricePerAnx: number;
  pricePerEth: number;
  method: PaymentMethod;
  tag: string;
  rating: number;
  trades: number;
  status: string;
}

export interface ApiTrade {
  id: string;
  offerId: string;
  seller: string;
  buyer: string;
  amountEth: string;
  pricePerEth: number;
  method: string;
  tag: string;
  onChainTradeId: string;
  status: string;
  deadline: string | null;
  createTxHash: string | null;
  releaseTxHash: string | null;
  refundTxHash: string | null;
  createdAt: string;
  updatedAt: string;
}

async function request<T>(
  path: string,
  options: RequestInit & { auth?: boolean } = {}
): Promise<T> {
  const { auth = false, headers: initHeaders, ...rest } = options;
  const headers = new Headers(initHeaders);
  if (!headers.has("Content-Type") && rest.body) {
    headers.set("Content-Type", "application/json");
  }
  if (auth) {
    const token = getSessionToken();
    if (!token) {
      throw new AuthRequiredError("Authorization: Bearer <session token> required");
    }
    headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers,
  });

  const data = await res.json().catch(() => ({}));
  if (res.status === 401) {
    throw new AuthRequiredError(data.error || "Session expired or invalid");
  }
  if (!res.ok) {
    throw new Error(data.error || `API ${res.status}`);
  }
  return data as T;
}

export async function fetchOffers(): Promise<ApiOffer[]> {
  const data = await request<{ offers: ApiOffer[] }>("/offers");
  return data.offers;
}

export async function fetchOffer(id: string): Promise<ApiOffer> {
  const data = await request<{ offer: ApiOffer }>(`/offers/${id}`);
  return data.offer;
}

export async function createOffer(body: {
  amountEth: string | number;
  pricePerEth: number;
  method: PaymentMethod;
  tag: string;
}): Promise<ApiOffer> {
  const data = await request<{ offer: ApiOffer }>("/offers", {
    method: "POST",
    auth: true,
    body: JSON.stringify(body),
  });
  return data.offer;
}

export async function createTrade(body: {
  offerId: string;
  amountEth?: string | number;
}): Promise<ApiTrade> {
  const data = await request<{ trade: ApiTrade }>("/trades", {
    method: "POST",
    auth: true,
    body: JSON.stringify(body),
  });
  return data.trade;
}

export async function fetchTrade(id: string): Promise<ApiTrade> {
  const data = await request<{ trade: ApiTrade }>(`/trades/${id}`, {
    auth: true,
  });
  return data.trade;
}

export async function fetchMyTrades(
  role?: "buyer" | "seller"
): Promise<ApiTrade[]> {
  const qs = role ? `?role=${role}` : "";
  const data = await request<{ trades: ApiTrade[] }>(`/trades${qs}`, {
    auth: true,
  });
  return data.trades;
}

export async function markTradeFunded(
  tradeId: string,
  createTxHash: string
): Promise<ApiTrade> {
  const data = await request<{ trade: ApiTrade }>(`/trades/${tradeId}/funded`, {
    method: "POST",
    auth: true,
    body: JSON.stringify({ createTxHash }),
  });
  return data.trade;
}

export async function markTradePaid(tradeId: string): Promise<ApiTrade> {
  const data = await request<{ trade: ApiTrade }>(`/trades/${tradeId}/paid`, {
    method: "POST",
    auth: true,
  });
  return data.trade;
}

export { API_URL };
