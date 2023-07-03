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
  const homeSection = document.getElementById('home');
  const currentSection = getCurrentSection();
  const targetColor = window.getComputedStyle(currentSection).backgroundColor;
  const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;

  if (scrollPosition < windowHeight) {
    nav.style.background = `rgba(0, 0, 0, ${scrollPosition / windowHeight})`;
    homeSection.style.backgroundColor = `rgba(0, 0, 0, ${1 - (scrollPosition / windowHeight)})`;
  } else {
    nav.style.background = `rgba(0, 0, 0, 1)`;
    homeSection.style.backgroundColor = `rgba(0, 0, 0, 0)`;
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
  const homeSection = document.getElementById('home');
  const currentColor = window.getComputedStyle(homeSection).backgroundColor;
  const currentRGB = getRGBValues(currentColor);
  const targetRGB = getRGBValues(targetColor);

  let animationInterval;
  let step = 0;

  animationInterval = setInterval(() => {
    step++;

    const r = Math.round(lerp(currentRGB.r, targetRGB.r, step / 100));
    const g = Math.round(lerp(currentRGB.g, targetRGB.g, step / 100));
    const b = Math.round(lerp(currentRGB.b, targetRGB.b, step / 100));

    homeSection.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

    if (step === 100) {
      clearInterval(animationInterval);
    }
  }, 10);
}

// Extract RGB values from a color string
function getRGBValues(color) {
  const regex = /(\d{1,3}), (\d{1,3}), (\d{1,3})/;
  const matches = regex.exec(color);

  return {
    r: parseInt(matches[1]),
    g: parseInt(matches[2]),
    b: parseInt(matches[3])
  };
}

// Linear interpolation function
function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}
