/* ============================================================
   PaperclipGo v3.0 Super — Core Client-Side Application Engine
   100% LocalStorage Privacy | Transparent Math | 4-Layer Price Feed
   ============================================================ */

(function () {
  'use strict';

  const STORAGE_KEY_HOLDINGS = 'paperclip_holdings';
  const STORAGE_KEY_PRICES   = 'paperclip_cached_prices';
  const STORAGE_KEY_FIAT     = 'paperclip_fiat_currency';
  const STORAGE_KEY_PRO      = 'paperclip_pro_supporter_key';

  const COIN_UNIVERSE = [
  {
    "id": "bitcoin",
    "sym": "BTC",
    "name": "Bitcoin",
    "price": 68450.0,
    "cat": "Store-of-Value Layer-1",
    "thesis": "digital gold and institutional reserve asset with a fixed 21 million supply cap"
  },
  {
    "id": "ethereum",
    "sym": "ETH",
    "name": "Ethereum",
    "price": 2640.0,
    "cat": "Smart Contract Layer-1",
    "thesis": "programmable settlement layer powering decentralized finance (DeFi) and tokenized assets"
  },
  {
    "id": "solana",
    "sym": "SOL",
    "name": "Solana",
    "price": 176.5,
    "cat": "High-Throughput Layer-1",
    "thesis": "high-speed, low-fee monolithic blockchain optimized for consumer apps and decentralized exchanges"
  },
  {
    "id": "ripple",
    "sym": "XRP",
    "name": "XRP",
    "price": 0.545,
    "cat": "Cross-Border Settlement",
    "thesis": "enterprise liquidity and instant cross-border payment bridge asset"
  },
  {
    "id": "binancecoin",
    "sym": "BNB",
    "name": "BNB",
    "price": 592.0,
    "cat": "Exchange & Smart Chain Utility",
    "thesis": "native gas and fee-discount asset powering the BNB Chain ecosystem"
  },
  {
    "id": "dogecoin",
    "sym": "DOGE",
    "name": "Dogecoin",
    "price": 0.142,
    "cat": "Proof-of-Work Community Currency",
    "thesis": "peer-to-peer digital currency driven by high retail liquidity and social adoption"
  },
  {
    "id": "cardano",
    "sym": "ADA",
    "name": "Cardano",
    "price": 0.358,
    "cat": "Peer-Reviewed Layer-1",
    "thesis": "research-driven Proof-of-Stake blockchain utilizing the extended UTXO accounting model"
  },
  {
    "id": "tron",
    "sym": "TRX",
    "name": "TRON",
    "price": 0.165,
    "cat": "Stablecoin Settlement Layer-1",
    "thesis": "high-volume global settlement network for USDT and peer-to-peer transfers"
  },
  {
    "id": "avalanche-2",
    "sym": "AVAX",
    "name": "Avalanche",
    "price": 27.8,
    "cat": "Subnet Layer-1 Architecture",
    "thesis": "customizable multi-chain network built for institutional subnets and rapid finality"
  },
  {
    "id": "chainlink",
    "sym": "LINK",
    "name": "Chainlink",
    "price": 11.9,
    "cat": "Decentralized Oracle Network",
    "thesis": "essential middleware connecting smart contracts to real-world market data and cross-chain interoperability (CCIP)"
  },
  {
    "id": "the-open-network",
    "sym": "TON",
    "name": "Toncoin",
    "price": 5.12,
    "cat": "Consumer Messaging Layer-1",
    "thesis": "scalable blockchain integrated with Telegram mini-apps and consumer wallets"
  },
  {
    "id": "shiba-inu",
    "sym": "SHIB",
    "name": "Shiba Inu",
    "price": 1.82e-05,
    "cat": "Community Ecosystem Token",
    "thesis": "high-volatility community token supported by the Shibarium Layer-2 network"
  },
  {
    "id": "polkadot",
    "sym": "DOT",
    "name": "Polkadot",
    "price": 4.35,
    "cat": "Interoperable Multichain Layer-0",
    "thesis": "shared-security relay chain connecting specialized sovereign parachains"
  },
  {
    "id": "bitcoin-cash",
    "sym": "BCH",
    "name": "Bitcoin Cash",
    "price": 368.0,
    "cat": "Peer-to-Peer Electronic Cash",
    "thesis": "low-fee, larger-block Proof-of-Work network focused on fast merchant payments"
  },
  {
    "id": "sui",
    "sym": "SUI",
    "name": "Sui",
    "price": 2.05,
    "cat": "Move-Based Parallel Layer-1",
    "thesis": "object-centric blockchain utilizing parallel transaction execution for sub-second finality"
  },
  {
    "id": "litecoin",
    "sym": "LTC",
    "name": "Litecoin",
    "price": 71.4,
    "cat": "Scrypt Proof-of-Work Payment Network",
    "thesis": "battle-tested payment network with 2.5-minute block times and an 84 million supply cap"
  },
  {
    "id": "near",
    "sym": "NEAR",
    "name": "NEAR Protocol",
    "price": 4.78,
    "cat": "Sharded AI & Web3 Layer-1",
    "thesis": "Nightshade-sharded blockchain focused on chain abstraction and AI-native consumer apps"
  },
  {
    "id": "uniswap",
    "sym": "UNI",
    "name": "Uniswap",
    "price": 7.85,
    "cat": "Decentralized Exchange Governance",
    "thesis": "automated market maker (AMM) liquidity protocol governing on-chain token swaps"
  },
  {
    "id": "pepe",
    "sym": "PEPE",
    "name": "Pepe",
    "price": 9.8e-06,
    "cat": "ERC-20 Momentum Asset",
    "thesis": "zero-tax Ethereum meme asset frequently used as a high-beta gauge of retail market sentiment"
  },
  {
    "id": "aptos",
    "sym": "APT",
    "name": "Aptos",
    "price": 10.15,
    "cat": "Move Smart Contract Layer-1",
    "thesis": "Block-STM parallel execution blockchain designed for high-frequency financial applications"
  },
  {
    "id": "internet-computer",
    "sym": "ICP",
    "name": "Internet Computer",
    "price": 8.2,
    "cat": "Full-Stack Decentralized Cloud",
    "thesis": "canister-based protocol capable of hosting full web applications and AI models directly on-chain"
  },
  {
    "id": "kaspa",
    "sym": "KAS",
    "name": "Kaspa",
    "price": 0.134,
    "cat": "BlockDAG Proof-of-Work",
    "thesis": "GHOSTDAG protocol enabling ultra-fast block intervals while preserving pure Proof-of-Work security"
  },
  {
    "id": "ethereum-classic",
    "sym": "ETC",
    "name": "Ethereum Classic",
    "price": 19.4,
    "cat": "Proof-of-Work Smart Contracts",
    "thesis": "original immutable Proof-of-Work Ethereum chain with a fixed monetary policy"
  },
  {
    "id": "monero",
    "sym": "XMR",
    "name": "Monero",
    "price": 158.0,
    "cat": "Privacy-Preserving Digital Cash",
    "thesis": "default-private cryptocurrency utilizing ring signatures and stealth addresses for fungible transactions"
  },
  {
    "id": "stellar",
    "sym": "XLM",
    "name": "Stellar",
    "price": 0.096,
    "cat": "Cross-Border Remittance Network",
    "thesis": "decentralized payment network connecting fiat anchors, banks, and global remittance corridors"
  },
  {
    "id": "render-token",
    "sym": "RNDR",
    "name": "Render",
    "price": 5.45,
    "cat": "Decentralized GPU Compute (DePIN)",
    "thesis": "distributed GPU rendering and AI compute marketplace connecting idle hardware with creators"
  },
  {
    "id": "hedera-hashgraph",
    "sym": "HBAR",
    "name": "Hedera",
    "price": 0.054,
    "cat": "Enterprise Hashgraph Consensus",
    "thesis": "asynchronous Byzantine Fault Tolerant (aBFT) network governed by global enterprise council members"
  },
  {
    "id": "cosmos",
    "sym": "ATOM",
    "name": "Cosmos",
    "price": 4.62,
    "cat": "Inter-Blockchain Communication (IBC)",
    "thesis": "hub-and-zone ecosystem enabling sovereign appchains to communicate natively"
  },
  {
    "id": "arbitrum",
    "sym": "ARB",
    "name": "Arbitrum",
    "price": 0.56,
    "cat": "Ethereum Optimistic Rollup Layer-2",
    "thesis": "leading Ethereum scaling solution reducing gas fees while inheriting Ethereum base-layer security"
  },
  {
    "id": "filecoin",
    "sym": "FIL",
    "name": "Filecoin",
    "price": 3.75,
    "cat": "Decentralized Storage Network (DePIN)",
    "thesis": "cryptographic proof-of-storage marketplace incentivizing global archival and cloud data hosting"
  },
  {
    "id": "mantle",
    "sym": "MNT",
    "name": "Mantle",
    "price": 0.61,
    "cat": "Modular Ethereum Layer-2",
    "thesis": "treasury-backed modular rollup combining optimistic execution with specialized data availability"
  },
  {
    "id": "crypto-com-chain",
    "sym": "CRO",
    "name": "Cronos",
    "price": 0.078,
    "cat": "EVM-Compatible Exchange Chain",
    "thesis": "Cosmos-SDK and EVM-compatible network bridging retail exchange users to DeFi"
  },
  {
    "id": "immutable-x",
    "sym": "IMX",
    "name": "Immutable",
    "price": 1.48,
    "cat": "Web3 Gaming Layer-2",
    "thesis": "zero-knowledge rollup built specifically for gas-free NFT minting and high-speed gaming economies"
  },
  {
    "id": "vechain",
    "sym": "VET",
    "name": "VeChain",
    "price": 0.023,
    "cat": "Enterprise Supply Chain & RWA",
    "thesis": "dual-token enterprise blockchain tracking supply chain provenance and sustainability data"
  },
  {
    "id": "injective-protocol",
    "sym": "INJ",
    "name": "Injective",
    "price": 20.8,
    "cat": "On-Chain Orderbook Finance Layer-1",
    "thesis": "MEV-resistant financial blockchain built for decentralized derivatives, spot orderbooks, and RWAs"
  },
  {
    "id": "optimism",
    "sym": "OP",
    "name": "Optimism",
    "price": 1.68,
    "cat": "Superchain Layer-2 Ecosystem",
    "thesis": "OP Stack rollup framework powering an interconnected Superchain of Ethereum Layer-2 networks"
  },
  {
    "id": "celestia",
    "sym": "TIA",
    "name": "Celestia",
    "price": 5.9,
    "cat": "Modular Data Availability Network",
    "thesis": "first modular data availability (DA) layer using data availability sampling to scale custom rollups"
  },
  {
    "id": "arweave",
    "sym": "AR",
    "name": "Arweave",
    "price": 18.9,
    "cat": "Permanent Data Storage (Permaweb)",
    "thesis": "endowment-backed blockweave protocol offering pay-once, store-forever decentralized data permanence"
  },
  {
    "id": "blockstack",
    "sym": "STX",
    "name": "Stacks",
    "price": 1.79,
    "cat": "Bitcoin Smart Contract Layer",
    "thesis": "Proof-of-Transfer (PoX) layer bringing Clarity smart contracts and DeFi directly to Bitcoin finality"
  },
  {
    "id": "pax-gold",
    "sym": "PAXG",
    "name": "PAX Gold",
    "price": 2735.0,
    "cat": "100% Commodity-Backed (Redeemable at NAV)",
    "thesis": "allocated London Good Delivery physical gold bar token custodied under NYDFS/OCC oversight, redeemable at physical NAV"
  }
];

  const FIAT_RATES = {
    usd: { symbol: '$', rate: 1.0, code: 'USD' },
    eur: { symbol: '€', rate: 0.92, code: 'EUR' },
    gbp: { symbol: '£', rate: 0.77, code: 'GBP' },
    cad: { symbol: 'C$', rate: 1.38, code: 'CAD' },
    aud: { symbol: 'A$', rate: 1.51, code: 'AUD' }
  };

  let state = {
    holdings: [],
    prices: {},
    fiat: localStorage.getItem(STORAGE_KEY_FIAT) || 'usd',
    scenarioPct: 0,
    compareGoldAnchor: false,
    proUnlocked: Boolean(localStorage.getItem(STORAGE_KEY_PRO))
  };

  // Initialize static fallback prices first (Layer 4)
  COIN_UNIVERSE.forEach(c => {
    state.prices[c.id] = { usd: c.price, change24h: 0 };
  });

  function loadHoldings() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_HOLDINGS);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          state.holdings = parsed;
          return;
        }
      }
    } catch (e) {}
    // Default starter demo portfolio in localStorage
    state.holdings = [
      { id: 'bitcoin', qty: 0.15, paidUsd: 8250, date: '2026-01-15' },
      { id: 'ethereum', qty: 1.5, paidUsd: 3450, date: '2026-03-10' },
      { id: 'solana', qty: 15, paidUsd: 1950, date: '2026-06-01' },
      { id: 'pax-gold', qty: 0.5, paidUsd: 1250, date: '2026-07-20' }
    ];
  }

  function saveHoldings() {
    try {
      localStorage.setItem(STORAGE_KEY_HOLDINGS, JSON.stringify(state.holdings));
    } catch (e) {}
  }

  // 4-Layer Price Resolution Engine
  async function fetchPrices() {
    const ids = COIN_UNIVERSE.map(c => c.id).join(',');
    const statusEl = document.getElementById('price-feed-status');

    // Layer 1: Local Hardened PHP Proxy
    try {
      const res = await fetch(`api/market.php?ids=${encodeURIComponent(ids)}&vs_currencies=usd`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data && data.bitcoin && data.bitcoin.usd) {
          applyPricePayload(data, 'Live (Anonymous Proxy)');
          return;
        }
      }
    } catch (e) {}

    // Layer 2: Direct Public CoinGecko API
    try {
      const res2 = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(ids)}&vs_currencies=usd&include_24hr_change=true`);
      if (res2.ok) {
        const data2 = await res2.json();
        if (data2 && data2.bitcoin && data2.bitcoin.usd) {
          applyPricePayload(data2, 'Live (Direct Feed)');
          return;
        }
      }
    } catch (e) {}

    // Layer 3: LocalStorage Cached Prices
    try {
      const cached = localStorage.getItem(STORAGE_KEY_PRICES);
      if (cached) {
        const parsed = JSON.parse(cached);
        applyPricePayload(parsed, 'Cached Local Feed', false);
        return;
      }
    } catch (e) {}

    // Layer 4: Static Offline Matrix (Already preloaded)
    if (statusEl) statusEl.textContent = 'Offline Snapshot Matrix';
    renderAll();
  }

  function applyPricePayload(data, label, persist = true) {
    Object.keys(data).forEach(id => {
      if (data[id] && typeof data[id].usd === 'number') {
        state.prices[id] = {
          usd: data[id].usd,
          change24h: data[id].usd_24h_change || 0
        };
      }
    });
    if (persist) {
      try { localStorage.setItem(STORAGE_KEY_PRICES, JSON.stringify(data)); } catch (e) {}
    }
    const statusEl = document.getElementById('price-feed-status');
    if (statusEl) statusEl.textContent = label;
    renderAll();
  }

  // Live Fear & Greed Sentiment Engine
  async function fetchSentiment() {
    const textEl = document.getElementById('sentiment-text');
    try {
      const res = await fetch('https://api.alternative.me/fng/?limit=1');
      if (res.ok) {
        const json = await res.json();
        if (json && json.data && json.data[0]) {
          const val = parseInt(json.data[0].value, 10);
          const cls = json.data[0].value_classification;
          if (textEl) textEl.textContent = `Sentiment: ${val} (${cls})`;
        }
      }
    } catch (e) {}
  }

  function fmtMoney(usdAmount) {
    const f = FIAT_RATES[state.fiat] || FIAT_RATES.usd;
    const val = (Number(usdAmount) || 0) * f.rate;
    const sign = val < 0 ? '-' : '';
    const absVal = Math.abs(val);
    return `${sign}${f.symbol}${absVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  function getCoinMeta(id) {
    return COIN_UNIVERSE.find(c => c.id === id) || { id, sym: id.toUpperCase(), name: id, price: 1, cat: 'Crypto Asset' };
  }

  function computeSummary() {
    let totalPaidUsd = 0;
    let totalCurrentUsd = 0;

    const rows = state.holdings.map((h, idx) => {
      const meta = getCoinMeta(h.id);
      const livePriceUsd = (state.prices[h.id] && state.prices[h.id].usd) ? state.prices[h.id].usd : meta.price;
      const qty = Math.max(0, Number(h.qty) || 0);
      const paidUsd = Math.max(0, Number(h.paidUsd) || 0);
      const currentUsd = qty * livePriceUsd;
      const avgCostUsd = qty > 0 ? (paidUsd / qty) : 0;
      const pnlUsd = currentUsd - paidUsd;
      const pnlPct = paidUsd > 0 ? ((pnlUsd / paidUsd) * 100) : 0;

      totalPaidUsd += paidUsd;
      totalCurrentUsd += currentUsd;

      return {
        idx,
        id: h.id,
        sym: meta.sym,
        name: meta.name,
        cat: meta.cat,
        isCommodityNav: h.id === 'pax-gold',
        qty,
        paidUsd,
        avgCostUsd,
        livePriceUsd,
        currentUsd,
        pnlUsd,
        pnlPct,
        date: h.date || '2026-10-25'
      };
    });

    const totalPnlUsd = totalCurrentUsd - totalPaidUsd;
    const totalPnlPct = totalPaidUsd > 0 ? ((totalPnlUsd / totalPaidUsd) * 100) : 0;
    const scenarioMultiplier = 1 + (state.scenarioPct / 100);
    const scenarioTotalUsd = totalCurrentUsd * scenarioMultiplier;
    const scenarioNetPnlUsd = scenarioTotalUsd - totalPaidUsd;

    // Real-Asset Anchor comparison (PAX Gold + 4.5% annualized T-bill dampener)
    const goldAnchorMultiplier = 1 + (state.scenarioPct * 0.18 / 100) + 0.045;
    const goldAnchorUsd = totalCurrentUsd * goldAnchorMultiplier;

    return {
      rows,
      totalPaidUsd,
      totalCurrentUsd,
      totalPnlUsd,
      totalPnlPct,
      scenarioTotalUsd,
      scenarioNetPnlUsd,
      goldAnchorUsd
    };
  }

  function renderAll() {
    const summary = computeSummary();

    // Update Top KPI Ribbon
    const elCur = document.getElementById('kpi-current-val');
    const elPaid = document.getElementById('kpi-cost-basis');
    const elPnl = document.getElementById('kpi-unrealized-pnl');
    const elPnlSub = document.getElementById('kpi-pnl-pct');
    const elScen = document.getElementById('kpi-scenario-val');
    const elScenSub = document.getElementById('kpi-scenario-sub');

    if (elCur) elCur.textContent = fmtMoney(summary.totalCurrentUsd);
    if (elPaid) elPaid.textContent = fmtMoney(summary.totalPaidUsd);
    if (elPnl) {
      elPnl.textContent = (summary.totalPnlUsd >= 0 ? '+' : '') + fmtMoney(summary.totalPnlUsd);
      elPnl.className = 'kpi-value ' + (summary.totalPnlUsd >= 0 ? 'pos' : 'neg');
    }
    if (elPnlSub) {
      elPnlSub.textContent = `${summary.totalPnlPct >= 0 ? '+' : ''}${summary.totalPnlPct.toFixed(2)}% vs. cost basis`;
    }
    if (elScen) {
      elScen.textContent = fmtMoney(summary.scenarioTotalUsd);
    }
    if (elScenSub) {
      const sign = state.scenarioPct >= 0 ? '+' : '';
      elScenSub.textContent = state.compareGoldAnchor
        ? `At ${sign}${state.scenarioPct}% | Gold/T-Bill Anchor: ${fmtMoney(summary.goldAnchorUsd)}`
        : `At ${sign}${state.scenarioPct}% market move (${summary.scenarioNetPnlUsd >= 0 ? '+' : ''}${fmtMoney(summary.scenarioNetPnlUsd)} net)`;
    }

    // Render Holdings Table
    const tbody = document.getElementById('holdings-tbody');
    if (tbody) {
      tbody.innerHTML = summary.rows.map(r => `
        <tr>
          <td>
            <strong>${r.name}</strong> <span style="opacity:0.7;">(${r.sym})</span>
            ${r.isCommodityNav ? '<span class="nav-badge" title="100% Commodity-Backed (Redeemable at NAV)">NAV Gold</span>' : ''}
          </td>
          <td>${r.qty.toLocaleString('en-US', { maximumFractionDigits: 6 })}</td>
          <td>${fmtMoney(r.avgCostUsd)}</td>
          <td>${fmtMoney(r.livePriceUsd)}</td>
          <td><strong>${fmtMoney(r.currentUsd)}</strong></td>
          <td class="${r.pnlUsd >= 0 ? 'pos' : 'neg'}">
            ${r.pnlUsd >= 0 ? '+' : ''}${fmtMoney(r.pnlUsd)} (${r.pnlPct >= 0 ? '+' : ''}${r.pnlPct.toFixed(1)}%)
          </td>
          <td>
            <button class="preset-chip" data-remove="${r.idx}" aria-label="Remove ${r.name}">✕</button>
          </td>
        </tr>
      `).join('');

      tbody.querySelectorAll('[data-remove]').forEach(btn => {
        btn.addEventListener('click', () => {
          const i = parseInt(btn.getAttribute('data-remove'), 10);
          state.holdings.splice(i, 1);
          saveHoldings();
          renderAll();
        });
      });
    }

    renderContextualMonetization(summary);
    drawPortfolioCanvas(summary);
  }

  // Interactive HTML5 Canvas Chart (Allocation & Scenario Curve)
  function drawPortfolioCanvas(summary) {
    const canvas = document.getElementById('portfolio-canvas');
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Background
    ctx.fillStyle = '#0d1320';
    ctx.fillRect(0, 0, w, h);

    // Draw Scenario Bar Comparison (-50%, -25%, 0%, +25%, +50%, +100%)
    const steps = [-50, -25, 0, state.scenarioPct, 50, 100];
    const uniqueSteps = Array.from(new Set(steps)).sort((a, b) => a - b);
    const maxVal = Math.max(summary.totalCurrentUsd * 2.05, summary.totalPaidUsd * 1.2, 100);
    const padLeft = 58;
    const padBottom = 34;
    const padTop = 28;
    const chartW = w - padLeft - 20;
    const chartH = h - padBottom - padTop;

    // Cost basis reference line
    const costY = padTop + chartH - Math.min(chartH, (summary.totalPaidUsd / maxVal) * chartH);
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.65)';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(padLeft, costY);
    ctx.lineTo(w - 16, costY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#f59e0b';
    ctx.font = '11px sans-serif';
    ctx.fillText('Cost Basis: ' + fmtMoney(summary.totalPaidUsd), padLeft + 6, Math.max(14, costY - 6));

    const barW = Math.min(54, (chartW / uniqueSteps.length) - 14);
    uniqueSteps.forEach((pct, i) => {
      const val = summary.totalCurrentUsd * (1 + pct / 100);
      const barH = Math.max(6, (val / maxVal) * chartH);
      const x = padLeft + i * (chartW / uniqueSteps.length) + 10;
      const y = padTop + chartH - barH;

      if (pct === state.scenarioPct) {
        ctx.fillStyle = '#3b82f6';
      } else if (val >= summary.totalPaidUsd) {
        ctx.fillStyle = '#10b981';
      } else {
        ctx.fillStyle = '#f43f5e';
      }

      ctx.fillRect(x, y, barW, barH);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      const lbl = (pct >= 0 ? '+' : '') + pct + '%';
      ctx.fillText(lbl, x + 4, h - 12);
    });
  }

  // Generate Masked Shareable Social PNG Card (Client-Side Canvas)
  function downloadScenarioCard() {
    const summary = computeSummary();
    const c = document.createElement('canvas');
    c.width = 800;
    c.height = 420;
    const ctx = c.getContext('2d');

    const grad = ctx.createLinearGradient(0, 0, 800, 420);
    grad.addColorStop(0, '#0f172a');
    grad.addColorStop(1, '#1e1b4b');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 800, 420);

    ctx.strokeStyle = 'rgba(59,130,246,0.45)';
    ctx.lineWidth = 3;
    ctx.strokeRect(18, 18, 764, 384);

    ctx.fillStyle = '#93c5fd';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText('PAPERCLIPGO.COM — VERIFIED SCENARIO SNAPSHOT', 45, 62);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 38px sans-serif';
    const roiSign = summary.totalPnlPct >= 0 ? '+' : '';
    ctx.fillText(`Portfolio ROI: ${roiSign}${summary.totalPnlPct.toFixed(2)}%`, 45, 130);

    const scenSign = state.scenarioPct >= 0 ? '+' : '';
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText(`Stress-Test Scenario (${scenSign}${state.scenarioPct}% Move): ${fmtMoney(summary.scenarioTotalUsd)}`, 45, 185);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '18px sans-serif';
    const topCoins = summary.rows.slice(0, 4).map(r => r.sym).join(' • ');
    ctx.fillText(`Tracked Assets: ${topCoins || 'BTC • ETH'}`, 45, 245);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '15px sans-serif';
    ctx.fillText('100% Client-Side Math • Zero Login • Calculate yours at https://paperclipgo.com', 45, 365);

    const link = document.createElement('a');
    link.download = 'paperclipgo-scenario-card.png';
    link.href = c.toDataURL('image/png');
    link.click();
  }

  // Local-Only Contextual Monetization & Partner Rendering
  function renderContextualMonetization(summary, csvJustExported = false) {
    const cfg = window.PCG_MONETIZATION;
    if (!cfg) return;

    // 1. Contextual Tip Bar (Only 1 most relevant tip shown at a time)
    const tipContainer = document.getElementById('contextual-tip-slot');
    if (tipContainer) {
      if (csvJustExported || summary.totalPnlUsd > 1000) {
        tipContainer.innerHTML = `
          <div class="contextual-tip">
            <span><strong>Tax-Lot Notice:</strong> Your portfolio shows <strong>${fmtMoney(summary.totalPnlUsd)}</strong> in unrealized gains. Import your PaperclipGo FIFO CSV into Koinly to preview Form 8949 tax liability.</span>
            <a href="https://koinly.io/" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">Preview Tax Report &rarr;</a>
          </div>`;
      } else if (summary.totalCurrentUsd >= 2500) {
        tipContainer.innerHTML = `
          <div class="contextual-tip">
            <span><strong>Self-Custody Advisory:</strong> Holding over <strong>$2,500</strong> on exchanges carries custody risk. Compare offline hardware wallets (calculated 100% locally in your browser).</span>
            <a href="https://shop.ledger.com/" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">Compare Hardware Wallets &rarr;</a>
          </div>`;
      } else {
        tipContainer.innerHTML = '';
      }
    }

    // 2. Render Partner Cards Grid
    const grid = document.getElementById('partner-cards-grid');
    if (grid && cfg.affiliates && cfg.affiliates.enabled) {
      grid.innerHTML = cfg.affiliates.items.map(item => {
        const highlight = (item.triggerMinPortfolioUsd && summary.totalCurrentUsd >= item.triggerMinPortfolioUsd) ||
                          (item.triggerOnCsvExport && csvJustExported);
        return `
          <div class="partner-card ${highlight ? 'highlighted' : ''}">
            <div>
              <div class="partner-badge">${item.badge}</div>
              <h3 style="font-size:1rem;margin-bottom:0.4rem;">${item.title}</h3>
              <p style="font-size:0.84rem;color:var(--text-muted);margin-bottom:1rem;">${item.description}</p>
            </div>
            <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">${item.ctaText}</a>
          </div>
        `;
      }).join('');
    }
  }

  function injectStaticAds() {
    const cfg = window.PCG_MONETIZATION;
    if (!cfg || !cfg.ads || !cfg.ads.enabled || state.proUnlocked) return;
    const inlineSlot = document.getElementById('ad-slot-inline');
    const footerSlot = document.getElementById('ad-slot-footer');
    if (inlineSlot && cfg.ads.custom.inline) inlineSlot.innerHTML = cfg.ads.custom.inline;
    if (footerSlot && cfg.ads.custom.footer) footerSlot.innerHTML = cfg.ads.custom.footer;
  }

  // FIFO Cost-Basis CSV Exporter
  function exportFifoCsv() {
    const summary = computeSummary();
    const headers = ['Date', 'Asset', 'Symbol', 'Quantity', 'Total_Cost_Basis_USD', 'Avg_Buy_Price_USD', 'Current_Price_USD', 'Current_Value_USD', 'Unrealized_PnL_USD', 'ROI_Percent'];
    const lines = [headers.join(',')];
    summary.rows.forEach(r => {
      lines.push([
        r.date,
        `"${r.name}"`,
        r.sym,
        r.qty,
        r.paidUsd.toFixed(2),
        r.avgCostUsd.toFixed(4),
        r.livePriceUsd.toFixed(4),
        r.currentUsd.toFixed(2),
        r.pnlUsd.toFixed(2),
        r.pnlPct.toFixed(2)
      ].join(','));
    });
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `paperclipgo-fifo-export-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    renderContextualMonetization(summary, true);
  }

  // DCA Planner Calculator
  function runDcaCalculation() {
    const coinId = document.getElementById('dca-coin').value;
    const weeklyUsd = Math.max(1, Number(document.getElementById('dca-amount').value) || 100);
    const months = Math.max(1, Number(document.getElementById('dca-months').value) || 12);
    const expectedApr = Number(document.getElementById('dca-growth').value) || 25;

    const weeks = Math.round(months * 4.33);
    const totalInvested = weeklyUsd * weeks;
    const weeklyRate = (expectedApr / 100) / 52;
    let fv = 0;
    for (let w = 0; w < weeks; w++) {
      fv = (fv + weeklyUsd) * (1 + weeklyRate);
    }
    const profit = fv - totalInvested;
    const meta = getCoinMeta(coinId);
    const livePrice = (state.prices[coinId] && state.prices[coinId].usd) ? state.prices[coinId].usd : meta.price;
    const estCoins = fv / livePrice;

    const out = document.getElementById('dca-output');
    if (out) {
      out.innerHTML = `
        <div class="kpi-grid" style="margin-top:1rem;">
          <div class="kpi-card">
            <div class="kpi-label">Total Contributed (${weeks} wks)</div>
            <div class="kpi-value">${fmtMoney(totalInvested)}</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">Projected ${meta.sym} Value</div>
            <div class="kpi-value pos">${fmtMoney(fv)}</div>
            <div class="kpi-sub">≈ ${estCoins.toFixed(4)} ${meta.sym} accumulated</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">Net Compounded Gain</div>
            <div class="kpi-value ${profit >= 0 ? 'pos' : 'neg'}">${profit >= 0 ? '+' : ''}${fmtMoney(profit)}</div>
          </div>
        </div>
      `;
    }
  }

  // Historical / Custom Backtester
  function runBacktestCalculation() {
    const coinId = document.getElementById('bt-coin').value;
    const lumpUsd = Math.max(10, Number(document.getElementById('bt-amount').value) || 1000);
    const entryPrice = Math.max(0.0000001, Number(document.getElementById('bt-entry-price').value) || 25000);
    const meta = getCoinMeta(coinId);
    const livePrice = (state.prices[coinId] && state.prices[coinId].usd) ? state.prices[coinId].usd : meta.price;

    const tokensBought = lumpUsd / entryPrice;
    const currentVal = tokensBought * livePrice;
    const netProfit = currentVal - lumpUsd;
    const roi = ((currentVal - lumpUsd) / lumpUsd) * 100;

    const out = document.getElementById('bt-output');
    if (out) {
      out.innerHTML = `
        <div class="kpi-grid" style="margin-top:1rem;">
          <div class="kpi-card">
            <div class="kpi-label">Tokens Accumulated</div>
            <div class="kpi-value">${tokensBought.toLocaleString('en-US', { maximumFractionDigits: 4 })} ${meta.sym}</div>
            <div class="kpi-sub">At ${fmtMoney(entryPrice)} entry vs. ${fmtMoney(livePrice)} today</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">Current Position Value</div>
            <div class="kpi-value ${netProfit >= 0 ? 'pos' : 'neg'}">${fmtMoney(currentVal)}</div>
            <div class="kpi-sub">${netProfit >= 0 ? '+' : ''}${fmtMoney(netProfit)} (${roi >= 0 ? '+' : ''}${roi.toFixed(2)}%)</div>
          </div>
        </div>
      `;
    }
  }

  function populateSelects() {
    const selects = ['add-coin-select', 'dca-coin', 'bt-coin'];
    const optionsHtml = COIN_UNIVERSE.map(c => `<option value="${c.id}">${c.name} (${c.sym})</option>`).join('');
    selects.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = optionsHtml;
    });

    // Check URL query parameter ?coin=
    const params = new URLSearchParams(window.location.search);
    const preCoin = params.get('coin');
    if (preCoin && COIN_UNIVERSE.some(c => c.id === preCoin)) {
      const addSel = document.getElementById('add-coin-select');
      if (addSel) addSel.value = preCoin;
    }
  }

  function bindEvents() {
    // Add Holding Form
    const addForm = document.getElementById('add-holding-form');
    if (addForm) {
      addForm.addEventListener('submit', e => {
        e.preventDefault();
        const id = document.getElementById('add-coin-select').value;
        const qty = parseFloat(document.getElementById('add-qty').value);
        const paidUsd = parseFloat(document.getElementById('add-paid').value);
        if (!id || isNaN(qty) || qty <= 0 || isNaN(paidUsd) || paidUsd < 0) return;
        state.holdings.push({ id, qty, paidUsd, date: new Date().toISOString().slice(0, 10) });
        saveHoldings();
        document.getElementById('add-qty').value = '';
        document.getElementById('add-paid').value = '';
        renderAll();
      });
    }

    // Scenario Slider & Presets
    const slider = document.getElementById('scenario-slider');
    const sliderVal = document.getElementById('scenario-slider-label');
    if (slider) {
      slider.addEventListener('input', () => {
        state.scenarioPct = parseInt(slider.value, 10) || 0;
        if (sliderVal) sliderVal.textContent = (state.scenarioPct >= 0 ? '+' : '') + state.scenarioPct + '%';
        renderAll();
      });
    }

    document.querySelectorAll('[data-preset]').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = parseInt(btn.getAttribute('data-preset'), 10);
        state.scenarioPct = val;
        if (slider) slider.value = String(val);
        if (sliderVal) sliderVal.textContent = (val >= 0 ? '+' : '') + val + '%';
        document.querySelectorAll('[data-preset]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderAll();
      });
    });

    // Gold/T-Bill Anchor Checkbox
    const anchorChk = document.getElementById('toggle-gold-anchor');
    if (anchorChk) {
      anchorChk.addEventListener('change', () => {
        state.compareGoldAnchor = anchorChk.checked;
        renderAll();
      });
    }

    // Fiat Switcher
    const fiatSel = document.getElementById('fiat-switcher');
    if (fiatSel) {
      fiatSel.value = state.fiat;
      fiatSel.addEventListener('change', () => {
        state.fiat = fiatSel.value;
        localStorage.setItem(STORAGE_KEY_FIAT, state.fiat);
        renderAll();
      });
    }

    // Tabs
    document.querySelectorAll('[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-tab');
        document.querySelectorAll('[data-tab]').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const panel = document.getElementById('panel-' + target);
        if (panel) panel.classList.add('active');
        if (target === 'dca') runDcaCalculation();
        if (target === 'backtest') runBacktestCalculation();
      });
    });

    // DCA & Backtest buttons
    const dcaBtn = document.getElementById('btn-run-dca');
    if (dcaBtn) dcaBtn.addEventListener('click', runDcaCalculation);
    const btBtn = document.getElementById('btn-run-bt');
    if (btBtn) btBtn.addEventListener('click', runBacktestCalculation);

    // Export CSV & Share Scenario Card
    const csvBtn = document.getElementById('btn-export-csv');
    if (csvBtn) csvBtn.addEventListener('click', exportFifoCsv);
    const shareBtn = document.getElementById('btn-share-card');
    if (shareBtn) shareBtn.addEventListener('click', downloadScenarioCard);

    // Click-to-Load ChangeNOW Instant Swap Modal (Zero network call until clicked)
    const swapOpenBtn = document.getElementById('btn-open-swap');
    const swapModal = document.getElementById('swap-modal');
    const swapCloseBtn = document.getElementById('btn-close-swap');
    const swapContainer = document.getElementById('swap-iframe-container');

    if (swapOpenBtn && swapModal) {
      swapOpenBtn.addEventListener('click', () => {
        swapModal.classList.add('open');
        const cfg = window.PCG_MONETIZATION;
        if (swapContainer && !swapContainer.querySelector('iframe') && cfg && cfg.swap) {
          swapContainer.innerHTML = `<iframe src="${cfg.swap.iframeUrl}" style="width:100%;height:380px;border:0;border-radius:10px;" title="ChangeNOW Instant Swap"></iframe>`;
        }
      });
    }
    if (swapCloseBtn && swapModal) {
      swapCloseBtn.addEventListener('click', () => swapModal.classList.remove('open'));
    }

    // White-Label Embed Modal
    const embedOpenBtn = document.getElementById('btn-open-embed');
    const embedModal = document.getElementById('embed-modal');
    const embedCloseBtn = document.getElementById('btn-close-embed');
    if (embedOpenBtn && embedModal) {
      embedOpenBtn.addEventListener('click', () => embedModal.classList.add('open'));
    }
    if (embedCloseBtn && embedModal) {
      embedCloseBtn.addEventListener('click', () => embedModal.classList.remove('open'));
    }
  }

  // Register Service Worker for Offline PWA
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    loadHoldings();
    populateSelects();
    bindEvents();
    injectStaticAds();
    renderAll();
    fetchPrices();
    fetchSentiment();
  });
})();
