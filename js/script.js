document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Preloader ---------- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('hide'), 350);
  });
  // fallback in case 'load' already fired
  setTimeout(() => preloader && preloader.classList.add('hide'), 2500);

  /* ---------- Header scroll state ---------- */
  const header = document.getElementById('header');
  const scrollTopBtn = document.getElementById('scrollTop');

  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 40);
    scrollTopBtn.classList.toggle('show', y > 600);
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Mobile nav toggle ---------- */
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelectorAll('.nav__link');

  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const setActiveLink = () => {
    let current = sections[0]?.id;
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };
  document.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  /* ---------- Color configurator ---------- */
  const configCar = document.getElementById('configCar');
  const configTitle = document.getElementById('configTitle');
  const swatches = document.querySelectorAll('.swatch');

  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      swatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');

      configCar.style.opacity = 0;
      configCar.style.transform = 'scale(.94)';

      setTimeout(() => {
        configCar.src = swatch.dataset.car;
        configTitle.textContent = swatch.dataset.name;
        configCar.style.opacity = 1;
        configCar.style.transform = 'scale(1)';
      }, 220);
    });
  });

  /* ---------- Subscribe form ---------- */
  const form = document.getElementById('subscribeForm');
  const note = document.getElementById('subscribeNote');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    note.textContent = 'Thanks — you are on the list!';
    form.reset();
    setTimeout(() => (note.textContent = ''), 4000);
  });

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

});
