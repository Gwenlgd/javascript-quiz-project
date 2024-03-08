document.addEventListener("DOMContentLoaded", () => {
  /************  HTML ELEMENTS  ************/
  // View divs
  const quizView = document.querySelector("#quizView");
  const endView = document.querySelector("#endView");

  // Quiz view elements
  const progressBar = document.querySelector("#progressBar");
  const questionCount = document.querySelector("#questionCount");
  const questionContainer = document.querySelector("#question");
  const choiceContainer = document.querySelector("#choices");
  const nextButton = document.querySelector("#nextButton");


  // End view elements
  const resultContainer = document.querySelector("#result");


  /************  SET VISIBILITY OF VIEWS  ************/

  // Show the quiz view (div#quizView) and hide the end view (div#endView)
  quizView.style.display = "block";
  endView.style.display = "none";


  /************  QUIZ DATA  ************/

  // Array with the quiz questions
  const questions = [
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
    new Question("What is the capital of France?", ["Miami", "Paris", "Oslo", "Rome"], "Paris", 1),
    new Question("Who created JavaScript?", ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"], "Brendan Eich", 2),
    new Question("What is the mass–energy equivalence equation?", ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"], "E = mc^2", 3),
    // Add more questions here
  ];
  const quizDuration = 120; // 120 seconds (2 minutes)


  /************  QUIZ INSTANCE  ************/

  // Create a new Quiz instance object
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  // Shuffle the quiz questions
  quiz.shuffleQuestions();


  /************  SHOW INITIAL CONTENT  ************/

  // Convert the time remaining in seconds to minutes and seconds, and pad the numbers with zeros if needed
  const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
  const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

  // Display the time remaining in the time remaining container
  const timeRemainingContainer = document.querySelector("#timeRemaining span");
  timeRemainingContainer.innerText = `${minutes}:${seconds}`;

  // Show first question
  showQuestion();


  /************  TIMER  ************/
  let timer;
  // TO REVIEW
  // Start the timer
  startTimer();


  // Timer function
  function startTimer() {
    const timer = setInterval(() => {
      quiz.timeRemaining.minutes--;
      quiz.timeRemaining.seconds--;
      const minutes = quiz.timeRemaining.minutes.toString().padStart(2, "0");
      const seconds = quiz.timeRemaining.seconds.toString().padStart(2, "0");
      timeRemainingContainer.textContent = `${minutes}:${seconds}`;

      if (quiz.timeRemaining.minutes === 0 && quiz.timeRemaining.seconds === 0) {
        clearInterval(timer);
        timeRemainingContainer.textContent = "Time's up!";
        endQuiz();
      }
      console.log
    }, 1000);
  }

  function endQuiz() {
  }


  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);

  /************  FUNCTIONS  ************/

  // showQuestion() - Displays the current question and its choices
  // nextButtonHandler() - Handles the click on the next button
  // showResults() - Displays the end view and the quiz results



  function showQuestion() {
    // If the quiz has ended, show the results
    if (quiz.hasEnded()) {
      showResults();
      return;
    }

    // Clear the previous question text and question choices
    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";

    // Get the current question from the quiz by calling the Quiz class method `getQuestion()`
    const question = quiz.getQuestion();
    // Shuffle the choices of the current question by calling the method 'shuffleChoices()' on the question object
    question.shuffleChoices();



    // YOUR CODE HERE:
    //
    // 1. Show the question
    // Update the inner text of the question container element and show the question text

    const questionElement = document.getElementById('question');
    questionElement.textContent = question.text;
    // console.log(question);

    // 2. Update the green progress bar
    // Update the green progress bar (div#progressBar) width so that it shows the percentage of questions answered
    // This value is hardcoded as a placeholder

    // ?Needed?
    const currentQuestionIndex = quiz.currentQuestionIndex
    const totalQuestions = questions.length
    const progressWidth = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    progressBar.style.width = `${progressWidth}%`;

    // 3. Update the question count text
    // Update the question count (div#questionCount) show the current question out of total questions

    const questionCountElement = document.getElementById('questionCount');
    questionCountElement.textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;


    // 4. Create and display new radio input element with a label for each choice.
    // Loop through the current question `choices`.
    // For each choice create a new radio input with a label, and append it to the choice container.
    // Each choice should be displayed as a radio input element with a label:
    /*
        <input type="radio" name="choice" value="CHOICE TEXT HERE">
        <label for= >CHOICE TEXT HERE</label>
      <br>
    */
    // Hint 1: You can use the `document.createElement()` method to create a new element.
    // Hint 2: You can use the `element.type`, `element.name`, and `element.value` properties to set the type, name, and value of an element.
    // Hint 3: You can use the `element.appendChild()` method to append an element to the choices container.
    // Hint 4: You can use the `element.innerText` property to set the inner text of an element.


    question.choices.forEach((choice, index) => {
      const choiceElement = document.createElement('li');

      const radioInput = document.createElement('input');
      radioInput.type = 'radio';
      radioInput.name = 'choice';
      radioInput.id = `choice-${index}`;
      radioInput.value = choice;

      const label = document.createElement('label');
      label.setAttribute("for", `choice-${index}`);
      label.textContent = choice;

      choiceElement.appendChild(radioInput);
      choiceElement.appendChild(label);

      choiceContainer.appendChild(choiceElement);
    });

  }



  function nextButtonHandler() {
    let selectedAnswer; // A variable to store the selected answer value
    const choiceElements = document.querySelectorAll('input[name="choice"]')
    choiceElements.forEach((choiceElement) => {
      if (choiceElement.checked) {
        const selectedAnswer = choiceElement.value;
        const isCorrect = quiz.checkAnswer(selectedAnswer);
        quiz.moveToNextQuestion();

        showQuestion();
      }
    })
  }




  function showResults() {

    // YOUR CODE HERE:
    //
    // 1. Hide the quiz view (div#quizView)
    quizView.style.display = "none";

    // 2. Show the end view (div#endView)
    endView.style.display = "flex";

    // 3. Update the result container (div#result) inner text to show the number of correct answers out of total questions
    // resultContainer.innerText = `You scored 1 out of 1 correct answers!`;
    // This value is hardcoded as a placeholder

    const correctcheckAnswers = quiz.correctAnswers;
    const totalQuestions = questions.length;
    resultContainer.innerText = `You scored ${correctcheckAnswers} out of ${totalQuestions} correct answers!`;
  }

  const restartBtn = document.querySelector("#restartButton");
  restartBtn.addEventListener('click', restartQuiz);

  function restartQuiz() {
    endView.style.display = 'none';
    quizView.style.display = 'block';
    quiz.resetQuiz();
    showQuestion();
  }



});
