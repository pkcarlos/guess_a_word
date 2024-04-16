// Bind a keypress event to the document that will check the guessed letter against the word
// Only process key presses that are letters. IN other words, from a to z. You can potentially use the equivalent keycodes for these letters, which run from 97 (a) through 122 (z)
// Add the letter to the array of guessed letters
// If the guess matches at least one letter in the word, output each instance of the guessed letter in the respective blank spaces
// If the guess is not a match, increment the incorrect guess count and change the class name on the apples container to change the count of apples
// If the letter has already been guessed, ignore it

/*
- validate key pressed..ignore if key value is not alphabetic or if letter has already been guessed
- add letter to guessedLetters
- if guess appears in chosen word
  - output instances of guessed letter in their respective blank spaces
- if doesn't appear in chosen word
  - wrongGuesses ++
  - change class name in apples container to change count of apples
  - if wrongguesses === totalGuessesAllowed, game over
    - Display message and link to start new game.
    - remove event listener for keyup event

- if Play Another button clicked, new game constructed
- class on apples container gets reset to show 6 apples

*/

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
      this.word = this.chooseWord().toUpperCase();
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

  let game = new Game();

  document.addEventListener('keyup', e => {
    let guess = e.key.toUpperCase();

    if (notAlphabetic(guess) || alreadyGuessed(guess)) {
      // ignore
    } else {
      addToGuessed(guess);
      
      if (game.word.includes(guess)) {
        // output instances of guessed letter in respectivee blank spaces
      } else {
        game.wrongGuesses ++;
        removeApple();
        
        if (game.wrongGuesses === game.totalGuessesAllowed) { gameOver() };
      }
    }
  })

  document.getElementById('replay').addEventListener('click', e => {
    e.preventDefault();

    new Game();
    resetApples();
  })
})