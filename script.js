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

// Carrusel de galería — re-ejecutable, para cuando se recarga con fotos del admin
let sliderAutoplay = null;

function initGallerySlider() {
  const sliderTrack = document.getElementById('sliderTrack');
  const sliderDots = document.getElementById('sliderDots');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');

  if (!sliderTrack) return;

  // Limpia todo lo anterior (puntos viejos y autoplay viejo)
  clearInterval(sliderAutoplay);
  sliderDots.innerHTML = '';

  const slides = sliderTrack.querySelectorAll('.slide');
  if (!slides.length) return;

  let current = 0;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot-btn' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => { goTo(i); resetAutoplay(); });
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
    sliderAutoplay = setInterval(() => goTo(current + 1), 4000);
  }
  function resetAutoplay() {
    clearInterval(sliderAutoplay);
    startAutoplay();
  }

  nextBtn.onclick = () => { goTo(current + 1); resetAutoplay(); };
  prevBtn.onclick = () => { goTo(current - 1); resetAutoplay(); };

  startAutoplay();
}

initGallerySlider();
window.initGallerySlider = initGallerySlider; // para volver a llamarla desde index.html cuando lleguen las fotos reales

// Formulario de inscripción -> WhatsApp
const inscForm = document.getElementById('inscForm');
if (inscForm) {
  inscForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombreNino = document.getElementById('nombreNino').value.trim();
    const edadNino = document.getElementById('edadNino').value.trim();
    const categoria = document.getElementById('categoria').value;
    const nombrePadre = document.getElementById('nombrePadre').value.trim();
    const telefonoPadre = document.getElementById('telefonoPadre').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    let texto = `¡Hola! Quiero inscribir a mi hijo/a en Academia J.A.\n\n`;
    texto += `👦 Nombre del niño/a: ${nombreNino}\n`;
    texto += `🎂 Edad: ${edadNino}\n`;
    texto += `⚽ Categoría: ${categoria}\n`;
    texto += `👤 Nombre del representante: ${nombrePadre}\n`;
    texto += `📞 Teléfono: ${telefonoPadre}\n`;
    if (mensaje) texto += `📝 Mensaje: ${mensaje}\n`;

    const url = `https://wa.me/593982901508?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  });
}
