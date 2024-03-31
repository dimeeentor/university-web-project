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
  doChooseTheme(themeBtns, lightThemeBtn)
)
darkThemeBtn.addEventListener("click", () => doChooseTheme(themeBtns, darkThemeBtn))
autoThemeBtn.addEventListener("click", () => doChooseTheme(themeBtns, autoThemeBtn))

document.body.classList.add(`${currentTheme}-theme`)

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

  switch (clickedBtn.textContent.toLowerCase()) {
    case "light":
      document.body.classList.remove("dark-theme", "auto-theme")
      document.body.classList.add("light-theme")
      break
    case "dark":
      document.body.classList.remove("light-theme", "auto-theme")
      document.body.classList.add("dark-theme")
      break
    case "auto":
      document.body.classList.remove("light-theme", "dark-theme")
      document.body.classList.add("auto-theme")
      break
  }

  window.localStorage.setItem("theme", clickedBtn.textContent.toLowerCase())
}

/**
 * Sets up event listeners for theme buttons and applies the selected theme to the document body.
 * @param {Array<HTMLButtonElement>} elems - An array of theme button elements.
 * @param {HTMLButtonElement} clickedBtn - A theme button that was clicked.
 */
function doChooseTheme(elems, clickedBtn) {
  elems.forEach((_) => {
    doToggleTheme(elems, clickedBtn)
  })
}
