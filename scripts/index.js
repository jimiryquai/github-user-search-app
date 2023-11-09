const colorSchemeLabel = document.querySelector('[class*="header__toggle-label"]');
const colorSchemeToggle = document.querySelector('.header__toggle');
const allElements = Array.from(document.getElementsByTagName("*"));

const setColorSchemeLabelOnLoad = () => matchMedia("(prefers-color-scheme: light)").matches ? colorSchemeLabel.textContent = 'DARK' : colorSchemeLabel.textContent = 'LIGHT';

const toggleModeHandler = () => {
  if(colorSchemeLabel.textContent === 'LIGHT') {
    colorSchemeLabel.textContent = 'DARK';
    allElements.forEach(element => {
      element.classList.remove("dark");
      element.classList.add("light");
    });
  } else {
    if(colorSchemeLabel.textContent === 'DARK') {
      colorSchemeLabel.textContent = 'LIGHT';
      allElements.forEach(element => {
        element.classList.remove("light");
        element.classList.add("dark");
      });
    }
  }
};

const prefersDarkModeHandler = (e) => {
  if (e.matches) {
    colorSchemeLabel.textContent = 'LIGHT';
  }
};

const prefersLightModeHandler = (e) => {
  if (e.matches) {
    colorSchemeLabel.textContent = 'DARK';
  }
};

setColorSchemeLabelOnLoad();
matchMedia('(prefers-color-scheme: light)').addEventListener('change', prefersLightModeHandler);
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', prefersDarkModeHandler);
colorSchemeToggle.addEventListener('click', toggleModeHandler);
