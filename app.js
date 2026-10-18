(() => {
  'use strict';
  const phone = '5514976046050';
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#mobile-menu');
  const setMenu = (open, returnFocus = false) => {
    menu.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    if (returnFocus) menuButton.focus();
  };
  menuButton.addEventListener('click', () => setMenu(menu.hidden));
  menu.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !menu.hidden) setMenu(false, true); });
  document.addEventListener('click', event => { if (!menu.hidden && !event.target.closest('.header')) setMenu(false); });
  window.matchMedia('(min-width: 821px)').addEventListener('change', event => { if (event.matches) setMenu(false); });

  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const services = [...document.querySelectorAll('.care-item')];
  const filterStatus = document.querySelector('#filter-status');
  const applyFilter = (filter, updateURL = true) => {
    const valid = filterButtons.some(button => button.dataset.filter === filter) ? filter : 'todos';
    let count = 0;
    services.forEach(item => {
      const visible = valid === 'todos' || item.dataset.category === valid;
      item.hidden = !visible;
      if (!visible) item.open = false;
      if (visible) count++;
    });
    filterButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === valid)));
    filterStatus.textContent = `${count} cuidados disponíveis.`;
    if (updateURL) {
      const url = new URL(window.location.href);
      if (valid === 'todos') url.searchParams.delete('cuidados');
      else url.searchParams.set('cuidados', valid);
      window.history.replaceState(null, '', url);
    }
  };
  filterButtons.forEach(button => button.addEventListener('click', event => {
    applyFilter(button.dataset.filter);
    if (event.detail && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      services.filter(item => !item.hidden).forEach((item, index) => {
        item.animate([{opacity: .4, transform: 'translateY(9px)'}, {opacity: 1, transform: 'translateY(0)'}], {
          duration: 300, delay: Math.min(index, 4) * 35, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards'
        });
      });
    }
  }));
  applyFilter(new URL(window.location.href).searchParams.get('cuidados') || 'todos', false);
  window.addEventListener('popstate', () => applyFilter(new URL(window.location.href).searchParams.get('cuidados') || 'todos', false));

  const form = document.querySelector('#appointment-form');
  const subject = document.querySelector('#service');
  const name = document.querySelector('#customer-name');
  const appointmentLink = document.querySelector('#appointment-link');
  function updateAppointment() {
    const customer = name.value.trim();
    const message = `Olá, Iara!${customer ? ` Meu nome é ${customer}.` : ''} Vi seu site e gostaria de conversar sobre: ${subject.value}. Pode me informar os valores e a disponibilidade de horários?`;
    appointmentLink.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }
  form.addEventListener('input', updateAppointment);
  form.addEventListener('change', updateAppointment);
  form.addEventListener('submit', event => { event.preventDefault(); appointmentLink.focus(); });
  updateAppointment();

  const privacy = document.querySelector('#privacy-dialog');
  document.querySelector('.privacy-trigger').addEventListener('click', () => privacy.showModal());
  document.querySelector('.dialog-close').addEventListener('click', () => privacy.close());
  privacy.addEventListener('click', event => { if (event.target === privacy) {
    const rect = privacy.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) privacy.close();
  }});

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const hero = document.querySelector('.hero');
  const motionToggle = document.querySelector('.motion-toggle');
  const preview = document.querySelector('.care-preview');
  const previewButtons = [...document.querySelectorAll('[data-preview]')];
  const previewTitle = document.querySelector('#preview-title');
  const previewDescription = document.querySelector('#preview-description');
  const previewLink = document.querySelector('#preview-link');
  const areas = [
    {title: 'Estética facial', description: 'Limpeza de pele e máscara facial.', filter: 'facial'},
    {title: 'Corpo & bem-estar', description: 'Massagens, drenagem e depilação.', filter: 'corporal'},
    {title: 'Enfermagem', description: 'Cuidado de feridas e onicomicose (laser).', filter: 'enfermagem'}
  ];
  let currentArea = 0;
  let pausedByUser = false;
  let inView = true;
  let readingPreview = false;
  let previewTimer;
  let previewAnimation;
  const stopTimer = () => window.clearTimeout(previewTimer);
  const canPlay = () => !pausedByUser && !reducedMotion.matches && inView && !document.hidden;
  function schedulePreview() {
    stopTimer();
    if (canPlay() && !readingPreview) previewTimer = window.setTimeout(() => {
      selectArea((currentArea + 1) % areas.length, true);
      schedulePreview();
    }, 6500);
  }
  function selectArea(index, animate) {
    hero.classList.toggle('instant-preview', !animate);
    currentArea = index;
    const area = areas[index];
    previewTitle.textContent = area.title;
    previewDescription.textContent = area.description;
    previewLink.setAttribute('aria-label', `Conhecer os cuidados: ${area.title}`);
    previewButtons.forEach((button, position) => button.setAttribute('aria-pressed', String(position === index)));
    if (previewAnimation) previewAnimation.cancel();
    if (animate && !reducedMotion.matches && !pausedByUser) {
      previewAnimation = preview.querySelector('.preview-content > div').animate([
        {opacity: 0, transform: 'translateY(15px)', clipPath: 'inset(0 0 100% 0)'},
        {opacity: 1, transform: 'translateY(0)', clipPath: 'inset(0 0 0 0)'}
      ], {duration: 550, easing: 'cubic-bezier(.22,1,.36,1)'});
    }
  }
  function syncMotion() {
    hero.classList.toggle('motion-ready', !reducedMotion.matches);
    hero.toggleAttribute('data-motion-paused', pausedByUser);
    hero.toggleAttribute('data-motion-idle', !inView || document.hidden);
    motionToggle.hidden = reducedMotion.matches;
    motionToggle.setAttribute('aria-pressed', String(pausedByUser));
    motionToggle.querySelector('span').textContent = pausedByUser ? 'Retomar animações' : 'Pausar animações';
    if (!canPlay() && previewAnimation) previewAnimation.cancel();
    schedulePreview();
  }
  preview.querySelector('.preview-selectors').hidden = false;
  previewButtons.forEach(button => button.addEventListener('click', event => {
    selectArea(Number(button.dataset.preview), event.detail > 0);
    schedulePreview();
  }));
  previewLink.addEventListener('click', () => applyFilter(areas[currentArea].filter));
  preview.addEventListener('pointerenter', () => { readingPreview = true; stopTimer(); });
  preview.addEventListener('pointerleave', () => {
    readingPreview = preview.contains(document.activeElement);
    schedulePreview();
  });
  preview.addEventListener('focusin', () => { readingPreview = true; stopTimer(); });
  preview.addEventListener('focusout', () => window.setTimeout(() => {
    readingPreview = preview.contains(document.activeElement);
    schedulePreview();
  }, 0));
  motionToggle.addEventListener('click', () => { pausedByUser = !pausedByUser; syncMotion(); });
  document.addEventListener('visibilitychange', syncMotion);
  reducedMotion.addEventListener('change', syncMotion);
  if ('IntersectionObserver' in window) {
    const heroObserver = new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting;
      syncMotion();
    }, {threshold: .05});
    heroObserver.observe(hero);
    // One secondary transition introduces the professional's credentials; the page does not hide content pending scroll.
    const about = document.querySelector('.about-title');
    const aboutObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        if (!reducedMotion.matches) about.classList.add('is-arriving');
        aboutObserver.disconnect();
      }
    }, {threshold: .25});
    aboutObserver.observe(about);
  }
  syncMotion();

  // Native details remain the fallback and the instant keyboard path.
  const disclosureAnimations = new WeakMap();
  services.forEach(item => item.querySelector('summary').addEventListener('click', event => {
    item.classList.toggle('instant-disclosure', !event.detail || reducedMotion.matches);
    const previous = disclosureAnimations.get(item);
    if (!event.detail || reducedMotion.matches || !item.animate) {
      if (previous) previous.cancel();
      disclosureAnimations.delete(item);
      delete item.dataset.closing;
      return;
    }
    event.preventDefault();
    const startHeight = item.getBoundingClientRect().height;
    if (previous) previous.cancel();
    const opening = !item.open || item.dataset.closing === 'true';
    delete item.dataset.closing;
    if (opening) item.open = true;
    else item.dataset.closing = 'true';
    const endHeight = opening ? item.getBoundingClientRect().height : item.querySelector('summary').getBoundingClientRect().height;
    item.style.overflow = 'hidden';
    const animation = item.animate([{height: `${startHeight}px`}, {height: `${endHeight}px`}], {
      duration: 280, easing: 'cubic-bezier(.22,1,.36,1)'
    });
    disclosureAnimations.set(item, animation);
    animation.onfinish = () => {
      item.open = opening;
      item.style.removeProperty('overflow');
      delete item.dataset.closing;
      disclosureAnimations.delete(item);
    };
    animation.oncancel = () => { item.style.removeProperty('overflow'); };
  }));
})();
