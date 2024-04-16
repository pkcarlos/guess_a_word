// Bind a keypress event to the document that will check the guessed letter against the word
// Only process key presses that are letters. IN other words, from a to z. You can potentially use the equivalent keycodes for these letters, which run from 97 (a) through 122 (z)
// Add the letter to the array of guessed letters
// If the guess matches at least one letter in the word, output each instance of the guessed letter in the respective blank spaces
// If the guess is not a match, increment the incorrect guess count and change the class name on the apples container to change the count of apples
// If the letter has already been guessed, ignore it



















// When a letter is guessed, write it to the guesses container
// If the number of incorrect guesses matches the number of guesses available for a game (6 in this case), the game is over. Display a message and a link to start a new game. Unbind the keypress event
// If all of the letters of the word have been revealed, display a win message and a link to start a new game. Unbind the keypress event
// When the "Play another" button is clicked, a new game is constructed. The class on the apples container gets reset to show 6 apples again

document.addEventListener('DOMContentLoaded', () => {
  let randomWord = function() {
    let words = ['apple', 'banana', 'orange', 'pear'];
  
    return function() {
      let maxNum = words.length - 1;
      let idx = Math.round((Math.random() * maxNum));
      return words.splice(idx, 1)[0];
    };
  }();

  class Game {
    constructor() {
      this.wrongGuesses = 0;
      this.guessedLetters = [];
      this.totalGuessesAllowed = 6;
      this.word = this.chooseWord();
      this.init();
    }
  
    chooseWord() {
      let word = randomWord();
      let result = word ? word : "Sorry, I've run out of words!";
      return result;
    }
  
    init() {
      let blanksCount = this.word.length;
      let h2 = document.querySelector('H2');
      let count = 0;

      while (count < blanksCount) {
        let span = document.createElement('SPAN');
        h2.parentNode.appendChild(span);
        count ++;
      }
    }
  }

  new Game();

  document.addEventListener('keyup', e => {
    
  })
})