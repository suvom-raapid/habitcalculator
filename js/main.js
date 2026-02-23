// Main JavaScript for HabitCalculator
// Handles cursor, animations, and theme interactions

document.addEventListener('DOMContentLoaded', () => {
  // --- Custom cursor ---
  const cursor = document.getElementById('cursor');
  if (cursor) {
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, input, select, .cat-card, .calc-item, .step-item, .habit-btn').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });
  }

  // --- Scroll fade-up animations ---
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // Trigger hero immediately
  document.querySelectorAll('.hero .fade-up').forEach(el => {
    setTimeout(() => el.classList.add('visible'), 100);
  });
});

// Utility functions for currency formatting
function fmtMoney(n) {
  if (window.CurrencyManager && window.CurrencyManager.currentCurrency) {
    return CurrencyManager.format(n);
  }
  // Fallback formatting in USD
  if (n >= 1e6) return '$' + (n/1e6).toFixed(1) + 'M';
  if (n >= 1e3) return '$' + Math.round(n/1000) + 'K';
  return '$' + Math.round(n);
}

function fmtGold(n) {
  if (n >= 1000) return (n/1000).toFixed(1) + 'kg';
  return Math.round(n) + 'g';
}

// Financial calculations - Future Value with compound interest
function calcFV(dailyAmt, years, rate = 0.07) {
  const daily = dailyAmt;
  const r = rate / 365; // Daily interest rate
  const n = years * 365; // Total number of days

  // Future Value of Annuity formula: FV = PMT * ((1 + r)^n - 1) / r
  return daily * ((Math.pow(1 + r, n) - 1) / r);
}
