// Smooth scrolling with faster background fade
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    const offset = target.offsetTop;

    window.scrollTo({
      top: offset,
      behavior: 'smooth'
    });

    // Update background color during scroll
    const sections = document.querySelectorAll('section');
    const homeSection = document.getElementById('home');
    const nav = document.querySelector('nav');

    let lastKnownScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    let ticking = false;

    function changeBackground() {
      const windowHeight = window.innerHeight;
      const navHeight = nav.offsetHeight;
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

      const scrollBottom = scrollPosition + windowHeight - navHeight;
      const scrollThreshold = 0.5; // Adjust the threshold as desired

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollBottom >= sectionTop && scrollBottom < sectionTop + sectionHeight) {
          const progress = (scrollBottom - sectionTop) / sectionHeight;
          const inverseProgress = 1 - progress;

          // Adjust the opacity and background color based on the inverse progress
          const opacity = inverseProgress * 0.8;
          const backgroundColor = `rgba(0, 0, 0, ${opacity})`;

          homeSection.style.backgroundColor = backgroundColor;
          nav.style.backgroundColor = backgroundColor;
        }
      });
    }

    window.addEventListener('scroll', function () {
      lastKnownScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

      if (!ticking) {
        window.requestAnimationFrame(function () {
          changeBackground();
          ticking = false;
        });

        ticking = true;
      }
    });
  });
});

// Change navigation background on scroll
window.addEventListener('scroll', function () {
  const nav = document.querySelector('nav');
  if (window.scrollY > 0) {
    nav.style.background = 'rgba(0, 0, 0, 0.8)';
  } else {
    nav.style.background = 'transparent';
  }
});
