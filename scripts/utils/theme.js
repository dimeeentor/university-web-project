// Main Contributor: Dmytro HONCHARENKO
document.addEventListener("DOMContentLoaded", function () {
  const currentTheme = window.localStorage.getItem("theme")
  const themeBtns = document.querySelectorAll(".theme-switcher button")
  const currentThemeBtn = document.getElementById(`${currentTheme}`)

  // Set the default theme to "auto" if it is not already set
  if (!currentTheme) window.localStorage.setItem("theme", "auto")

  themeBtns.forEach((button) => {
    if (button.textContent.toLowerCase() === currentTheme) {
      button.classList.add("active")
    }

    button.addEventListener("click", () => {
      doToggleTheme(themeBtns, button)
    })
  })

  doToggleTheme(themeBtns, currentThemeBtn)

  /**
   * Sets the theme for the document body.
   * @param {string} theme - The theme to be set.
   */
  function setTheme(theme) {
    document.body.classList.remove("light-theme", "dark-theme", "auto-theme")
    document.body.classList.add(`${theme}-theme`)
    window.localStorage.setItem("theme", theme)
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
  }
})
