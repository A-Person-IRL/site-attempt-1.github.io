// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetSection = document.querySelector(this.getAttribute('href'));
    const targetColor = window.getComputedStyle(targetSection).backgroundColor;

    document.querySelector('html, body').scrollTo({
      top: targetSection.offsetTop,
      behavior: 'smooth'
    });

    animateBackground(targetColor);
  });
});
