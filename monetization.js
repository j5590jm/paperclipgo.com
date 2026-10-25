/* ============================================================
   PaperclipGo — MONETIZATION CONFIG (v3.0 Super — Production Ready)
   ------------------------------------------------------------
   OG Foundation Morals Enforced:
   - Zero Cookies / Zero Third-Party Tracking Scripts on Load
   - Above-the-Fold Header Slot Intentionally Empty
   - Click-to-Load Non-Custodial Swap Modal (ChangeNOW: 1d9d2f522090a1)
   - Cookieless Static AADS Banner (Unit ID: 2459805) in Inline & Footer
   - Local-Only Contextual Hardware Wallet & Tax Triggers
   - B2B White-Label Embed Generator & Local Supporter Key Support
   ============================================================ */

window.PCG_MONETIZATION = {
  ads: {
    enabled: true,
    provider: 'custom', // Cookieless static iframe only

    adsense: {
      client: '',
      slots: { header: '', inline: '', footer: '' }
    },

    ezoic: {
      placeholders: { header: 101, inline: 102, footer: 103 }
    },

    custom: {
      // Strictly empty to preserve Clean Above-the-Fold promise
      header: '',

      // Mid-page static slot (below calculator workspace)
      inline: '<div id="frame-inline" style="width:100%;margin:auto;position:relative;z-index:10;"><iframe data-aa="2459805" src="https://acceptable.a-ads.com/2459805/?size=Adaptive" loading="lazy" title="Privacy-safe sponsor" style="border:0;padding:0;width:70%;height:auto;overflow:hidden;display:block;margin:auto;"></iframe></div>',

      // Bottom page slot
      footer: '<div id="frame-footer" style="width:100%;margin:auto;position:relative;z-index:10;"><iframe data-aa="2459805" src="https://acceptable.a-ads.com/2459805/?size=Adaptive" loading="lazy" title="Privacy-safe sponsor" style="border:0;padding:0;width:70%;height:auto;overflow:hidden;display:block;margin:auto;"></iframe></div>'
    },

    showPlaceholderWhenEmpty: false
  },

  swap: {
    enabled: true,
    providerName: 'ChangeNOW (No-KYC Instant Swap)',
    linkId: '1d9d2f522090a1',
    iframeUrl: 'https://changenow.io/embeds/exchange-widget/v2/widget.html?FAQ=true&amount=0.1&amountFiat=1500&backgroundColor=12161F&darkMode=true&from=btc&fromFiat=usd&horizontal=false&isFiat=false&lang=en-US&link_id=1d9d2f522090a1&locales=true&logo=false&primaryColor=3B82F6&to=eth&toFiat=eth&toTheMoon=true',
    fallbackUrl: 'https://changenow.app.link/referral?link_id=1d9d2f522090a1'
  },

  affiliates: {
    enabled: true,
    items: [
      {
        id: 'changenow-card',
        badge: 'No-KYC Swap',
        title: 'ChangeNOW Instant Crypto Swap',
        description: 'Swap 900+ coins straight to your self-custody wallet with zero account signup.',
        ctaText: 'Launch Instant Swap →',
        url: 'https://changenow.app.link/referral?link_id=1d9d2f522090a1',
        contextTag: 'always'
      },
      {
        id: 'ledger',
        badge: 'Cold Storage',
        title: 'Ledger Hardware Wallets',
        description: 'Keep your private keys offline. Strongly recommended once your portfolio exceeds $2,500.',
        ctaText: 'Compare Cold Storage →',
        url: 'https://shop.ledger.com/',
        triggerMinPortfolioUsd: 2500,
        contextTag: 'security'
      },
      {
        id: 'trezor',
        badge: 'Open-Source Hardware',
        title: 'Trezor Safe Series',
        description: '100% open-source hardware security for self-custody holders.',
        ctaText: 'Explore Trezor →',
        url: 'https://trezor.io/',
        triggerMinPortfolioUsd: 2500,
        contextTag: 'security'
      },
      {
        id: 'koinly',
        badge: 'Tax & Cost Basis',
        title: 'Koinly Crypto Tax Calculator',
        description: 'Import your PaperclipGo FIFO CSV export to generate official IRS Form 8949 tax reports.',
        ctaText: 'Try Koinly Free →',
        url: 'https://koinly.io/',
        triggerOnCsvExport: true,
        contextTag: 'tax'
      }
    ]
  },

  proEmbeds: {
    enabled: true,
    embedBaseUrl: 'https://paperclipgo.com/?embed=1&ref=1d9d2f522090a1'
  },

  newsletter: {
    enabled: false,
    actionUrl: '',
    placeholder: 'Enter your email for market scenario alerts'
  }
};
