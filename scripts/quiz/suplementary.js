// Main Contributor: Dmytro HONCHARENKO
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

/**
 * Retrieves the correct answer(s) for a given question.
 *
 * @param {Array} questions - The array of questions.
 * @param {number} currentQuestionIndex - The index of the current question.
 * @returns {Array} - The array of correct answers for the current question.
 */
function getCorrectAnswer(questions, currentQuestionIndex) {
  return questions[currentQuestionIndex].answers.filter((answer) => answer.isCorrect)
}

export { doShuffleArray, getCorrectAnswer }
