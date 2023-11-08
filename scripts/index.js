const colorSchemeLabel = document.querySelector('.header__toggle-label');
const colorSchemeToggle = document.querySelector('.header__toggle');

const darkModeHandler = (e) => e.matches ? colorSchemeLabel.textContent = 'LIGHT' : colorSchemeLabel.textContent = 'DARK';

matchMedia('(prefers-color-scheme: dark)').addEventListener('change', darkModeHandler);

colorSchemeToggle.addEventListener("click", () => {
  if (matchMedia("(prefers-color-scheme: dark)").matches) {
    document.body.classList.toggle("light");
    colorSchemeLabel.textContent = 'LIGHT'
  } else {
    document.body.classList.toggle("dark");
    colorSchemeLabel.textContent = 'DARK'
  }
});