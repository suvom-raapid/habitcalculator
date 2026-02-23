# HabitCalculator — Small Habits. Massive Results.

A modern, dark-themed web application that helps people understand the true financial impact of their daily habits over time.

## 🎯 Features

### Current Calculators
- **Coffee & Drinks Calculator** - Calculate costs of daily coffee, energy drinks, and other beverages with time projections

### Coming Soon
- Smoking & Vaping Calculator
- Subscription Services Calculator
- Fast Food & Takeout Calculator
- Investment Growth Calculator
- Fitness & Health Trackers

### Global Currency Support
- ✅ Automatic currency detection based on browser locale
- ✅ Manual currency selector with 15+ supported currencies
- ✅ Real-time currency conversion using live exchange rates
- ✅ localStorage to remember user preferences

**Supported Currencies:**
USD, EUR, GBP, INR, CAD, AUD, JPY, CNY, CHF, SGD, NZD, ZAR, BRL, MXN, KRW

### Design Features
- 🎨 Modern dark theme with custom cursor
- ✨ Smooth animations and transitions
- 📱 Fully responsive (mobile, tablet, desktop)
- 🔍 Search functionality
- 📊 Interactive live counter on homepage
- 🎯 Category-based navigation
- ⚡ Fast, static site (no backend required)

### Technical Features
- 🔒 Privacy-focused (no user tracking beyond analytics)
- 📈 Google Analytics 4 integration
- 🌍 Multi-currency with API fallback
- 💾 LocalStorage for preferences
- ♿ Accessible design
- 🚀 SEO optimized

## 📁 Project Structure

```
habitcalculator/
├── index.html                 # Main landing page
├── calculators/               # Calculator pages
│   └── coffee.html           # Coffee & drinks calculator
├── css/                       # Stylesheets
│   ├── theme.css             # Main dark theme
│   └── legacy-styles.css     # Old styles (deprecated)
├── js/                        # JavaScript files
│   ├── currency.js           # Currency management system
│   └── main.js               # Theme interactions & utilities
├── CNAME                      # Custom domain configuration
└── README.md                  # This file
```

## 🚀 Getting Started

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/suvom-raapid/habitcalculator.git
cd habitcalculator
```

2. Open `index.html` in your browser:
```bash
open index.html
# or just double-click the file
```

No build process or dependencies required!

### Deployment

This is a static website hosted on GitHub Pages. To deploy:

1. Push changes to the `main` branch
2. GitHub Pages will automatically deploy
3. Site is live at your custom domain

## 💻 Technology Stack

- **Frontend:** Pure HTML5, CSS3, JavaScript (ES6+)
- **Fonts:** Google Fonts (Bebas Neue, Crimson Pro, JetBrains Mono)
- **Analytics:** Google Analytics 4
- **Currency API:** exchangerate-api.com (with fallback)
- **Hosting:** GitHub Pages

## 🎨 Design System

### Colors
```css
--bg: #0a0a0f           /* Background */
--surface: #111118      /* Cards/panels */
--gold: #f0b429         /* Primary accent */
--teal: #06d6a0         /* Success/savings */
--red: #ef233c          /* Warnings */
--text: #e8e8f0         /* Primary text */
--muted: #6b6b80        /* Secondary text */
```

### Typography
- **Headings:** Bebas Neue (display font)
- **Body:** Crimson Pro (serif)
- **UI Elements:** JetBrains Mono (monospace)

## 🔧 Adding New Calculators

To add a new calculator:

1. Create a new HTML file in `/calculators/`
2. Copy the structure from `coffee.html`
3. Update the calculator logic in the `<script>` section
4. Add navigation links in `index.html`
5. Update the categories grid on the homepage

## 📊 Currency System

### How It Works

1. **Auto-Detection:** On first visit, detects currency from browser locale
2. **Manual Selection:** User can override via dropdown selector
3. **Persistence:** Preference saved in localStorage
4. **Conversion:** Live exchange rates from API, with fallback rates
5. **Formatting:** Proper locale-specific number formatting

### Usage in Code

```javascript
// Format amount in current currency
CurrencyManager.format(amount);

// Get current currency info
const { code, symbol, name } = CurrencyManager.getCurrentCurrency();

// Listen for currency changes
window.addEventListener('currencyChanged', (e) => {
  console.log('Currency changed to:', e.detail.currency);
});
```

## 📈 Google Analytics

Tracking ID: `G-GQ2XSHXJRT`

All pages include GA4 tracking. Events tracked:
- Page views
- Calculator usage
- Currency changes
- Navigation clicks

## 🎯 AdSense Compliance

The site is designed for Google AdSense approval:
- ✅ Original, valuable content
- ✅ Professional design
- ✅ Good user experience
- ✅ Mobile responsive
- ✅ SEO optimized
- ✅ Privacy-friendly
- ✅ No prohibited content

## 🔜 Roadmap

- [ ] Add more calculator categories
- [ ] Visual charts and graphs
- [ ] Savings goal tracker
- [ ] Social sharing features
- [ ] Privacy Policy page
- [ ] Terms of Service page
- [ ] PWA support
- [ ] Export results as PDF
- [ ] Comparison between multiple habits

## 📝 License

All rights reserved © 2026 HabitCalculator

## 🤝 Contributing

This is a personal project, but suggestions are welcome via GitHub issues.

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**HabitCalculator** — Every day counts. 💰
