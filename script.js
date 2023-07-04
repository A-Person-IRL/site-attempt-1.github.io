// Change navigation background on scroll
window.addEventListener('scroll', function () {
  const nav = document.querySelector('nav');
  const bodyBackground = document.querySelector('body::before');
  const sections = document.querySelectorAll('section');
  const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;

  const currentSectionIndex = Math.floor(scrollPosition / windowHeight);
  const currentSection = sections[currentSectionIndex];
  const nextSection = sections[currentSectionIndex + 1];

  const currentSectionMiddle = currentSection.offsetTop + currentSection.offsetHeight / 2;
  const nextSectionMiddle = nextSection.offsetTop + nextSection.offsetHeight / 2;

  const fadeStartPosition = currentSection.offsetTop - windowHeight / 4;
  const fadeEndPosition = nextSection.offsetTop - windowHeight / 4;

  const scrollPercentage = (scrollPosition - fadeStartPosition) / (fadeEndPosition - fadeStartPosition);
  const fadeOpacity = Math.max(0, Math.min(1, scrollPercentage));

  const currentColor = currentSection.style.backgroundColor || window.getComputedStyle(currentSection).backgroundColor;
  const nextColor = nextSection.style.backgroundColor || window.getComputedStyle(nextSection).backgroundColor;

  const targetColor = blendColors(currentColor, nextColor, fadeOpacity);

  nav.style.backgroundColor = targetColor;
  bodyBackground.style.backgroundColor = targetColor;
});

// Blend two colors based on opacity
function blendColors(color1, color2, opacity) {
  const parseColor = (color) => color.match(/\d+/g).map(Number);
  const formatColor = (color) => `rgb(${color[0]}, ${color[1]}, ${color[2]})`;

  const rgb1 = parseColor(color1);
  const rgb2 = parseColor(color2);

  const blendedColor = rgb1.map((value, index) => Math.round(value + (rgb2[index] - value) * opacity));
  return formatColor(blendedColor);
}
