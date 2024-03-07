class Quiz {
  constructor(questions, timeLimit, timeRemaining) {
    this.questions = questions;
    this.timeLimit = timeLimit;
    this.timeRemaining = timeRemaining;
    this.correctAnswers = 0;
    this.currentQuestionIndex = 0;
  }
  getQuestion() {
    // console.log(this.questions[this.currentQuestionIndex])

    return this.questions[this.currentQuestionIndex];
  }
  moveToNextQuestion() {
    this.currentQuestionIndex++;
  }
  shuffleQuestions() {
    let currentIndex = this.questions.length - 1;
    while (currentIndex >= 0) {
      let randomIndex = Math.floor(Math.random() * this.questions.length);
      let currentCell = this.questions[currentIndex];
      let randomCell = this.questions[randomIndex];

      let copyTemp = currentCell;
      this.questions[currentIndex] = randomCell;
      this.questions[randomIndex] = copyTemp;
      currentIndex--;
    }
  }
  checkAnswer(answer) {
    const currentQuestion = this.getQuestion()
    // console.log('answer', answer, currentQuestion)
    // console.log(currentQuestion.answer, answer)
    if (currentQuestion.answer === answer) {
      this.correctAnswers++;
    }
  }

  hasEnded() {
    // ? What's up? maybe add a -1 somewhere
    if (this.currentQuestionIndex < this.questions.length) {
      return false;
    } else if (this.currentQuestionIndex === this.questions.length) {
      return true;
    }
  }

  filterQuestionsByDifficulty(difficulty) {
    if (typeof difficulty !== 'number' || difficulty > 3 || difficulty < 1) {
      return
    }
    this.questions = this.questions.filter((question) => {
      return question.difficulty === difficulty
    })

  }

  averageDifficulty() {
    const sum = this.questions.reduce((acc, question) => {
      return acc + question.difficulty;
    }, 0);

    return sum / this.questions.length;
  }

  // Added thursday
  resetQuiz() {
    this.currentQuestionIndex = 0;
    this.correctAnswers = 0;
    this.timeRemaining = this.duration;
  }
};
