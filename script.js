// Word List
const wordList = [
    'gold', 'luck', 'clover', 'rain', 'charm', 'parade', 'leprechaun', 
    'treasure', 'celebration', 'greenery', 'shenanigans', 'tradition'
];

// Declare variables
let selectedWord = '';
let displayedWord = '';
let wrongGuesses = 0;
let guessedLetters = [];
const maxMistakes = 6;

// Score variables
let wins = 0;
let losses = 0;
let guessedWords = [];

// Load audio elements
const winSound = new Audio('IMG_1895.mp3'); // Cheer sound for winning
const loseSound = new Audio('sounds/Video.mp3'); // Sad trombone sound for losing

// Start Game Function
function startGame(level) {
    wrongGuesses = 0;
    guessedLetters = [];
    selectedWord = getRandomWord(level);
    displayedWord = '_'.repeat(selectedWord.length);

    updateDifficultyDisplay(level);
    updateUI();
    
    // Show Game Area/Difficulty Display, hide selection buttons
    document.getElementById('gameArea').classList.remove('d-none');
    document.getElementById('difficultySelection').classList.add('d-none');
    document.getElementById('difficultyBox').classList.remove('d-none');
    document.getElementById('difficultyBox').classList.add('d-block');
    
    // Auto-focus on input
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

// Update UI
function updateUI() {
    document.getElementById('wordDisplay').textContent = displayedWord.split('').join('  ');
}

// Guess Letter
function guessLetter() {
    let inputField = document.getElementById('letterInput');
    let guessedLetter = inputField.value.toLowerCase();

    // Check if input is valid (A-Z)
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

// Update Wrong Guess
function updateWrongGuess(guessedLetter) {
    wrongGuesses++;

    // Add the guessed letter to the wrong guesses display
    document.getElementById('wrongLetters').textContent += ` ${guessedLetter}`;

    // Update the shamrock image based on the number of wrong guesses
    document.getElementById('shamrock').src = `imgs/shamrock${7 - wrongGuesses}.jpg`;

    // If max mistakes are reached, end the game
    if (wrongGuesses === maxMistakes) {
        endGame(false);
    }
}

// Update Correct Guess
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

    // Check if the player has guessed all letters
    if (!displayedWord.includes('_')) {
        endGame(true);
    }
}

// End Game
function endGame(won) {
    let message = '';

    if (won) {
        message = `You won! The word was "${selectedWord}". 🎉`;
        wins++; // Increase win count
        document.getElementById("winSound").play(); // Play win sound
    } else {
        message = `You lost! The correct word was "${selectedWord}". Better luck next time! 🍀`;
        losses++; // Increase loss count
        document.getElementById("loseSound").play(); // Play lose sound
    }

    updateScoreboard();
    guessedWords.push(selectedWord);
    updateGuessedWords();

    setTimeout(() => alert(message), 100);
}

// Update Scoreboard
function updateScoreboard() {
    document.getElementById('winCount').textContent = wins;
    document.getElementById('lossCount').textContent = losses;
}

// Update Guessed Words
function updateGuessedWords() {
    document.getElementById('guessedWords').textContent = guessedWords.join(', ');
}

// Restart Game
function restartGame() {
    selectedWord = '';
    displayedWord = '';
    wrongGuesses = 0;
    guessedLetters = [];

    // Hide game area and difficulty box
    document.getElementById('gameArea').classList.add('d-none');
    document.getElementById('difficultyBox').classList.add('d-none');

    // Show difficulty selection buttons again
    document.getElementById('difficultySelection').classList.remove('d-none');

    // Clear UI elements
    document.getElementById('wordDisplay').textContent = '_ _ _ _ _';
    document.getElementById('wrongLetters').textContent = 'Wrong Guesses: ';
    document.getElementById('letterInput').value = '';

    // Reset shamrock image to starting state
    document.getElementById('shamrock').src = 'imgs/shamrock7.jpg';

    // Auto-focus back on input
    document.getElementById('letterInput').focus();
}

// Allow Enter to Submit a Guess
document.getElementById('letterInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        guessLetter();
    }
});
