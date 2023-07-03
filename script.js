// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Change navigation background on scroll
window.addEventListener('scroll', function() {
  const nav = document.querySelector('nav');
  if (window.scrollY > 0) {
    nav.style.background = 'rgba(0, 0, 0, 0.8)';
  } else {
    nav.style.background = 'transparent';
  }
});

// Change background color on home section
const homeSection = document.getElementById('home');
let colorIndex = 0;

setInterval(() => {
  colorIndex = (colorIndex + 1) % 2;
  if (colorIndex === 0) {
    homeSection.classList.remove('alternate');
  } else {
    homeSection.classList.add('alternate');
  }
}, 5000);
