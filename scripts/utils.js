/**
 * Prompts the user to choose a font size and applies it to the document body.
 */
function doChooseFontSize() {
  const selectedSize = prompt("Choose a font size: 9 – 18")
  const parsedSize = parseInt(selectedSize)
  if (parsedSize >= 9 && parsedSize <= 18) {
    document.body.style.fontSize = `${parsedSize}px`
  }
}

/**
 * Removes the "active" class from all buttons in the provided array and adds it to the specified button.
 * @param {Array<HTMLButtonElement>} btns - An array of button elements.
 * @param {HTMLButtonElement} clickedBtn - A button element that was clicked.
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
      break
  }
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

function doShuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export { doChooseFontSize, doChooseTheme, doShuffleArray }
