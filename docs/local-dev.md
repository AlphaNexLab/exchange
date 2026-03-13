# Local development

## Quick start

```bash
npm install
npm run dev
```

This starts:

- Next.js web app on [http://localhost:3000](http://localhost:3000)
- Fastify API on [http://localhost:4000](http://localhost:4000)

### Server layout

```
server/
  index.js                 # entry (npm run dev)
  app.js                   # Fastify bootstrap
  config/                  # env + constants
  middleware/              # SIWE session auth, error handler
  db/                      # JSON store + repositories (offers, trades, sessions)
  services/                # auth, offers, trades, escrow
  routes/                  # health, auth, offers, trades, admin
  abi/                     # contract ABI fragments
  utils/                   # mappers, http errors
```

Copy [`.env.example`](../.env.example) to `.env` at the repo root (already used by both Next and `server/index.js`).

## Environment

| Variable | Used by | Purpose |
|----------|---------|---------|
| `NEXT_PUBLIC_API_URL` | Web | API base URL (default `http://localhost:4000`) |
| `NEXT_PUBLIC_ESCROW_ADDRESS` | Web | Deployed `P2PEscrow` address |
| `NEXT_PUBLIC_CHAIN_ID` | Web | Chain id (Sepolia `11155111`) |
| `PORT` | API | API port (default `4000`) |
| `CORS_ORIGIN` | API | Allowed browser origin |
| `SIWE_DOMAIN` | API | EIP-4361 domain (default host of `SIWE_URI`) |
| `SIWE_URI` | API | EIP-4361 URI (default `CORS_ORIGIN`) |
| `CHAIN_ID` | API | Must match wallet chain used in SIWE |
| `RPC_URL` | API | Sepolia RPC |
| `ESCROW_ADDRESS` | API | Same escrow address for verifier txs + fund checks |
| `VERIFIER_PRIVATE_KEY` | API | EOA that is the contract `verifier` |
| `VERIFIER_API_KEY` | API | Header `x-verifier-key` for admin routes |

Without `ESCROW_ADDRESS` + `VERIFIER_PRIVATE_KEY`, release/refund and **fund checks** run in **mock mode** (any well-formed tx hash accepted when marking funded). Sellers can still “mark funded” from the UI for local demos.

## SIWE auth

Mutating trade/offer routes require a **session token**, not a raw address.

1. Connect an EVM wallet in the UI (MetaMask, etc.)
2. The app requests `GET /auth/nonce?address=…`, builds an EIP-4361 message, and asks you to sign
3. `POST /auth/verify` returns a token stored in `localStorage` (`alphanex_siwe_token`)
4. API calls send `Authorization: Bearer <token>`

Endpoints:

- `GET /auth/nonce?address=0x…`
- `POST /auth/verify` `{ message, signature }`
- `GET /auth/me`
- `POST /auth/logout`

`SIWE_DOMAIN` / `SIWE_URI` must match the browser origin (defaults: `localhost:3000` / `http://localhost:3000`). `CHAIN_ID` must match the wallet chain you sign with (Sepolia `11155111`).

## On-chain fund checks

When chain is enabled, `POST /trades/:id/funded` verifies:

1. Receipt exists and succeeded
2. `to` is `ESCROW_ADDRESS`
3. `trades(onChainTradeId)` matches seller, buyer, amount, and Active status

Fake hashes are rejected in this mode.

## Trade resume

- Start a trade from Exchange → `/trade/?offerId=…`
- After open, URL becomes `/trade/?tradeId=<uuid>` (shareable)
- Buyer or seller (after SIWE) can reopen that link; UI restores step from trade status
- Exchange shows **My open trades** for `open` / `funded` / `paid`
- Legacy `/trade/<id>` redirects to `?tradeId=`

## Contracts

```bash
cd contracts
npm install
npm test
# set VERIFIER_ADDRESS + SEPOLIA_* in contracts/.env
npm run deploy:sepolia
npm run abi:export
```

Layout:

```
contracts/
  src/escrow/           # Solidity (P2PEscrow, interfaces, errors)
  test/helpers|unit/    # fixtures + unit tests
  scripts/deploy|lib/   # deploy scripts
  config/               # networks + solidity profiles
  ignition/modules/     # Hardhat Ignition
  abi/                  # exported ABI
  deployments/          # network address files
```

Put the deployed address into root `.env` as `ESCROW_ADDRESS` and `NEXT_PUBLIC_ESCROW_ADDRESS`.

## Verifier

After the buyer marks paid:

```bash
curl -X POST http://localhost:4000/admin/trades/<TRADE_ID>/verify \
  -H "x-verifier-key: dev-verifier-key"
```

## Smoke checklist

1. `npm run dev` — web + API up
2. Connect wallet → approve SIWE signature
3. Create sell offer or open a trade from Exchange
4. Copy trade link → open in another session / as seller → resume funding
5. With escrow configured: fund on-chain → API accepts only a real `createTrade` receipt
6. Mark paid → admin verify → released
