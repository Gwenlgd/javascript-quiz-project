class Question {
  // YOUR CODE HERE:
  //
  // 1. constructor (text, choices, answer, difficulty)
  constructor(text, choices, answer, difficulty) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    this.difficulty = difficulty;

  }
  // 2. shuffleChoices()

  shuffleChoices() {
    let currentIndex = this.choices.length - 1;

    while (currentIndex >= 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      let currentCell = this.choices[currentIndex];
      let randomCell = this.choices[randomIndex];

      let copyTemp = currentCell;
      this.choices[currentIndex] = randomCell;
      this.choices[randomIndex] = copyTemp;

      currentIndex--;
    }
  }
}
