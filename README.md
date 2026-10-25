# PaperclipGo v3.0 Super (`paperclipgo.com`)

**Know what your crypto is actually worth.**  
A 100% client-side, privacy-first cryptocurrency portfolio cost-basis tracker, historical entry backtester, DCA planner, and "What-If" market scenario simulator.

## OG Foundation Morals (Enforced Architecture)
1. **Zero Tracking & Zero Cookies:** No Google Analytics, no Meta pixels, no behavioral fingerprinting scripts.
2. **100% Local Compute:** All portfolio positions and purchase prices live strictly in browser `localStorage` (`paperclip_holdings`).
3. **Radical Formula Transparency:** Every cost-basis, ROI, and scenario equation is exposed directly in the UI.
4. **Clean Above-the-Fold:** Zero ads above the main calculator workspace.

## What's Included in v3.0 Super
- **Core App (`index.html`, `styles.css`, `app.js`):** 4-tab layout (Portfolio & What-If Simulator, DCA Planner, Historical Backtester, 40-Coin Guide Directory), HTML5 Canvas scenario chart, downloadable PNG Scenario Social Card generator, Multi-Currency Fiat engine (`USD`, `EUR`, `GBP`, `CAD`, `AUD`), FIFO Tax CSV exporter, and Physical Gold (`PAXG`) + Treasury anchor toggle.
- **Privacy-Preserving Monetization (`monetization.js`):**
  - **AADS Cookieless Banner (`2459805`)** in inline and footer slots.
  - **ChangeNOW Non-Custodial Swap (`1d9d2f522090a1`)** in a click-to-load modal (zero network calls until clicked).
  - **Local Contextual Triggers** for hardware wallets (portfolio >= $2,500) and tax software (on CSV export or unrealized gain > $1,000).
  - **B2B White-Label Embed Generator** modal.
- **Hardened Price Proxy (`api/market.php`):** Regex input validation + 60-second `sys_get_temp_dir()` JSON cache.
- **Offline PWA (`sw.js`, `manifest.webmanifest`, `offline.html`):** Installable desktop/mobile web app.
- **Automated Traffic & AI Discovery (`llms.txt`, `robots.txt`, `sitemap.xml`, `/guides/*.html`):** All 43 static SEO guide pages pre-rendered and indexed in `sitemap.xml` (48 total URLs).
