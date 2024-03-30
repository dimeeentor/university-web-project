const changeFontBtn = document.getElementById("change-font-size")

changeFontBtn.addEventListener("click", () => doChooseFontSize())

function doChooseFontSize() {
  const selectedSize = prompt("Choose a font size: 9 – 18")
  const parsedSize = parseInt(selectedSize)
  if (parsedSize >= 9 && parsedSize <= 18) {
    document.body.style.fontSize = `${parsedSize}px`
  }
}
