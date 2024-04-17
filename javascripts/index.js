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
      let h2 = document.querySelector('#spaces H2');
      let count = 0;

      while (count < blanksCount) {
        let span = document.createElement('SPAN');
        h2.parentNode.appendChild(span);
        count ++;
      }
    }
  }

  function handleKeyup(e) {
    function notAlphabetic(key) {
      return !/[A-Z]/.test(key);
    }
  
    function alreadyGuessed(key) {
      return game.guessedLetters.includes(key);
    }
  
    function addToGuessed(key) {
      game.guessedLetters.push(key);
  
      let h2 = document.querySelector('#guesses H2');
      let span = document.createElement('SPAN');
      span.textContent = key;
      h2.parentNode.appendChild(span);
    }
  
    function hasLetter(key) {
      return game.word.includes(key);
    }
  
    function revealLetters(key) {
      let spans = document.querySelectorAll('#spaces SPAN'); 
  
      for (i = 0; i < spans.length; i ++) {
        let span = spans[i];
        if (span.textContent === '' && game.word[i] === key) {
          span.textContent = key;
        }
      }
    }
  
    function removeApple() {
      let applesDiv = document.getElementById('apples');
      let classStr = `guess_${game.wrongGuesses}`;
      applesDiv.className = classStr;
    }
  
    function gameOver(msg, status) {
      document.getElementById('replay').hidden = false;
      document.getElementById('message').textContent = `${msg}`;
      document.removeEventListener('keyup', handleKeyup);
      document.body.className = `${status}`;
    }
  
    function playerGuessesWord() {
      let spans = document.querySelectorAll('#spaces SPAN');
      return Array.from(spans).every(span => span.textContent !== '');
    }
  
    const guess = e.key.toUpperCase();
  
    if (notAlphabetic(guess) || alreadyGuessed(guess)) {
      return;
    } else {
      addToGuessed(guess);
      
      if (hasLetter(guess)) {
        revealLetters(guess);

        if (playerGuessesWord()) {
          let msg = "Congratulations, you win!";
          let status = 'win';
          gameOver(msg, status);
        }
      } else {
        game.wrongGuesses ++;
        removeApple();
        
        if (game.wrongGuesses === game.totalGuessesAllowed) {
          let msg = "Sorry, you're out of guesses!";
          let status = 'lose';
          gameOver(msg, status);
        }
      }
    }
  }

  function resetGame(e) {
    e.preventDefault();

    document.getElementById('apples').className = '';

    // replace children from guesses and spaces with first child
    let spaceDiv = document.getElementById('spaces');
    let guessesDiv = document.getElementById('guesses');
    let spacesDivChildren = spaceDiv.children;
    let guessesDivChildren = guessesDiv.children;
    spaceDiv.replaceChildren(spacesDivChildren[0]);
    guessesDiv.replaceChildren(guessesDivChildren[0]);
    
    document.getElementById('message').textContent = '';
    document.getElementById('replay').hidden = true;
    document.body.className = '';

    new Game();
  }

  let game = new Game();

  document.addEventListener('keyup', handleKeyup)
  document.getElementById('replay').addEventListener('click', resetGame)
})