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
