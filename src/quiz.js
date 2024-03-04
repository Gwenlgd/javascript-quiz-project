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
    this.correctAnswers++;
  }
  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) {
      return false;
    } else if (this.currentQuestionIndex === this.questions.length) {
      return true;
    }
  }
}
