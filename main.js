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

// ── GITHUB API ──
const USERNAME = 'nshutilancelot3';
const ICONS = {
  JavaScript: '🟨', Python: '🐍', HTML: '🌐', CSS: '🎨',
  TypeScript: '🔷', Java: '☕', C: '⚙️', 'C++': '⚙️', Shell: '🖥️', default: '📁'
};

async function fetchGitHub() {
  try {
    const res = await fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`);
    if (!res.ok) throw new Error('API error');
    const repos = await res.json();
    renderProjects(repos);
  } catch (err) {
    console.error(err);
    renderFallback();
  }
}

function renderProjects(repos) {
  const grid = document.getElementById('projects-grid');
  const filtered = repos.filter(r => !r.fork).slice(0, 8);

  grid.innerHTML = '';

  // Always show ALU Projects card first
  const aluCard = document.createElement('div');
  aluCard.className = 'project-card fade-in';
  aluCard.innerHTML = `
    <div class="card-header">
      <span class="card-icon">🎓</span>
      <div class="card-links">
        <a class="card-link" href="https://github.com/${USERNAME}" target="_blank">GitHub ↗</a>
      </div>
    </div>
    <div class="card-title">ALU Projects</div>
    <div class="card-desc">Academic projects from African Leadership University.</div>
  `;
  grid.appendChild(aluCard);
  observer.observe(aluCard);

  filtered.forEach((repo, i) => {
    const icon = ICONS[repo.language] || ICONS.default;
    const langs = repo.language ? `<span class="lang-tag">${repo.language}</span>` : '';
    const stars = repo.stargazers_count > 0 ? `<div class="card-stars">★ ${repo.stargazers_count}</div>` : '';
    const card = document.createElement('div');
    card.className = 'project-card fade-in';
    card.style.transitionDelay = ((i + 1) * 0.07) + 's';
    card.innerHTML = `
      <div class="card-header">
        <span class="card-icon">${icon}</span>
        <div class="card-links">
          <a class="card-link" href="${repo.html_url}" target="_blank">GitHub ↗</a>
          ${repo.homepage ? `<a class="card-link" href="${repo.homepage}" target="_blank">Live ↗</a>` : ''}
        </div>
      </div>
      <div class="card-title">${repo.name.replace(/-/g, ' ').replace(/_/g, ' ')}</div>
      <div class="card-desc">${repo.description || 'A project by Nshuti Lancelot.'}</div>
      <div class="card-langs">${langs}</div>
      ${stars}
    `;
    grid.appendChild(card);
    observer.observe(card);
  });
}

function renderFallback() {
  const grid = document.getElementById('projects-grid');
  const fallbacks = [
    { name: 'ALU Projects', desc: 'Academic projects from African Leadership University.', icon: '🎓' },
  ];
  grid.innerHTML = '';
  fallbacks.forEach(p => {
    const card = document.createElement('div');
    card.className = 'project-card fade-in';
    card.innerHTML = `
      <div class="card-header">
        <span class="card-icon">${p.icon}</span>
        <div class="card-links">
          <a class="card-link" href="https://github.com/${USERNAME}" target="_blank">GitHub ↗</a>
        </div>
      </div>
      <div class="card-title">${p.name}</div>
      <div class="card-desc">${p.desc}</div>
    `;
    grid.appendChild(card);
    observer.observe(card);
  });
}

fetchGitHub();
