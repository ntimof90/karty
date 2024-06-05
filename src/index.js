import ThemeToggler from './components/theme-toggler/theme-toggler';

const themeToggler = new ThemeToggler({
  togglerSelector: '.theme-toggler',
  buttonSelector: '.theme-toggler__btn'
});

themeToggler.init();