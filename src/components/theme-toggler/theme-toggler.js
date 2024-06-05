export default class ThemeToggler {
  constructor({ togglerSelector, buttonSelector }) {
    this._toggler = document.querySelector(togglerSelector);
    this._themeButtons = this._toggler.querySelectorAll(buttonSelector);
  }

  _setTheme(color) {
    document.documentElement.className = `theme-${color}`;
  }

  _setDisabledState(color) {
    this._themeButtons.forEach((button) => {
      if (button.dataset.theme === color) button.disabled = true;
      else button.disabled = false;
    });
  }

  _setListeners() {
    this._themeButtons.forEach((button) => {
      button.onclick = () => {
        const themeColor = button.dataset.theme;
        this._setTheme(themeColor);
        this._setDisabledState(themeColor);
        localStorage.setItem('theme-color', themeColor);
      };
    });
  }

  init() {
    this._setListeners();
    const themeColor = localStorage.getItem('theme-color');
    if (themeColor) {
      this._setTheme(themeColor);
      this._setDisabledState(themeColor);
    }
  }
}