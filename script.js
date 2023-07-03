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
  const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollPosition > 0) {
    nav.style.background = `rgba(0, 0, 0, ${scrollPosition / 500})`;
  } else {
    nav.style.background = 'rgba(0, 0, 0, 0)';
  }
});

// Change background color on home section
const homeSection = document.getElementById('home');
let colorIndex = 0;

setInterval(() => {
  const colors = ['#000', '#141414', '#222', '#333']; // Add more colors here
  colorIndex = (colorIndex + 1) % colors.length;
  homeSection.style.backgroundColor = colors[colorIndex];
}, 5000);
