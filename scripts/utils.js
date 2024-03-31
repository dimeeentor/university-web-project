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
 * Shuffles the elements in the given array using the Fisher-Yates algorithm.
 * @param {Array} array - The array to be shuffled.
 * @returns {Array} - The shuffled array.
 */
function doShuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export { doChooseFontSize, doShuffleArray }
