// ── SMOOTH NAV SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── FADE IN OBSERVER ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── HARDCODED PROJECTS ──
const PROJECTS = [
  {
    name: 'Tuto Archive',
    desc: 'Full-stack YouTube study-resource finder for ALU students. Node.js/Express proxy keeps the API key server-side, lazy-loading preserves quota. Deployed on 2 Ubuntu servers behind HAProxy with SSL termination and Nginx reverse proxy.',
    icon: '📚',
    langs: ['JavaScript', 'Node.js', 'CSS'],
    github: 'https://github.com/nshutilancelot3/Tutorial-Archive',
    live: 'https://tutoarchive.lancewreal.tech',
  },
  {
    name: 'Lance Tracker',
    desc: 'Zero-dependency, mobile-first student finance manager. Real-time analytics dashboard, regex-powered search, JSON import/export, dark/light theme, and full WCAG AA accessibility with ARIA live regions and keyboard navigation.',
    icon: '💰',
    langs: ['JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/nshutilancelot3/lance_tracker',
    live: 'https://nshutilancelot3.github.io/lance_tracker/',
  },
  {
    name: 'Submission Reminder App',
    desc: 'Shell-based reminder system that tracks assignment deadlines and alerts students via terminal notifications. Built entirely in Bash with modular script architecture and environment-driven configuration.',
    icon: '🔔',
    langs: ['Shell', 'Bash'],
    github: 'https://github.com/nshutilancelot3/submission-reminder_app_nshutilancelot3',
    live: null,
  },
];

function renderProjects() {
  const grid = document.getElementById('projects-grid');
  grid.innerHTML = '';

  PROJECTS.forEach((project, i) => {
    const langs = project.langs.map(l => `<span class="lang-tag">${l}</span>`).join('');
    const liveLink = project.live
      ? `<a class="card-link" href="${project.live}" target="_blank">Live ↗</a>`
      : '';

    const card = document.createElement('div');
    card.className = 'project-card fade-in';
    card.style.transitionDelay = (i * 0.1) + 's';
    card.innerHTML = `
      <div class="card-header">
        <span class="card-icon">${project.icon}</span>
        <div class="card-links">
          <a class="card-link" href="${project.github}" target="_blank">GitHub ↗</a>
          ${liveLink}
        </div>
      </div>
      <div class="card-title">${project.name}</div>
      <div class="card-desc">${project.desc}</div>
      <div class="card-langs">${langs}</div>
    `;
    grid.appendChild(card);
    observer.observe(card);
  });
}

renderProjects();
