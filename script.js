// Menú móvil (hamburguesa)
const burger = document.getElementById('burgerBtn');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// Animación de aparición al hacer scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));
// Agregar a script.js
const sliderTrack = document.getElementById('sliderTrack');
const sliderDots = document.getElementById('sliderDots');
const prevBtn = document.getElementById('sliderPrev');
const nextBtn = document.getElementById('sliderNext');

if (sliderTrack) {
  const slides = sliderTrack.querySelectorAll('.slide');
  let current = 0;
  let autoplay;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot-btn' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    sliderDots.appendChild(dot);
  });

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    sliderTrack.style.transform = `translateX(-${current * 100}%)`;
    sliderDots.querySelectorAll('.dot-btn').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function startAutoplay() {
    autoplay = setInterval(() => goTo(current + 1), 4000);
  }
  function resetAutoplay() {
    clearInterval(autoplay);
    startAutoplay();
  }

  nextBtn.addEventListener('click', () => { goTo(current + 1); resetAutoplay(); });
  prevBtn.addEventListener('click', () => { goTo(current - 1); resetAutoplay(); });

  startAutoplay();
}
