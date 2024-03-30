import { doChooseFontSize, doChooseTheme } from "./utils.js"
import { questions } from "./questions.js"

const changeFontBtn = document.getElementById("change-font-size")
const themeBtns = document.querySelectorAll(".theme-switcher > button")
const lightThemeBtn = document.querySelector(".light")
const darkThemeBtn = document.querySelector(".dark")
const autoThemeBtn = document.querySelector(".auto")

const currentQuestion = document.querySelector(".current-question")
const question = document.getElementById("question")
const score = document.getElementById("score")

const answerBtns = document.querySelectorAll('input[name="answer"]')
const answers = document.querySelectorAll(".answer")

const answerInput = document.getElementById("answer-input")
const checkBtn = document.getElementById("check-btn")

let currentQuestionIndex = 0
let scoreNumber = 0

checkBtn.addEventListener("click", () => doNextQuestion())

answerInput.addEventListener("keyup", ({ key }) => {
  if (key === "Enter") doNextQuestion()
})

changeFontBtn.addEventListener("click", () => doChooseFontSize())

lightThemeBtn.addEventListener("click", () => {
  doChooseTheme(themeBtns, lightThemeBtn)
})

darkThemeBtn.addEventListener("click", () => {
  doChooseTheme(themeBtns, darkThemeBtn)
})

autoThemeBtn.addEventListener("click", () => {
  doChooseTheme(themeBtns, autoThemeBtn)
})

window.addEventListener("DOMContentLoaded", () => {
  doShuffleArray(questions)
  doShowQuestion(currentQuestionIndex)
})

function doNextQuestion() {
  const currentQuestion = questions[currentQuestionIndex]
  const result = doCheckAnswer(currentQuestion.type)
  const answerStatus = typeof result === "string" ? false : result

  doAddProperClass(answerStatus)
  doRemoveProperClass(600)

  switch (result) {
    case true:
      score.textContent = `Score: ${++scoreNumber}`
      doIncrementQuestionIndex()
      return doShowQuestion(currentQuestionIndex)
    case false:
      doIncrementQuestionIndex()
      return doShowQuestion(currentQuestionIndex)
    case "empty":
      return doShowQuestion(currentQuestionIndex)
  }
}

function doCheckAnswer(type) {
  switch (type) {
    case "multiple":
      return doCheckMultipleAnswers()
    case "input":
      return doCheckInputAnswer()
    case "single":
      return doCheckSingleAnswer()
  }
}

function doCheckMultipleAnswers() {
  const checkedCheckboxes = document.querySelectorAll('input[name="answer"]:checked')
  const selectedAnswers = Array.from(checkedCheckboxes).map((el) => el.value)
  const correctAnswers = questions[currentQuestionIndex].answers.filter(
    (answer) => answer.isCorrect
  )
  const isCorrect = selectedAnswers.length === correctAnswers.length
  checkedCheckboxes.forEach((el) => (el.checked = false))

  if (!checkedCheckboxes.length) return "empty"
  else return isCorrect
}

function doCheckSingleAnswer() {
  const checkedRadio = document.querySelector('input[name="answer"]:checked')
  const selectedAnswer = checkedRadio?.value
  const correctAnswer = questions[currentQuestionIndex].answers.filter(
    (answer) => answer.isCorrect
  )[0].answer
  const isCorrect = correctAnswer === selectedAnswer

  if (!checkedRadio) return "empty"
  else {
    checkedRadio.checked = false
    return isCorrect
  }
}

function doCheckInputAnswer() {
  const possibleAnswer = answerInput.value.toLowerCase().trim()
  const correctAnswer = questions[currentQuestionIndex].answers
    .filter((answer) => answer.isCorrect)[0]
    .answer.toLowerCase()
  const isCorrect = possibleAnswer === correctAnswer

  doAddProperStyles(false)

  if (!possibleAnswer) return "empty"
  else return isCorrect
}

function doIncrementQuestionIndex() {
  currentQuestionIndex++
  if (currentQuestionIndex === questions.length) {
    alert(`Quiz is over! Your score is: ${scoreNumber}/${questions.length}`)
    currentQuestionIndex = 0
    scoreNumber = 0
    score.textContent = "Score: 0"
    doShuffleArray(questions)
  }
}

function doAddProperClass(isCorrect) {
  if (isCorrect) {
    currentQuestion.classList.add("correct-answer")
  } else {
    currentQuestion.classList.add("incorrect-answer")
  }
}

function doRemoveProperClass(after) {
  setTimeout(() => {
    currentQuestion.classList.remove("correct-answer")
    currentQuestion.classList.remove("incorrect-answer")
  }, after)
}

function doAddProperStyles(isActive) {
  if (isActive) {
    answers.forEach((el) => el.classList.add("input-mode"))
    answerInput.style.padding = "0 12px"
    answerInput.style.width = "100%"
    answerInput.style.opacity = "1"
    answerInput.focus()
  } else {
    answers.forEach((el) => el.classList.remove("input-mode"))
    answerInput.style.padding = "0"
    answerInput.style.width = "0"
    answerInput.style.opacity = "0"
    answerInput.value = ""
    answerInput.blur()
  }
}

function doShowQuestion(index) {
  const currentQuestion = questions[index]
  question.textContent = currentQuestion.question
  questionIndex.textContent = `Question #${index + 1}`
  for (let i = 0; i < answers.length; i++) {
    answers[i].textContent = currentQuestion.answers[i].answer
    answerBtns[i].value = currentQuestion.answers[i].answer
    switch (currentQuestion.type) {
      case "multiple":
        answerBtns[i].type = "checkbox"
        break
      case "input":
        answerBtns[i].type = "hidden"
        doAddProperStyles(true)
        break
      case "single":
        answerBtns[i].type = "radio"
    }
  }
}

function doShuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

// function doChooseFontSize() {
//   const selectedSize = prompt("Choose a font size: 9 – 18")
//   const parsedSize = parseInt(selectedSize)
//   if (parsedSize >= 9 && parsedSize <= 18) {
//     document.body.style.fontSize = `${parsedSize}px`
//   }
// }
