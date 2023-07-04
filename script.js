// Smooth scrolling with background color change
const sections = document.querySelectorAll('section');
let currentSection = sections[0];

function changeBackgroundColor() {
  const windowHeight = window.innerHeight;
  const scrollPosition = window.scrollY || window.pageYOffset;

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const sectionOffset = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (
      scrollPosition >= sectionOffset - windowHeight / 4 &&
      scrollPosition < sectionOffset + sectionHeight - windowHeight / 4
    ) {
      const bgColor = section.getAttribute('data-bg-color');
      document.body.style.backgroundColor = bgColor;
      currentSection = section;
      break;
    }
  }
}

window.addEventListener('scroll', changeBackgroundColor);

