// Main Contributor: Dmytro HONCHARENKO
const currentTheme = window.localStorage.getItem("theme")

const themeBtns = document.querySelectorAll(".theme-switcher > button")
const lightThemeBtn = document.querySelector(".light")
const darkThemeBtn = document.querySelector(".dark")
const autoThemeBtn = document.querySelector(".auto")

// Set the default theme to "auto" if it is not already set
if (!currentTheme) {
  window.localStorage.setItem("theme", "auto")
}

// Add the "active" class to the button that matches the current theme
themeBtns.forEach((button) => {
  if (button.textContent.toLowerCase() === currentTheme) {
    button.classList.add("active")
  }
})

lightThemeBtn.addEventListener("click", () =>
  doToggleTheme(themeBtns, lightThemeBtn)
)
darkThemeBtn.addEventListener("click", () => doToggleTheme(themeBtns, darkThemeBtn))
autoThemeBtn.addEventListener("click", () => doToggleTheme(themeBtns, autoThemeBtn))

window.addEventListener("DOMContentLoaded", () => {
  const currentThemeBtn = document.querySelector(`.${currentTheme}`)
  doToggleTheme(themeBtns, currentThemeBtn)
})

/**
 * Sets the theme for the document body.
 * @param {string} theme - The theme to be set.
 */
function setTheme(theme) {
  document.body.classList.remove("light-theme", "dark-theme", "auto-theme")
  document.body.classList.add(`${theme}-theme`)
}

/**
 * Toggles the theme based on the clicked button and applies it to the document body.
 * @param {NodeList} btns - The list of buttons.
 * @param {HTMLElement} clickedBtn - The clicked button.
 */
function doToggleTheme(btns, clickedBtn) {
  for (const btn of btns) {
    btn.classList.remove("active")
  }
  clickedBtn.classList.add("active")
  setTheme(clickedBtn.textContent.toLowerCase())
  window.localStorage.setItem("theme", clickedBtn.textContent.toLowerCase())
}
