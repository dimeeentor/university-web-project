// Main Contributor: Dmytro HONCHARENKO
document.addEventListener("DOMContentLoaded", function () {
  const changeFontBtn = document.getElementById("change-font-size")
  changeFontBtn.addEventListener("click", () => doChooseFontSize())

  /**
   * Prompts the user to choose a font size between 9 and 18 and sets the font size of the document body accordingly.
   * @returns {void}
   */
  function doChooseFontSize() {
    const selectedSize = prompt("Choose a font size: 9 – 18")
    const parsedSize = parseInt(selectedSize)
    if (parsedSize >= 9 && parsedSize <= 18) {
      document.body.style.fontSize = `${parsedSize}px`
      localStorage.setItem("fontSize", parsedSize)
    }
  }

  // Set the font size of the document body to the value stored in the local storage or to 16 if no value is stored.
  window.addEventListener("DOMContentLoaded", () => {
    const fontSize = localStorage.getItem("fontSize")
    if (fontSize) {
      document.body.style.fontSize = `${fontSize}px`
    } else {
      localStorage.setItem("fontSize", 16)
    }
  })
})
