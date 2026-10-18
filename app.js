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
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-arriving');
        observer.unobserve(entry.target);
      }
    }), {threshold: .12});
    document.querySelectorAll('.introduction, .section-heading, .about-title, .visit-steps, .contact-copy').forEach(element => observer.observe(element));
  }
})();
