const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu(returnFocus = false) {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
  navigation.classList.remove('is-open');
  if (returnFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
document.addEventListener('click', event => {
  if (!event.target.closest('.header')) closeMenu();
});
window.matchMedia('(min-width: 901px)').addEventListener('change', () => closeMenu());
document.querySelectorAll('[data-service]').forEach(link => {
  const message = `Olá, Iara! Vim pelo site e gostaria de saber mais sobre ${link.dataset.service}. Podemos conversar sobre valores e disponibilidade?`;
  link.href = `https://wa.me/5514976046050?text=${encodeURIComponent(message)}`;
});
document.querySelector('#year').textContent = new Date().getFullYear();

// Sticky nativo: a posição acompanha o scroll nos dois sentidos, sem animação
// contínua em JavaScript. Telas curtas e navegação por teclado usam a lista aberta.
const serviceGrid = document.querySelector('.service-grid');
const serviceCards = [...serviceGrid.querySelectorAll('.service-area')];
const stackViewport = window.matchMedia('(max-width: 700px)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let readingServicesWithKeyboard = false;

function updateServiceStack() {
  const top = document.querySelector('.header').offsetHeight + 16;
  const contactHeight = document.querySelector('.mobile-contact-wrap').offsetHeight;
  const availableBottom = window.innerHeight - contactHeight - 24;
  const tallestCard = Math.max(...serviceCards.map(card => card.offsetHeight));
  const step = Math.min(4, Math.floor((availableBottom - top - tallestCard) / 2));
  const enabled = stackViewport.matches && !reducedMotion.matches
    && !readingServicesWithKeyboard && step >= 4;

  serviceGrid.style.setProperty('--stack-top', `${top}px`);
  serviceGrid.style.setProperty('--stack-step', `${Math.max(0, step)}px`);
  serviceGrid.toggleAttribute('data-stacked', enabled);
}

serviceGrid.addEventListener('focusin', event => {
  if (event.target.matches(':focus-visible')) {
    readingServicesWithKeyboard = true;
    updateServiceStack();
    requestAnimationFrame(() => event.target.scrollIntoView({ block: 'center', behavior: 'instant' }));
  }
});
serviceGrid.addEventListener('focusout', event => {
  if (!serviceGrid.contains(event.relatedTarget)) {
    readingServicesWithKeyboard = false;
    updateServiceStack();
  }
});
stackViewport.addEventListener('change', updateServiceStack);
reducedMotion.addEventListener('change', updateServiceStack);
window.addEventListener('resize', updateServiceStack, { passive: true });
if ('ResizeObserver' in window) {
  const stackResizeObserver = new ResizeObserver(updateServiceStack);
  [...serviceCards, document.querySelector('.header'), document.querySelector('.mobile-contact-wrap')]
    .forEach(element => stackResizeObserver.observe(element));
}
document.fonts.ready.then(updateServiceStack);
updateServiceStack();
