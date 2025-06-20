// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("results-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// Quiz questions
const quizQuestions = [
  {
    question: "What is the main purpose of version control systems like Git?",
    answers: [
      { text: "Compress code files", correct: false },
      { text: "Secure the code from hackers", correct: false },
      { text: "Track changes and collaborate on code", correct: true },
      { text: "Increase execution speed of programs", correct: false },
    ],
  },
  {
    question: "What does CSS control in a web page?",
    answers: [
      { text: "Structure", correct: false },
      { text: "Database", correct: false },
      { text: "Styling and layout", correct: true },
      { text: "Browser speed", correct: false },
    ],
  },
  {
    question: "Which HTTP method is used to update data on a server?",
    answers: [
      { text: "GET", correct: false },
      { text: "PUT", correct: true },
      { text: "DELETE", correct: false },
      { text: "CONNECT", correct: false },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "HTML", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question:
      "Which tool is commonly used for debugging JavaScript in the browser?",
    answers: [
      { text: "Terminal", correct: false },
      { text: "Browser DevTools", correct: true },
      { text: "Notepad", correct: false },
      { text: "Word Processor", correct: false },
    ],
  },
];

  //QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;    

//Event Listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    // reset vars 
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = score;
// Swicth screens

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");
    resultScreen.classList.remove("active");

    showQuestion();
}
function showQuestion() {
    //reset state
    answersDisabled = false;
answersContainer.innerHTML = ""; // Clear previous answers 
    const currentQuestion = quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
totalQuestionsSpan.textContent = quizQuestions.length;
   //Update progress bar
    const progressPercentage = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    questionText.textContent = currentQuestion.question;
     
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");
        // Set data attribute to check if the answer is correct
        if (answer.correct) {
            button.dataset.correct = "true";
        } else {
            button.dataset.correct = "false";
        }
                          
        button.addEventListener("click",selectAnswer);
        answersContainer.appendChild(button);
    });     
}
function selectAnswer(event) {
    if (answersDisabled) return;
    answersDisabled = true;
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    Array.from(answersContainer.children).forEach((button) => {
        if  (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else  if (button === selectedButton) {
            button.classList.add("incorrect");
        }
    });


if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1000);
}

function showResult() {
    
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage === 100) {
        resultMessage.textContent = "Perfect score! Well done!";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Great job!";
    } else if (percentage >= 50) {
        resultMessage.textContent = "Good effort!";
    } else {
        resultMessage.textContent = "Better luck next time!";
    }
    
}



function restartQuiz() {
    resultScreen.classList.remove("active");
    startScreen.classList.add("active");
   startQuiz();
}