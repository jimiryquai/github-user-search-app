const colorSchemeLabel = document.querySelector('.header__toggle-label');
const colorSchemeToggle = document.querySelector('.header__toggle');
const colorScheme = document.querySelector('#color-scheme');

const darkModeHandler = (e) => e.matches ? colorSchemeLabel.textContent = 'LIGHT' : colorSchemeLabel.textContent = 'DARK';

matchMedia('(prefers-color-scheme: dark)').addEventListener('change', darkModeHandler);
