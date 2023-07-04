// Calculate fade positions based on scroll position
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section');
  const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  const viewportHeight = window.innerHeight;
  const fadeStart = viewportHeight * 0.25;
  const fadeEnd = viewportHeight * 0.75;
  let currentSection, nextSection, fade;

  // Find current and next sections
  for (let i = 0; i < sections.length; i++) {
    const sectionOffset = sections[i].offsetTop;
    const sectionHeight = sections[i].offsetHeight;

    if (scrollPosition >= sectionOffset - fadeStart && scrollPosition < sectionOffset + sectionHeight - fadeEnd) {
      currentSection = sections[i];
      nextSection = sections[i + 1];
      break;
    }
  }

  // Calculate fade opacity
  if (currentSection && nextSection) {
    const currentSectionMiddle = currentSection.offsetTop + currentSection.offsetHeight / 2;
    const nextSectionMiddle = nextSection.offsetTop + nextSection.offsetHeight / 2;

    if (scrollPosition < currentSectionMiddle) {
      fade = 1 - (currentSectionMiddle - scrollPosition) / fadeStart;
    } else {
      fade = 1 - (scrollPosition - currentSectionMiddle) / fadeStart;
    }

    fade = Math.max(0, Math.min(1, fade)); // Clamp fade value between 0 and 1
  }

  // Update background color based on fade
  blendColors('#000', '#fff', fade); // Change the colors as needed
});

// Blend background colors
function blendColors(color1, color2, ratio) {
  const r1 = parseInt(color1.substring(1, 3), 16);
  const g1 = parseInt(color1.substring(3, 5), 16);
  const b1 = parseInt(color1.substring(5, 7), 16);

  const r2 = parseInt(color2.substring(1, 3), 16);
  const g2 = parseInt(color2.substring(3, 5), 16);
  const b2 = parseInt(color2.substring(5, 7), 16);

  const r = Math.round(r1 + (r2 - r1) * ratio);
  const g = Math.round(g1 + (g2 - g1) * ratio);
  const b = Math.round(b1 + (b2 - b1) * ratio);

  const blendedColor = `rgb(${r}, ${g}, ${b})`;
  document.body.style.backgroundColor = blendedColor;
}
