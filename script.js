// Mohammed Muzammil Portfolio Scripts

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Active dock tracking with IntersectionObserver
  initScrollSpy();

  // Animated stat counters
  initCounters();
});

// Scrollspy for Dock Navigation
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const dockItems = document.querySelectorAll('.dock-item');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    dockItems.forEach(item => {
      item.classList.remove('active');
      const href = item.getAttribute('href');
      if (href === `#${current}`) {
        item.classList.add('active');
      }
    });
  });
}

// Counter Animation
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const handleScroll = () => {
    const metricsSection = document.getElementById('metrics');
    if (!metricsSection) return;

    const rect = metricsSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.8 && !animated) {
      animated = true;
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 1500; // ms
        const increment = target / (duration / 25);
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            counter.innerText = target;
            clearInterval(timer);
          } else {
            counter.innerText = Math.ceil(current);
          }
        }, 25);
      });
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Trigger if already in view
}

// Domain Category Filtering
function filterDomains(category) {
  // Update button active state
  const buttons = document.querySelectorAll('.domain-tab-btn');
  buttons.forEach(btn => {
    btn.classList.remove('active', 'bg-cyan-500/20', 'text-cyan-300', 'border-cyan-500/40');
    btn.classList.add('bg-white/5', 'text-slate-400', 'border-white/10');
  });

  const activeBtn = event.currentTarget;
  if (activeBtn) {
    activeBtn.classList.add('active', 'bg-cyan-500/20', 'text-cyan-300', 'border-cyan-500/40');
    activeBtn.classList.remove('bg-white/5', 'text-slate-400', 'border-white/10');
  }

  // Filter cards
  const cards = document.querySelectorAll('.domain-card');
  cards.forEach(card => {
    if (category === 'all' || card.getAttribute('data-category') === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// Hotlist Modal Controls
function openHotlistModal() {
  const modal = document.getElementById('hotlistModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeHotlistModal() {
  const modal = document.getElementById('hotlistModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

// Close modal on click outside
window.addEventListener('click', (e) => {
  const modal = document.getElementById('hotlistModal');
  if (e.target === modal) {
    closeHotlistModal();
  }
});

// Toast Notification
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  if (toast && toastMsg) {
    toastMsg.innerText = message;
    toast.classList.remove('hidden');
    toast.classList.add('flex');
    setTimeout(() => {
      toast.classList.add('hidden');
      toast.classList.remove('flex');
    }, 3000);
  }
}

// Copy to Clipboard
function copyToClipboard(text, successMsg = 'Copied to clipboard!') {
  navigator.clipboard.writeText(text).then(() => {
    showToast(successMsg);
  }).catch(() => {
    // Fallback
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    showToast(successMsg);
  });
}

// Handle Contact Form Submit -> Prepares Email
function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('contactName').value;
  const company = document.getElementById('contactCompany').value;
  const email = document.getElementById('contactEmail').value;
  const inquiryType = document.getElementById('inquiryType').value;
  const message = document.getElementById('contactMessage').value;

  const subject = encodeURIComponent(`[${inquiryType}] From ${name} - ${company}`);
  const body = encodeURIComponent(
    `Hello Mohammed Muzammil,\n\n` +
    `I am contacting you regarding: ${inquiryType}\n\n` +
    `Sender Name: ${name}\n` +
    `Company/Agency: ${company}\n` +
    `Sender Email: ${email}\n\n` +
    `Details / Requirements:\n${message}\n\n` +
    `Regards,\n${name}`
  );

  showToast('Opening your email client...');
  window.location.href = `mailto:muzammilsocialid@gmail.com?subject=${subject}&body=${body}`;
}
