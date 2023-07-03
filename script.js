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

// Change navigation background on scroll
window.addEventListener('scroll', function() {
  const nav = document.querySelector('nav');
  const bodyBackground = document.querySelector('body::before');
  const homeSection = document.getElementById('home');
  const currentSection = getCurrentSection();
  const targetColor = window.getComputedStyle(currentSection).backgroundColor;
  const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;

  if (scrollPosition < windowHeight) {
    nav.style.background = `rgba(0, 0, 0, ${scrollPosition / windowHeight})`;
    bodyBackground.style.opacity = `1`;
  } else {
    nav.style.background = `rgba(0, 0, 0, 1)`;
    bodyBackground.style.opacity = `0`;
  }

  animateBackground(targetColor);
});

// Get the current section based on scroll position
function getCurrentSection() {
  const sections = document.querySelectorAll('section');
  const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;

  for (let i = 0; i < sections.length; i++) {
    const sectionOffset = sections[i].offsetTop;
    const sectionHeight = sections[i].offsetHeight;

    if (scrollPosition >= sectionOffset - (windowHeight / 2) && scrollPosition < sectionOffset + sectionHeight - (windowHeight / 2)) {
      return sections[i];
    }
  }

  return sections[0];
}

// Animate the background color transition
function animateBackground(targetColor) {
  const bodyBackground = document.querySelector('body::before');
  const currentOpacity = parseFloat(window.getComputedStyle(bodyBackground).opacity);
  const targetOpacity = (targetColor === 'rgb(0, 0, 0)') ? 1 : 0;

  let animationInterval;
  let step = 0;

  animationInterval = setInterval(() => {
    step++;

    const opacity = lerp(currentOpacity, targetOpacity, step / 100);
    bodyBackground.style.opacity = opacity;

    if (step === 100) {
      clearInterval(animationInterval);
    }
  }, 10);
}

// Linear interpolation function
function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}
