(() => {
  'use strict';
  const content = window.portfolioContent;
  const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const chips = items => items.map(item => `<span class="chip">${esc(item)}</span>`).join('');
  const list = items => `<ul class="feature-list">${items.map(item => `<li>${esc(item)}</li>`).join('')}</ul>`;
  const github = url => `<a class="text-link" href="${esc(url)}" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>`;
  const renderScreenshots = project => {
    const shots = project.screenshot ? [{ src: project.screenshot, alt: project.screenshotAlt || `Скриншот проекта ${project.name}`, caption: project.screenshotCaption || '' }] : [];
    shots.push(...(project.extraScreenshots || []));
    return shots.length ? shots.map(shot => `<figure class="screenshot-figure"><a href="${esc(shot.src)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(shot.alt)} — открыть в полном размере"><img class="project-screenshot" src="${esc(shot.src)}" alt="${esc(shot.alt)}" loading="lazy"></a>${shot.caption ? `<figcaption>${esc(shot.caption)}</figcaption>` : ''}</figure>`).join('') : '<div class="media-placeholder"><span aria-hidden="true">▧</span><p>Скриншоты пока не добавлены</p></div>';
  };
  const grid = document.querySelector('#project-grid');
  const dialog = document.querySelector('#project-dialog');
  const covers = {
    cinema: '<div class="cinema-screen"></div><div class="seat-grid">' + '<i></i>'.repeat(40) + '</div><span class="cover-word">CINEMA</span><span class="cover-sub">RESERVE YOUR SEAT</span>',
    fitness: '<div class="fitness-ring"></div><div class="fitness-rule"></div><span class="fitness-word">BOSNA<span>FIT CLUB</span></span><span class="cover-sub">STRENGTH IN EVERY STEP</span>',
    career: '<div class="career-orbit"></div><div class="career-path"><i></i><i></i><i></i></div><span class="career-word">FIND YOUR<br><b>NEXT STEP.</b></span><span class="cover-sub">IT CAREER NAVIGATOR</span>'
  };
  document.querySelector('#technology-grid').innerHTML = content.technologies.map((group, index) => `<article class="technology${group.title === 'Планирую изучить' ? ' technology-planned' : ''}"><div class="technology-top"><span class="technology-symbol" aria-hidden="true">${esc(group.symbol)}</span><span class="mono">0${index + 1}</span></div><h3>${esc(group.title)}</h3><div class="chips">${chips(group.items)}</div>${group.title === 'Планирую изучить' ? '<p class="technology-plan-note">В планах для дипломного проекта IT Career Navigator</p>' : ''}</article>`).join('');
  document.querySelector('[data-filter="all"] span').textContent = String(content.projects.length).padStart(2, '0');
  function renderProjects(filter = 'all') {
    const projects = content.projects.filter(project => filter === 'all' || project.framework === filter);
    grid.innerHTML = projects.map(project => {
      const number = String(content.projects.indexOf(project) + 1).padStart(2, '0');
      return `<article class="project-card project-${esc(project.id)}"><div class="project-cover cover-${esc(project.cover)}" aria-hidden="true"><span class="cover-index">PROJECT / ${number}</span>${covers[project.cover] || covers.career}<span class="cover-label">ГРАФИЧЕСКАЯ ОБЛОЖКА</span></div><div class="project-body"><p class="project-category">${esc(project.category)} <span class="project-status ${project.status === 'В разработке' ? 'in-progress' : ''}">${esc(project.status)}</span></p><h3>${esc(project.name)}</h3><p class="project-description">${esc(project.description)}</p><div class="chips">${chips(project.stack)}</div>${project.id === 'career' ? '<p class="card-development">В коде: импорт, статистика, базовый roadmap.<br>В планах: LLM и веб-интерфейс.</p>' : ''}<div class="card-actions"><button type="button" class="details-button" data-project="${esc(project.id)}">О проекте <span aria-hidden="true">↗</span></button>${project.github ? github(project.github) : '<span class="private-note">GitHub пока не указан</span>'}</div></div></article>`;
    }).join('');
    document.querySelector('#filter-status').textContent = `Показано проектов: ${projects.length}`;
  }
  renderProjects();
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    renderProjects(button.dataset.filter);
  }));
  let opener;
  grid.addEventListener('click', event => {
    const button = event.target.closest('[data-project]');
    if (!button) return;
    const project = content.projects.find(item => item.id === button.dataset.project);
    opener = button;
    document.querySelector('#dialog-content').innerHTML = `<span class="project-status ${project.status === 'В разработке' ? 'in-progress' : ''}">${esc(project.status)}</span><h2 id="dialog-title">${esc(project.name)}</h2><p class="dialog-description">${esc(project.description)}</p><div class="chips">${chips(project.stack)}</div><h3>${project.id === 'career' ? 'Уже есть в коде' : 'Реализованные возможности'}</h3>${list(project.implemented)}<p class="project-note">${esc(project.notes)}</p><p class="tools-note">${esc(project.tools)}</p>${project.planned.length ? `<div class="planned-section"><p class="eyebrow">ДАЛЬНЕЙШЕЕ РАЗВИТИЕ</p><h3>Запланировано</h3>${list(project.planned)}<p class="tools-note">Предполагаемые инструменты — ещё не реализованный стек:</p><div class="chips">${chips(project.plannedStack)}</div></div>` : ''}<h3>Скриншоты и демонстрация</h3><div class="project-media">${renderScreenshots(project)}${project.video ? `<figure><video controls playsinline preload="metadata" aria-label="Демонстрационная запись ${esc(project.name)}"><source src="${esc(project.video)}" type="video/mp4">Ваш браузер не поддерживает видео.</video><figcaption>Запись из папки проекта BosnaFitClub.</figcaption></figure>` : '<div class="media-placeholder"><span aria-hidden="true">▷</span><p>Демонстрационное видео пока не добавлено</p></div>'}</div>${project.github ? `<div class="dialog-github">${github(project.github)}</div>` : ''}`;
    dialog.showModal();
    document.body.classList.add('dialog-open');
  });
  const close = () => dialog.close();
  document.querySelector('.close-dialog').addEventListener('click', close);
  dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close(); } });
  dialog.addEventListener('close', () => { dialog.querySelectorAll('video').forEach(video => video.pause()); document.body.classList.remove('dialog-open'); opener?.focus(); });
  const menu = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  const closeMenu = () => { menu.setAttribute('aria-expanded', 'false'); navigation.classList.remove('is-open'); menu.setAttribute('aria-label', 'Открыть меню'); };
  menu.addEventListener('click', () => { const expanded = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(expanded)); menu.setAttribute('aria-label', expanded ? 'Закрыть меню' : 'Открыть меню'); navigation.classList.toggle('is-open', expanded); });
  navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
  document.addEventListener('click', event => { if (!event.target.closest('.header-inner')) closeMenu(); });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: 0.08 });
    document.querySelectorAll('.section').forEach(section => { section.classList.add('reveal'); observer.observe(section); });
  }
})();
