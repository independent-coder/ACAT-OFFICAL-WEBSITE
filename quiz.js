document.addEventListener("DOMContentLoaded", function () {
  let questions = [
    {
      question: "What is Python?",
      answers: {
        correct: "A programming language",
        incorrect: "A type of snake",
        Code_Number: "2",
      },
    },
    {
      question: "What is Linux?",
      answers: {
        correct: "An open-source operating system",
        incorrect: "A programming language",
        Code_Number: "0",
      },
    },
    {
      question: "What is Windows?",
      answers: {
        correct: "An operating system developed by Microsoft",
        incorrect: "A type of glass",
        Code_Number: "6",
      },
    },
    {
      question: "What is the primary function of the command PRINT in python?",
      answers: {
        correct:
          "The print() function prints the specified message to the screen",
        incorrect: "Print a message on paper using a printer",
        Code_Number: "9",
      },
    },
  ];

  // Create an array to store the original order of code numbers
  let codeNumberOrder = questions.map(
    (question) => question.answers.Code_Number
  );

  // Function to shuffle the questions array while keeping the code number order consistent
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  shuffleArray(questions); // Shuffle the questions array

  // Restore the original order of code numbers
  for (let i = 0; i < questions.length; i++) {
    questions[i].answers.Code_Number = codeNumberOrder[i];
  }

  let currentQuestion = 0;
  let score = 0;
  let correctQuestions = [];

  const questionElement = document.getElementById("question");
  const resultElement = document.getElementById("result");
  const nextButton = document.getElementById("next-button");
  const codeLockerElement = document.getElementById("code-locker");

  function displayQuestion() {
    questionElement.textContent = `Question ${currentQuestion + 1}: ${
      questions[currentQuestion].question
    }`;
    const answers = questions[currentQuestion].answers;
    const radioButtons = document.querySelectorAll("input[name='answer']");
    radioButtons[0].value = answers.correct;
    radioButtons[0].nextSibling.textContent = answers.correct;
    radioButtons[1].value = answers.incorrect;
    radioButtons[1].nextSibling.textContent = answers.incorrect;
  }

  function checkAnswer(answer) {
    if (answer === questions[currentQuestion].answers.correct) {
      score++;
      correctQuestions.push(currentQuestion);
    }
  }

  function showResult() {
    let resultMessage = `You got ${score} out of ${questions.length} questions correct.`;
    if (score !== 0 && correctQuestions.length > 0) {
      resultMessage += `<br />You got the following questions correct, you now have these code to enter: `;
      for (const questionIndex of correctQuestions) {
        resultMessage += `${questions[questionIndex].answers.Code_Number}, `;
      }
      resultMessage = resultMessage.slice(0, -2); // Remove the trailing comma and space
      resultMessage += `. Well done!`;
      codeLockerElement.innerHTML = `<a href="CL.html">CodeLocker</a>`;
    }
    resultElement.innerHTML = resultMessage;
    resultElement.style.display = "block";
    nextButton.style.display = "none";
  }

  function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      displayQuestion();
    } else {
      showResult();
    }
  }

  displayQuestion();

  nextButton.addEventListener("click", () => {
    const selectedAnswer = document.querySelector(
      "input[name='answer']:checked"
    );
    if (selectedAnswer) {
      checkAnswer(selectedAnswer.value);
      selectedAnswer.checked = false;
      nextQuestion();
    }
  });
});
