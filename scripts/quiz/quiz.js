// Main Contributor: Dmytro HONCHARENKO
import { questions } from "./questions.js"
import { doShuffleArray, getCorrectAnswer } from "./utils.js"

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
  key === "Enter" ? doNextQuestion() : null
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

  if (result !== "empty") {
    if (result) {
      score.textContent = `Score: ${++scoreNumber}`
    }
    doIncrementQuestionIndex()
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
  const correctAnswers = getCorrectAnswer(questions, currentQuestionIndex)
  const isCorrect = selectedAnswers.length === correctAnswers.length
  checkedCheckboxes.forEach((el) => (el.checked = false))

  if (!checkedCheckboxes.length) return "empty"
  else return isCorrect
}

function doCheckSingleAnswer() {
  const checkedRadio = document.querySelector('input[name="answer"]:checked')
  const selectedAnswer = checkedRadio?.value
  const correctAnswer = getCorrectAnswer(questions, currentQuestionIndex)[0].answer
  const isCorrect = correctAnswer === selectedAnswer

  if (!checkedRadio) return "empty"
  else {
    checkedRadio.checked = false
    return isCorrect
  }
}

function doCheckInputAnswer() {
  const possibleAnswer = answerInput.value.toLowerCase().trim()
  const correctAnswer = getCorrectAnswer(
    questions,
    currentQuestionIndex
  )[0].answer.toLowerCase()
  const isCorrect = possibleAnswer === correctAnswer

  if (!possibleAnswer) return "empty"
  else {
    doToggleInputMode(false)
    return isCorrect
  }
}

function doToggleInputMode(isActive) {
  answers.forEach((el) => el.classList.toggle("input-mode", isActive))
  answerInput.style.padding = isActive ? "0 12px" : "0"
  answerInput.style.width = isActive ? "100%" : "0"
  answerInput.style.opacity = isActive ? "1" : "0"
  answerInput.style.marginRight = isActive ? "8px" : "0"
  if (isActive) {
    answerInput.focus()
  } else {
    answerInput.value = ""
    answerInput.blur()
  }
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
        doToggleInputMode(true)
        break
      case "single":
        answerBtns[i].type = "radio"
    }
  }
}
