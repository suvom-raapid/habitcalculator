// Global Currency Management System

const CurrencyManager = {
  currencies: {
    USD: { symbol: '$', name: 'US Dollar', locale: 'en-US' },
    EUR: { symbol: '\u20AC', name: 'Euro', locale: 'de-DE' },
    GBP: { symbol: '\u00A3', name: 'British Pound', locale: 'en-GB' },
    INR: { symbol: '\u20B9', name: 'Indian Rupee', locale: 'en-IN' },
    CAD: { symbol: 'C$', name: 'Canadian Dollar', locale: 'en-CA' },
    AUD: { symbol: 'A$', name: 'Australian Dollar', locale: 'en-AU' },
    JPY: { symbol: '\u00A5', name: 'Japanese Yen', locale: 'ja-JP' },
    CNY: { symbol: '\u00A5', name: 'Chinese Yuan', locale: 'zh-CN' },
    CHF: { symbol: 'Fr', name: 'Swiss Franc', locale: 'de-CH' },
    SGD: { symbol: 'S$', name: 'Singapore Dollar', locale: 'en-SG' },
    NZD: { symbol: 'NZ$', name: 'New Zealand Dollar', locale: 'en-NZ' },
    ZAR: { symbol: 'R', name: 'South African Rand', locale: 'en-ZA' },
    BRL: { symbol: 'R$', name: 'Brazilian Real', locale: 'pt-BR' },
    MXN: { symbol: 'Mex$', name: 'Mexican Peso', locale: 'es-MX' },
    KRW: { symbol: '\u20A9', name: 'South Korean Won', locale: 'ko-KR' }
  },

  fallbackRates: {
    USD: 1, EUR: 0.92, GBP: 0.79, INR: 83.12, CAD: 1.36,
    AUD: 1.53, JPY: 149.50, CNY: 7.24, CHF: 0.88, SGD: 1.34,
    NZD: 1.65, ZAR: 18.95, BRL: 4.97, MXN: 17.15, KRW: 1340.50
  },

  exchangeRates: {},
  currentCurrency: 'USD',
  ready: false,
  lastUpdate: null,

  async init() {
    const savedCurrency = localStorage.getItem('preferredCurrency');
    if (savedCurrency && this.currencies[savedCurrency]) {
      this.currentCurrency = savedCurrency;
    } else {
      this.currentCurrency = this.detectCurrencyFromLocale();
    }

    await this.loadExchangeRates();
    this.updateCurrencySelector();
    this.ready = true;

    // Fire currencyReady so all pages can initialize
    window.dispatchEvent(new CustomEvent('currencyReady', {
      detail: { currency: this.currentCurrency }
    }));

    return this.currentCurrency;
  },

  detectCurrencyFromLocale() {
    try {
      const locale = navigator.language || navigator.userLanguage || 'en-US';
      const localeMap = {
        'en-US': 'USD', 'en': 'USD',
        'en-GB': 'GBP', 'en-UK': 'GBP',
        'en-IN': 'INR', 'hi-IN': 'INR', 'hi': 'INR',
        'en-CA': 'CAD', 'fr-CA': 'CAD',
        'en-AU': 'AUD', 'en-NZ': 'NZD', 'en-SG': 'SGD', 'en-ZA': 'ZAR',
        'de-DE': 'EUR', 'de': 'EUR', 'fr-FR': 'EUR', 'fr': 'EUR',
        'es-ES': 'EUR', 'es': 'EUR', 'it-IT': 'EUR', 'it': 'EUR',
        'nl-NL': 'EUR', 'nl': 'EUR', 'pt-PT': 'EUR',
        'ja-JP': 'JPY', 'ja': 'JPY',
        'zh-CN': 'CNY', 'zh': 'CNY', 'zh-Hans': 'CNY',
        'ko-KR': 'KRW', 'ko': 'KRW',
        'de-CH': 'CHF',
        'pt-BR': 'BRL', 'pt': 'BRL',
        'es-MX': 'MXN'
      };
      if (localeMap[locale]) return localeMap[locale];
      const lang = locale.split('-')[0];
      if (localeMap[lang]) return localeMap[lang];
      return 'USD';
    } catch (error) {
      return 'USD';
    }
  },

  async loadExchangeRates() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD', {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        this.exchangeRates = data.rates;
        this.lastUpdate = new Date();
        localStorage.setItem('exchangeRates', JSON.stringify(this.exchangeRates));
        localStorage.setItem('ratesLastUpdate', this.lastUpdate.toISOString());
      } else {
        throw new Error('API response not ok');
      }
    } catch (error) {
      const cachedRates = localStorage.getItem('exchangeRates');
      if (cachedRates) {
        this.exchangeRates = JSON.parse(cachedRates);
        this.lastUpdate = new Date(localStorage.getItem('ratesLastUpdate'));
      } else {
        this.exchangeRates = { ...this.fallbackRates };
        this.lastUpdate = new Date();
      }
    }
  },

  // Get the exchange rate for current currency (USD base)
  getRate() {
    return this.exchangeRates[this.currentCurrency] || 1;
  },

  // Get current currency symbol
  getSymbol() {
    return this.currencies[this.currentCurrency].symbol;
  },

  // Convert a USD amount to local currency (for defaults/placeholders)
  // Rounds to a sensible number for the locale
  localizeDefault(usdAmount) {
    var converted = usdAmount * this.getRate();
    if (converted >= 10000) return Math.round(converted / 1000) * 1000;
    if (converted >= 1000) return Math.round(converted / 100) * 100;
    if (converted >= 100) return Math.round(converted / 10) * 10;
    if (converted >= 10) return Math.round(converted);
    if (converted >= 1) return Math.round(converted * 10) / 10;
    return Math.round(converted * 100) / 100;
  },

  // Format a localized default with just the symbol (e.g. "₹400")
  symbolAmount(usdAmount) {
    var local = this.localizeDefault(usdAmount);
    // For zero-decimal currencies
    if (this.currentCurrency === 'JPY' || this.currentCurrency === 'KRW') {
      return this.getSymbol() + Math.round(local);
    }
    // For large amounts show without decimals
    if (local >= 10) return this.getSymbol() + Math.round(local);
    return this.getSymbol() + local;
  },

  // Convert amount from USD to current currency
  convert(amountInUSD) {
    return amountInUSD * this.getRate();
  },

  // Format amount in current currency (converts from USD first)
  format(amountInUSD, options) {
    var amount = this.convert(amountInUSD);
    return this._formatAmount(amount, options);
  },

  // Format amount already in the current currency (no conversion)
  formatLocal(amount, options) {
    return this._formatAmount(amount, options);
  },

  _formatAmount(amount, options) {
    var currency = this.currencies[this.currentCurrency];
    var defaults = { minimumFractionDigits: 0, maximumFractionDigits: 0 };
    // Use 2 decimal places for small amounts
    if (Math.abs(amount) < 100 && this.currentCurrency !== 'JPY' && this.currentCurrency !== 'KRW') {
      defaults.minimumFractionDigits = 2;
      defaults.maximumFractionDigits = 2;
    }
    var formatOptions = Object.assign({}, defaults, options || {});
    try {
      var formatter = new Intl.NumberFormat(currency.locale, {
        style: 'currency',
        currency: this.currentCurrency,
        minimumFractionDigits: formatOptions.minimumFractionDigits,
        maximumFractionDigits: formatOptions.maximumFractionDigits
      });
      return formatter.format(amount);
    } catch (error) {
      return currency.symbol + amount.toLocaleString(currency.locale, formatOptions);
    }
  },

  setCurrency(currencyCode) {
    if (this.currencies[currencyCode]) {
      this.currentCurrency = currencyCode;
      localStorage.setItem('preferredCurrency', currencyCode);
      this.updateCurrencySelector();
      window.dispatchEvent(new CustomEvent('currencyChanged', {
        detail: { currency: currencyCode }
      }));
    }
  },

  updateCurrencySelector() {
    var selector = document.getElementById('currencySelector');
    if (selector) {
      selector.value = this.currentCurrency;
    }
  },

  getCurrentCurrency() {
    return {
      code: this.currentCurrency,
      symbol: this.currencies[this.currentCurrency].symbol,
      name: this.currencies[this.currentCurrency].name
    };
  }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', async function() {
  await CurrencyManager.init();

  var selector = document.getElementById('currencySelector');
  if (selector) {
    selector.addEventListener('change', function(e) {
      CurrencyManager.setCurrency(e.target.value);
    });
  }
});
