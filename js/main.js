// Main JavaScript for HabitCalculator
// Handles cursor, animations, search, and mobile menu

document.addEventListener('DOMContentLoaded', () => {
  // --- Touch device detection ---
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouch) {
    document.body.classList.add('touch-device');
  }

  // --- Custom cursor (desktop only) ---
  const cursor = document.getElementById('cursor');
  if (cursor && !isTouch) {
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, input, select, .cat-card, .calc-item, .step-item, .habit-btn').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });
  } else if (cursor) {
    cursor.style.display = 'none';
  }

  // --- Mobile menu toggle ---
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.classList.toggle('menu-open');
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.classList.remove('menu-open');
      });
    });
  }

  // --- Search functionality ---
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  const allCalculators = [
    { name: 'Coffee & Drinks Calculator', url: 'calculators/coffee.html', desc: 'Calculate your daily coffee and drink spending', icon: 'coffee' },
    { name: 'Smoking Cost Calculator', url: 'calculators/smoking.html', desc: 'See how much smoking costs you over time', icon: 'smoking' },
    { name: 'Subscription Calculator', url: 'calculators/subscriptions.html', desc: 'Track all your subscription service costs', icon: 'subscriptions' },
    { name: 'Daily Savings Calculator', url: 'calculators/savings.html', desc: 'See compound growth of daily savings', icon: 'savings' },
    { name: 'Dining Out Calculator', url: 'calculators/dining.html', desc: 'Calculate restaurant and takeout spending', icon: 'dining' },
  ];

  if (searchInput && searchResults) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (query.length === 0) {
        searchResults.classList.remove('show');
        return;
      }

      const matches = allCalculators.filter(c =>
        c.name.toLowerCase().includes(query) || c.desc.toLowerCase().includes(query)
      );

      if (matches.length > 0) {
        searchResults.innerHTML = matches.map(c =>
          `<a href="${c.url}" class="search-result-item">
            <span class="search-result-name">${c.name}</span>
            <span class="search-result-desc">${c.desc}</span>
          </a>`
        ).join('');
        searchResults.classList.add('show');
      } else {
        searchResults.innerHTML = '<div class="search-result-item no-result"><span class="search-result-name">No calculators found</span></div>';
        searchResults.classList.add('show');
      }
    });

    // Close search results on outside click
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.remove('show');
      }
    });

    searchInput.addEventListener('focus', () => {
      if (searchInput.value.trim().length > 0) {
        searchInput.dispatchEvent(new Event('input'));
      }
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
  const r = rate / 365;
  const n = years * 365;
  return dailyAmt * ((Math.pow(1 + r, n) - 1) / r);
}
