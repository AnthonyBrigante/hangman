// Word List
const wordList = [
    'gold', 'luck', 'clover', 'rain', 'charm', 'parade',
    'leprechaun', 'treasure', 'celebration', 'greenery',
    'shenanigans', 'tradition'
  ];
  
  // Declare game variables
  let selectedWord = '';
  let displayedWord = '';
  let wrongGuesses = 0;
  let guessedLetters = [];
  const maxMistakes = 6;
  
  // Score Tracking Variables
  let wins = 0;
  let losses = 0;
  let guessedWords = [];
  
  // Start Game Function
  function startGame(level) {
      wrongGuesses = 0;
      guessedLetters = [];
  
      selectedWord = getRandomWord(level);
      displayedWord = '_'.repeat(selectedWord.length);
  
      updateDifficultyDisplay(level);
      updateUI();
      
      // Show game area and difficulty box, hide selection screen
      document.getElementById('gameArea').classList.remove('d-none');
      document.getElementById('difficultyBox').classList.remove('d-none');
      document.getElementById('difficultySelection').classList.add('d-none');
  
      // Auto-focus on input field
      document.getElementById('letterInput').focus();
  }
  
  // Get Random Word Based on Difficulty
  function getRandomWord(level) {
      let filteredWords = wordList.filter(word => {
          if (level === 'easy') return word.length <= 4;
          if (level === 'medium') return word.length >= 5 && word.length <= 7;
          if (level === 'hard') return word.length >= 8;
      });
      return filteredWords[Math.floor(Math.random() * filteredWords.length)];
  }
  
  // Update Difficulty Display
  function updateDifficultyDisplay(level) {
      let difficultyBox = document.getElementById('difficultyBox');
      difficultyBox.classList.remove('easy', 'medium', 'hard');
  
      if (level === 'easy') {
          difficultyBox.textContent = 'Difficulty: Easy 🍀';
          difficultyBox.classList.add('easy');
      } else if (level === 'medium') {
          difficultyBox.textContent = 'Difficulty: Medium 🌟';
          difficultyBox.classList.add('medium');
      } else if (level === 'hard') {
          difficultyBox.textContent = 'Difficulty: Hard 💀';
          difficultyBox.classList.add('hard');
      }
  }
  
  // Update UI with the current word progress
  function updateUI() {
      document.getElementById('wordDisplay').textContent = displayedWord.split('').join('  ');
  }
  
  // Guess Letter Function
  function guessLetter() {
      let inputField = document.getElementById('letterInput');
      let guessedLetter = inputField.value.toLowerCase();
  
      // Validate input (must be a single letter)
      if (!guessedLetter.match(/^[a-z]$/)) {
          alert('Please enter a valid letter (A-Z)!');
          inputField.value = '';
          return;
      }
  
      // Check if letter was already guessed
      if (guessedLetters.includes(guessedLetter)) {
          alert(`You already guessed '${guessedLetter}'. Try a different letter!`);
          inputField.value = '';
          return;
      }
  
      // Store guessed letter
      guessedLetters.push(guessedLetter);
  
      // Check if guessed letter is in the selected word
      if (selectedWord.includes(guessedLetter)) {
          updateCorrectGuess(guessedLetter);
      } else {
          updateWrongGuess(guessedLetter);
      }
  
      inputField.value = '';
      document.getElementById('letterInput').focus();
  }
  
  // Handle Wrong Guess
  function updateWrongGuess(guessedLetter) {
      wrongGuesses++;
  
      // Update wrong letters display
      document.getElementById('wrongLetters').textContent += ` ${guessedLetter}`;
  
      // Update shamrock image to reflect mistakes
      document.getElementById('shamrock').src = `imgs/shamrock${7-wrongGuesses}.jpg`;
  
      // If max mistakes are reached, end the game
      if (wrongGuesses === maxMistakes) {
          endGame(false);
      }
  }
  
  // Handle Correct Guess
  function updateCorrectGuess(guessedLetter) {
      let newDisplayedWord = '';
  
      for (let i = 0; i < selectedWord.length; i++) {
          if (selectedWord[i] === guessedLetter) {
              newDisplayedWord += guessedLetter;
          } else {
              newDisplayedWord += displayedWord[i];
          }
      }
  
      displayedWord = newDisplayedWord;
      updateUI();
  
      // Check if the player has guessed the word
      if (!displayedWord.includes('_')) {
          endGame(true);
      }
  }
  
  // End Game Function (Handles Win/Loss)
  function endGame(won) {
      let message = '';
  
      if (won) {
          message = `You won! The word was "${selectedWord}". 🎉`;
          wins++; // Increase win count
          updateScoreboard();
      } else {
          message = `You lost! The correct word was "${selectedWord}". Better luck next time! 🍀`;
          losses++; // Increase loss count
          updateScoreboard();
      }
  
      // Add the guessed word to the list of played words
      guessedWords.push(selectedWord);
      updateGuessedWords();
  
      // Show message after a short delay
      setTimeout(() => alert(message), 100);
  }
  
  // Restart Game Function
  function restartGame() {
      selectedWord = '';
      displayedWord = '';
      wrongGuesses = 0;
      guessedLetters = [];
  
      // Hide game area and difficulty box
      document.getElementById('gameArea').classList.add('d-none');
      document.getElementById('difficultyBox').classList.add('d-none');
  
      // Show difficulty selection screen again
      document.getElementById('difficultySelection').classList.remove('d-none');
  
      // Reset UI elements
      document.getElementById('wordDisplay').textContent = '_ _ _ _ _';
      document.getElementById('wrongLetters').textContent = 'Wrong Guesses: ';
      document.getElementById('letterInput').value = '';
  
      // Reset shamrock image
      document.getElementById('shamrock').src = 'img/shamrock7.jpg';
  
      // Auto-focus back on input field
      document.getElementById('letterInput').focus();
  }
  
  // Update Scoreboard
  function updateScoreboard() {
      document.getElementById('wins').textContent = `Wins: ${wins}`;
      document.getElementById('losses').textContent = `Losses: ${losses}`;
  }
  
  // Update Guessed Words List
  function updateGuessedWords() {
      let guessedWordsList = document.getElementById('guessedWords');
      guessedWordsList.innerHTML = ''; // Clear previous list
  
      guessedWords.forEach(word => {
          let listItem = document.createElement('li');
          listItem.textContent = word;
          guessedWordsList.appendChild(listItem);
      });
  }
  
  // Allow Enter Key to Submit a Guess
  document.getElementById('letterInput').addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
          guessLetter();
      }
  });
  