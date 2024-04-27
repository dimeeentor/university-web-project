// Main Contributor: Dmytro HONCHARENKO
document.addEventListener("DOMContentLoaded", function () {
  const currentQuestion = document.querySelector(".current-question");
  const question = document.getElementById("question");
  const score = document.getElementById("score");
  const answerBtns = document.querySelectorAll('input[name="answer"]');
  const answers = document.querySelectorAll(".answer");
  const answerInput = document.getElementById("answer-input");
  const checkBtn = document.getElementById("check-btn");

  let currentQuestionIndex = 0;
  let scoreNumber = 0;

  checkBtn.addEventListener("click", () => doNextQuestion());
  answerInput.addEventListener("keyup", ({ key }) => {
    key === "Enter" ? doNextQuestion() : null;
  });

  doShuffleArray(questions);
  doShowQuestion(currentQuestionIndex);

  /**
   * Performs the next question logic.
   * @returns {void}
   */
  function doNextQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    const result = doCheckAnswer(currentQuestion.type);
    const answerStatus = typeof result === "string" ? false : result;

    doAddProperClass(answerStatus);
    doRemoveProperClass(600);

    if (result !== "empty") {
      if (result) score.textContent = `Score: ${++scoreNumber}`;
      doIncrementQuestionIndex();
      return doShowQuestion(currentQuestionIndex);
    }
  }

  /**
   * Checks the answer based on the given type.
   * @param {string} type - The type of the answer (multiple, input, single).
   * @returns {void}
   */
  function doCheckAnswer(type) {
    switch (type) {
      case "multiple":
        return doCheckMultipleAnswers();
      case "input":
        return doCheckInputAnswer();
      case "single":
        return doCheckSingleAnswer();
    }
  }

  /**
   * Checks the selected answers against the correct answers and returns the result.
   * @returns {boolean|string} Returns "empty" if no answers are selected, otherwise returns a boolean indicating whether the selected answers are correct.
   */
  function doCheckMultipleAnswers() {
    const checkedCheckboxes = document.querySelectorAll(
      'input[name="answer"]:checked',
    );
    const selectedAnswers = Array.from(checkedCheckboxes).map((el) => el.value);
    const correctAnswers = getCorrectAnswer(questions, currentQuestionIndex);
    const isCorrect = selectedAnswers.length === correctAnswers.length;
    checkedCheckboxes.forEach((el) => (el.checked = false));

    if (!checkedCheckboxes.length) return "empty";
    else return isCorrect;
  }

  /**
   * Checks the selected answer against the correct answer and returns the result.
   * @returns {boolean|string} Returns `true` if the selected answer is correct, `false` if it is incorrect, or `"empty"` if no answer is selected.
   */
  function doCheckSingleAnswer() {
    const checkedRadio = document.querySelector('input[name="answer"]:checked');
    const selectedAnswer = checkedRadio?.value;
    const correctAnswer = getCorrectAnswer(questions, currentQuestionIndex)[0]
      .answer;
    const isCorrect = correctAnswer === selectedAnswer;

    if (!checkedRadio) return "empty";
    else {
      checkedRadio.checked = false;
      return isCorrect;
    }
  }

  /**
   * Checks the user's input answer against the correct answer.
   * @returns {boolean|string} Returns "empty" if the input answer is empty, otherwise returns a boolean indicating whether the answer is correct.
   */
  function doCheckInputAnswer() {
    const possibleAnswer = answerInput.value.toLowerCase().trim();
    const correctAnswer = getCorrectAnswer(
      questions,
      currentQuestionIndex,
    )[0].answer.toLowerCase();
    const isCorrect = possibleAnswer === correctAnswer;

    if (!possibleAnswer) return "empty";
    else {
      doToggleInputMode(false);
      return isCorrect;
    }
  }

  /**
   * Toggles the input mode for the answers.
   * @param {boolean} isActive - Indicates whether the input mode should be active or not
   * @returns {void}
   */
  function doToggleInputMode(isActive) {
    answers.forEach((el) => el.classList.toggle("input-mode", isActive));
    answerInput.style.padding = isActive ? "0 12px" : "0";
    answerInput.style.width = isActive ? "100%" : "0";
    answerInput.style.opacity = isActive ? "1" : "0";
    answerInput.style.marginRight = isActive ? "8px" : "0";
    if (isActive) {
      answerInput.focus();
    } else {
      answerInput.value = "";
      answerInput.blur();
    }
  }

  /**
   * Increments the current question index and performs necessary actions if the quiz is over.
   * @returns {void}
   */
  function doIncrementQuestionIndex() {
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
      alert(`Quiz is over! Your score is: ${scoreNumber}/${length}`);
      currentQuestionIndex = 0;
      scoreNumber = 0;
      score.textContent = "Score: 0";
      doShuffleArray(questions);
    }
  }

  /**
   * Adds a proper class to the current question element based on the correctness of the answer.
   * @param {boolean} isCorrect - Indicates whether the answer is correct or not.
   * @returns {void}
   */
  function doAddProperClass(isCorrect) {
    if (isCorrect) {
      currentQuestion.classList.add("correct-answer");
    } else {
      currentQuestion.classList.add("incorrect-answer");
    }
  }

  /**
   * Removes the "correct-answer" and "incorrect-answer" classes from the current question element after a specified delay.
   * @param {number} after - The delay in milliseconds before removing the classes.
   * @returns {void}
   */
  function doRemoveProperClass(after) {
    setTimeout(() => {
      currentQuestion.classList.remove("correct-answer");
      currentQuestion.classList.remove("incorrect-answer");
    }, after);
    clearTimeout(after);
  }

  /**
   * Displays a question on the screen.
   * @param {number} index - The index of the question to be displayed.
   * @returns {void}
   */
  function doShowQuestion(index) {
    const currentQuestion = questions[index];
    question.textContent = currentQuestion.question;
    questionIndex.textContent = `Question #${index + 1}`;
    for (let i = 0; i < answers.length; i++) {
      answers[i].textContent = currentQuestion.answers[i].answer;
      answerBtns[i].value = currentQuestion.answers[i].answer;
      switch (currentQuestion.type) {
        case "multiple":
          answerBtns[i].type = "checkbox";
          break;
        case "input":
          answerBtns[i].type = "hidden";
          doToggleInputMode(true);
          break;
        case "single":
          answerBtns[i].type = "radio";
      }
    }
  }

  /**
   * Shuffles the elements in the given array using the Fisher-Yates algorithm.
   * @param {Array} array - The array to be shuffled.
   * @returns {Array} - The shuffled array.
   */
  function doShuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  /**
   * Retrieves the correct answer(s) for a given question.
   * @param {Array} questions - The array of questions.
   * @param {number} currentQuestionIndex - The index of the current question.
   * @returns {Array} - The array of correct answers for the current question.
   */
  function getCorrectAnswer(questions, currentQuestionIndex) {
    return questions[currentQuestionIndex].answers.filter(
      (answer) => answer.isCorrect,
    );
  }
});
