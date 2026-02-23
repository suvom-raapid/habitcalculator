// Global Currency Management System

const CurrencyManager = {
  // Supported currencies with their details
  currencies: {
    USD: { symbol: '$', name: 'US Dollar', locale: 'en-US' },
    EUR: { symbol: '€', name: 'Euro', locale: 'de-DE' },
    GBP: { symbol: '£', name: 'British Pound', locale: 'en-GB' },
    INR: { symbol: '₹', name: 'Indian Rupee', locale: 'en-IN' },
    CAD: { symbol: 'C$', name: 'Canadian Dollar', locale: 'en-CA' },
    AUD: { symbol: 'A$', name: 'Australian Dollar', locale: 'en-AU' },
    JPY: { symbol: '¥', name: 'Japanese Yen', locale: 'ja-JP' },
    CNY: { symbol: '¥', name: 'Chinese Yuan', locale: 'zh-CN' },
    CHF: { symbol: 'Fr', name: 'Swiss Franc', locale: 'de-CH' },
    SGD: { symbol: 'S$', name: 'Singapore Dollar', locale: 'en-SG' },
    NZD: { symbol: 'NZ$', name: 'New Zealand Dollar', locale: 'en-NZ' },
    ZAR: { symbol: 'R', name: 'South African Rand', locale: 'en-ZA' },
    BRL: { symbol: 'R$', name: 'Brazilian Real', locale: 'pt-BR' },
    MXN: { symbol: 'Mex$', name: 'Mexican Peso', locale: 'es-MX' },
    KRW: { symbol: '₩', name: 'South Korean Won', locale: 'ko-KR' }
  },

  // Fallback exchange rates (updated periodically, base: USD)
  fallbackRates: {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    INR: 83.12,
    CAD: 1.36,
    AUD: 1.53,
    JPY: 149.50,
    CNY: 7.24,
    CHF: 0.88,
    SGD: 1.34,
    NZD: 1.65,
    ZAR: 18.95,
    BRL: 4.97,
    MXN: 17.15,
    KRW: 1340.50
  },

  exchangeRates: {},
  currentCurrency: 'USD',
  lastUpdate: null,

  // Initialize the currency system
  async init() {
    // Check if user has saved preference
    const savedCurrency = localStorage.getItem('preferredCurrency');

    if (savedCurrency && this.currencies[savedCurrency]) {
      this.currentCurrency = savedCurrency;
    } else {
      // Auto-detect from browser locale
      this.currentCurrency = this.detectCurrencyFromLocale();
    }

    // Load exchange rates
    await this.loadExchangeRates();

    // Update UI
    this.updateCurrencySelector();

    return this.currentCurrency;
  },

  // Detect currency from browser locale
  detectCurrencyFromLocale() {
    try {
      const locale = navigator.language || navigator.userLanguage || 'en-US';

      // Map common locales to currencies
      const localeMap = {
        'en-US': 'USD', 'en': 'USD',
        'en-GB': 'GBP', 'en-UK': 'GBP',
        'en-IN': 'INR', 'hi-IN': 'INR', 'hi': 'INR',
        'en-CA': 'CAD', 'fr-CA': 'CAD',
        'en-AU': 'AUD',
        'en-NZ': 'NZD',
        'en-SG': 'SGD',
        'en-ZA': 'ZAR',
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

      // Try exact match first
      if (localeMap[locale]) {
        return localeMap[locale];
      }

      // Try language code only
      const lang = locale.split('-')[0];
      if (localeMap[lang]) {
        return localeMap[lang];
      }

      // Default to USD
      return 'USD';
    } catch (error) {
      console.log('Currency detection failed, defaulting to USD');
      return 'USD';
    }
  },

  // Load exchange rates from API with fallback
  async loadExchangeRates() {
    try {
      // Try to fetch live rates from a free API
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');

      if (response.ok) {
        const data = await response.json();
        this.exchangeRates = data.rates;
        this.lastUpdate = new Date();

        // Cache the rates
        localStorage.setItem('exchangeRates', JSON.stringify(this.exchangeRates));
        localStorage.setItem('ratesLastUpdate', this.lastUpdate.toISOString());

        console.log('Exchange rates loaded successfully');
      } else {
        throw new Error('API response not ok');
      }
    } catch (error) {
      console.log('Using fallback exchange rates');

      // Try to use cached rates first
      const cachedRates = localStorage.getItem('exchangeRates');
      if (cachedRates) {
        this.exchangeRates = JSON.parse(cachedRates);
        this.lastUpdate = new Date(localStorage.getItem('ratesLastUpdate'));
      } else {
        // Use hardcoded fallback rates
        this.exchangeRates = { ...this.fallbackRates };
        this.lastUpdate = new Date();
      }
    }
  },

  // Convert amount from USD to current currency
  convert(amountInUSD) {
    if (!this.exchangeRates[this.currentCurrency]) {
      return amountInUSD;
    }
    return amountInUSD * this.exchangeRates[this.currentCurrency];
  },

  // Format amount in current currency
  format(amountInUSD, options = {}) {
    const amount = this.convert(amountInUSD);
    const currency = this.currencies[this.currentCurrency];

    const defaults = {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    };

    const formatOptions = { ...defaults, ...options };

    try {
      // Use Intl.NumberFormat for proper locale formatting
      const formatter = new Intl.NumberFormat(currency.locale, {
        style: 'currency',
        currency: this.currentCurrency,
        ...formatOptions
      });

      return formatter.format(amount);
    } catch (error) {
      // Fallback formatting
      return `${currency.symbol}${amount.toLocaleString(currency.locale, formatOptions)}`;
    }
  },

  // Change currency
  setCurrency(currencyCode) {
    if (this.currencies[currencyCode]) {
      this.currentCurrency = currencyCode;
      localStorage.setItem('preferredCurrency', currencyCode);
      this.updateCurrencySelector();

      // Trigger custom event for other parts of the page to update
      window.dispatchEvent(new CustomEvent('currencyChanged', {
        detail: { currency: currencyCode }
      }));
    }
  },

  // Update the currency selector UI
  updateCurrencySelector() {
    const selector = document.getElementById('currencySelector');
    if (selector) {
      selector.value = this.currentCurrency;
    }
  },

  // Get current currency info
  getCurrentCurrency() {
    return {
      code: this.currentCurrency,
      symbol: this.currencies[this.currentCurrency].symbol,
      name: this.currencies[this.currentCurrency].name
    };
  }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
  await CurrencyManager.init();

  // Set up currency selector change handler
  const selector = document.getElementById('currencySelector');
  if (selector) {
    selector.addEventListener('change', (e) => {
      CurrencyManager.setCurrency(e.target.value);
    });
  }
});
