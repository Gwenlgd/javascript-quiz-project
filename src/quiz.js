class Quiz {
  constructor(questions, timeLimit, timeRemaining) {
    this.questions = questions;
    this.timeLimit = timeLimit;
    this.timeRemaining = timeRemaining;
    this.correctAnswers = 0;
    this.currentQuestionIndex = 0;
  }
  getQuestion() {
    return this.questions[this.currentQuestionIndex];
  }
  moveToNextQuestion() {
    this.currentQuestionIndex++;
  }
  shuffleQuestions() {
    let currentIndex = this.questions.length - 1;
    while (currentIndex >= 0) {
      let randomIndex = Math.floor(Math.random() * this.currentQuestionIndex);
      let currentCell = this.questions[this.currentQuestionIndex];
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


  // filterQuestionsByDifficulty(difficulty) {

  //   return this.questions.filter((difficulty) => {
  //     let showQuestion = []
  //     if (this.questions.difficulty === 1) {
  //       showQuestion = this.quiz.difficulty === 1
  //     } else if (this.questions.difficulty === 2) {
  //       showQuestion = this.quiz.difficulty === 2
  //     } else if (this.questions.difficulty === 3) {
  //       showQuestion = this.quiz.difficulty === 3
  //     } else {
  //       return this.questions
  //     }
  //     return showQuestion
  //   })
  // }
}
