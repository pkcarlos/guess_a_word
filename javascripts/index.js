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
    let words = ['apple', 'banana', 'pear'];
  
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
      this.word = randomWord();
      
      if (this.word) {
        this.word = this.word.toUpperCase();
      } else {
        this.displayMessage("Sorry, I've run out of words!");
        this.hideReplay();
        return this;
      }

      this.init();
    }

    addWordBlanks() {
      let blanksCount = this.word.length;
      let h2 = document.querySelector('#spaces H2');
      let count = 0;

      while (count < blanksCount) {
        let span = document.createElement('SPAN');
        h2.parentNode.appendChild(span);
        count ++;
      }
    }

    removeSpanElements(div) {
      let span = div.querySelectorAll('SPAN');
      
      span.forEach(span => {
        div.removeChild(span);
      })
    }

    resetWordAndGuesses() {
      let spacesDiv = document.getElementById('spaces');
      let guessesDiv = document.getElementById('guesses');

      [spacesDiv, guessesDiv].forEach(div => this.removeSpanElements(div));
    }

    resetDisplay() {
      this.resetWordAndGuesses();
      this.addWordBlanks();
      document.getElementById('apples').className = '';
      document.getElementById('message').textContent = '';
      document.getElementById('replay').hidden = true;
      document.body.className = '';
    }

    init() {
      this.resetDisplay();
      this.handleKeyupBound = this.handleKeyup.bind(this);
      document.addEventListener('keyup', this.handleKeyupBound);
    }

    notAlphabetic(key) {
      return !/^[A-Z]$/.test(key);
    }

    alreadyGuessed(key) {
      return this.guessedLetters.includes(key);
    }

    addToGuessed(key) {
      this.guessedLetters.push(key);
      let h2 = document.querySelector('#guesses H2');
      let span = document.createElement('SPAN');
      span.textContent = key;
      h2.parentNode.appendChild(span);
    }
  
    hasLetter(key) {
      return this.word.includes(key);
    }
  
    revealLetters(key) {
      let spans = document.querySelectorAll('#spaces SPAN'); 
  
      for (let i = 0; i < spans.length; i ++) {
        let span = spans[i];
        if (span.textContent === '' && this.word[i] === key) {
          span.textContent = key;
        }
      }
    }
  
    removeApple() {
      let applesDiv = document.getElementById('apples');
      let classStr = `guess_${this.wrongGuesses}`;
      applesDiv.className = classStr;
    }
  
    unhideReplay() {
      document.getElementById('replay').hidden = false;
    }

    hideReplay() {
      document.getElementById('replay').hidden = true;
    }

    displayMessage(msg) {
      document.getElementById('message').textContent = `${msg}`;
    }

    resetGameStatus(status) {
      document.body.className = `${status}`;
    }

    gameOver(msg, status) {
      this.unhideReplay();
      this.displayMessage(msg);
      this.resetGameStatus(status);
      document.removeEventListener('keyup', this.handleKeyupBound);
    }
  
    playerGuessesWord() {
      let spans = document.querySelectorAll('#spaces SPAN');
      return Array.from(spans).every(span => span.textContent !== '');
    }

    win() {
      let msg = "Congratulations, you win!";
      let status = 'win';
      this.gameOver(msg, status);
    }

    lose() {
      let msg = "Sorry, you're out of guesses!";
      let status = 'lose';
      this.gameOver(msg, status);
    }

    handleKeyup(e) {
      const guess = e.key.toUpperCase();
      
      if (this.notAlphabetic(guess) || this.alreadyGuessed(guess)) {
        return;
      } else {
        this.addToGuessed(guess);
        if (this.hasLetter(guess)) {
          this.revealLetters(guess);
  
          if (this.playerGuessesWord()) {
            this.win();
          }
        } else {
          this.wrongGuesses ++;
          this.removeApple();
          
          if (this.wrongGuesses === this.totalGuessesAllowed) {
            this.lose();
          }
        }
      }
    }
  }

  new Game();

  document.getElementById('replay').addEventListener('click', e => {
    e.preventDefault();

    new Game();
  })
})
