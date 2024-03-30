const questions = [
  {
    question:
      "What is the title of the film where a team of astronauts travels through a wormhole in search of a new home for humanity?",
    answers: [
      { isCorrect: false, answer: "Memento" },
      { isCorrect: false, answer: "Inception" },
      { isCorrect: true, answer: "Interstellar" },
      { isCorrect: false, answer: "Dunkirk" },
    ],
    type: "input",
  },
  {
    question:
      "In which film does a man with short-term memory loss try to find his wife's killer?",
    answers: [
      { isCorrect: false, answer: "The Dark Knight" },
      { isCorrect: false, answer: "Dunkirk" },
      { isCorrect: true, answer: "Memento" },
      { isCorrect: false, answer: "Tenet" },
    ],
    type: "single",
  },
  {
    question:
      "Who plays the role of Batman in the film where he faces off against the Joker in a battle for Gotham City?",
    answers: [
      { isCorrect: false, answer: "Matthew McConaughey" },
      { isCorrect: true, answer: "Christian Bale" },
      { isCorrect: false, answer: "Guy Pearce" },
      { isCorrect: false, answer: "Leonardo DiCaprio" },
    ],
    type: "input",
  },
  {
    question:
      "What is the premise of the film where a professional thief is tasked with planting an idea into the mind of a C.E.O.?",
    answers: [
      { isCorrect: false, answer: "The Dark Knight" },
      { isCorrect: true, answer: "Inception" },
      { isCorrect: false, answer: "Interstellar" },
      { isCorrect: false, answer: "Tenet" },
    ],
    type: "multiple",
  },
  {
    question:
      "Which film depicts British soldiers attempting to evacuate from Dunkirk during World War II?",
    answers: [
      { isCorrect: false, answer: "Inception" },
      { isCorrect: false, answer: "Tenet" },
      { isCorrect: true, answer: "Dunkirk" },
      { isCorrect: false, answer: "Interstellar" },
    ],
    type: "single",
  },
  {
    question:
      "Who stars as the secret agent manipulating the flow of time to prevent a global catastrophe?",
    answers: [
      { isCorrect: false, answer: "Fionn Whitehead" },
      { isCorrect: true, answer: "John David Washington" },
      { isCorrect: false, answer: "Christian Bale" },
      { isCorrect: false, answer: "Leonardo DiCaprio" },
    ],
    type: "input",
  },
  {
    question:
      "Which film involves Batman investigating a series of murders linked to The Riddler?",
    answers: [
      { isCorrect: true, answer: "The Batman (2022)" },
      { isCorrect: false, answer: "Inception" },
      { isCorrect: false, answer: "Memento" },
      { isCorrect: false, answer: "The Dark Knight" },
    ],
    type: "input",
  },
  {
    question:
      "What is the title of the film influenced by Nolan that features a new blade runner uncovering a long-buried secret?",
    answers: [
      { isCorrect: false, answer: "Arrival" },
      { isCorrect: true, answer: "Blade Runner 2049" },
      { isCorrect: false, answer: "Predestination" },
      { isCorrect: false, answer: "The Batman (2022)" },
    ],
    type: "input",
  },
  {
    question:
      "Who directed the film where linguists attempt to communicate with aliens to avert a global conflict?",
    answers: [
      { isCorrect: false, answer: "Christopher Nolan" },
      { isCorrect: true, answer: "Denis Villeneuve" },
      { isCorrect: false, answer: "The Spierig Brothers" },
      { isCorrect: false, answer: "Matt Reeves" },
    ],
    type: "single",
  },
  {
    question:
      "In which film does a temporal agent pursue a criminal across time through a series of predestination paradoxes?",
    answers: [
      { isCorrect: false, answer: "Blade Runner 2049" },
      { isCorrect: false, answer: "Arrival" },
      { isCorrect: true, answer: "Predestination" },
      { isCorrect: false, answer: "Interstellar" },
    ],
    type: "single",
  },
  {
    question: "Which of the following films are directed by Christopher Nolan?",
    answers: [
      { isCorrect: true, answer: "Inception" },
      { isCorrect: true, answer: "Interstellar" },
      { isCorrect: true, answer: "Dunkirk" },
      { isCorrect: true, answer: "Memento" },
    ],
    type: "multiple",
  },
]

const changeFontBtn = document.getElementById("change-font-size")

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

function doChooseFontSize() {
  const selectedSize = prompt("Choose a font size: 9 – 18")
  const parsedSize = parseInt(selectedSize)
  if (parsedSize >= 9 && parsedSize <= 18) {
    document.body.style.fontSize = `${parsedSize}px`
  }
}
