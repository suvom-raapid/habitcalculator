# HabitCalc - Habit Cost Calculator

A modern, user-friendly web application that helps people understand the true financial impact of their daily habits over time.

## Features

### Current Calculators
- **Coffee & Drinks Calculator** - Calculate costs of daily coffee, energy drinks, and other beverages

### Coming Soon
- Smoking Calculator
- Subscriptions Calculator
- Fast Food & Takeout Calculator

### Global Currency Support
- Automatic currency detection based on browser locale
- Manual currency selector with 15+ supported currencies
- Real-time currency conversion using live exchange rates
- Currencies supported:
  - USD (US Dollar)
  - EUR (Euro)
  - GBP (British Pound)
  - INR (Indian Rupee)
  - CAD (Canadian Dollar)
  - AUD (Australian Dollar)
  - JPY (Japanese Yen)
  - CNY (Chinese Yuan)
  - CHF (Swiss Franc)
  - SGD (Singapore Dollar)
  - NZD (New Zealand Dollar)
  - ZAR (South African Rand)
  - BRL (Brazilian Real)
  - MXN (Mexican Peso)
  - KRW (South Korean Won)

### Key Features
- **Time Projections** - See costs broken down by daily, weekly, monthly, yearly, and 5-year periods
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI** - Clean, professional design optimized for user experience
- **SEO Optimized** - Proper meta tags and descriptions for search visibility
- **AdSense Ready** - Compliant design and content for monetization

## Technology Stack

- Pure HTML, CSS, and JavaScript (no frameworks required)
- Static site hosted on GitHub Pages
- Client-side currency conversion with API fallback
- localStorage for user preferences

## How It Works

### Currency Detection
1. When you first visit the site, it automatically detects your currency based on your browser's locale setting
2. You can manually change the currency using the dropdown in the header
3. Your preference is saved in your browser for future visits
4. All calculations update instantly when you change currencies

### Calculation Logic
- Users enter the cost of their habit in their local currency
- The calculator shows projections over different time periods
- All results automatically convert to the selected currency

## Development

This is a static website with no backend dependencies. To run locally:

1. Clone the repository
2. Open `index.html` in your browser
3. No build process or dependencies required

## Files Structure

```
habitcalculator/
├── index.html              # Home page
├── coffee-calculator.html  # Coffee calculator page
├── styles.css             # Shared styles
├── currency.js            # Currency management system
└── README.md             # This file
```

## Future Enhancements

- Additional calculator pages for different habits
- Privacy Policy page
- Terms of Service page
- Visual charts and graphs
- Savings goal tracker
- Social sharing features

## License

All rights reserved © 2026 HabitCalc
