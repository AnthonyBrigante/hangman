// Word List
const wordList = [
  'gold',
  'luck',
  'clover',
  'rain',
  'charm',
  'parade',
  'leprechaun',
  'treasure',
  'celebration',
  'greenery',
  'shenanigans',
  'tradition'
]

// Declare variables
let selectedWord = ''
let displayedWord = ''
let wrongGuesses = 0
let guessedLetters = []
const maxMistakes = 6

// Start Game Function (runs everything)
function startGame(level) {
  // Reset game
  wrongGuesses = 0
  guessedLetters = []

  selectedWord = getRandomWord(level)
  displayedWord = '_'.repeat(selectedWord.length)

  updateDifficultyDisplay(level)
  updateUI()
  
  // Show Game Area and Difficulty Display, hide selection buttons
  document.getElementById('gameArea').classList.remove('d-none')
  document.getElementById('gameArea').classList.add('d-block')

  document.getElementById('difficultyBox').classList.remove('d-none')
  document.getElementById('difficultyBox').classList.add('d-block')

  document.getElementById('difficultySelection').classList.add('d-none')

  // Auto-focus on input
  document.getElementById('letterInput').focus()
}

// Get Random Word Based on Difficulty
function getRandomWord(level) {
  let filteredWords = wordList.filter(word => {
      if (level === 'easy') return word.length <= 4
      if (level === 'medium') return word.length >= 5 && word.length <= 7
      if (level === 'hard') return word.length >= 8
  })
  return filteredWords[Math.floor(Math.random() * filteredWords.length)]
}

// Update Difficulty Display
function updateDifficultyDisplay(level) {
  let difficultyBox = document.getElementById('difficultyBox')
  difficultyBox.classList.remove('easy', 'medium', 'hard')

  if (level === 'easy') {
      difficultyBox.textContent = 'Difficulty: Easy 🍀'
      difficultyBox.classList.add('easy')
  } else if (level === 'medium') {
      difficultyBox.textContent = 'Difficulty: Medium 🌟'
      difficultyBox.classList.add('medium')
  } else if (level === 'hard') {
      difficultyBox.textContent = 'Difficulty: Hard 💀'
      difficultyBox.classList.add('hard')
  }
}

// Update UI (Display Word)
function updateUI() {
  document.getElementById('wordDisplay').textContent = displayedWord.split('').join('  ') // Show word progress with spaces
}

// Guess Letter Function
function guessLetter() {
  let inputField = document.getElementById('letterInput') // Get input field
  let guessedLetter = inputField.value.toLowerCase() // Convert input to lowercase

  // Check if input is a valid letter (A-Z)
  if (!guessedLetter.match(/^[a-z]$/)) {
      alert('Please enter a valid letter (A-Z)!') // Alert user if invalid input
      inputField.value = '' // Clear input field
      return // Exit function
  }

  // Check if letter was already guessed
  if (guessedLetters.includes(guessedLetter)) {
      alert(`You already guessed '${guessedLetter}'. Try a different letter!`)
      inputField.value = '' // Clear input field
      return
  }

  // Store guessed letter
  guessedLetters.push(guessedLetter)

  // Check if guessed letter is in the selected word
  if (selectedWord.includes(guessedLetter)) {
      updateCorrectGuess(guessedLetter)
  } else {
      updateWrongGuess(guessedLetter)
  }

  inputField.value = '' // Clear input field
  document.getElementById('letterInput').focus() // Refocus input field for next guess
}

// Handle Wrong Guess
function updateWrongGuess(guessedLetter) { 
  wrongGuesses++

  // Add the guessed letter to the wrong guesses display
  document.getElementById('wrongLetters').textContent += ` ${guessedLetter}`

  // Update the shamrock image based on the number of wrong guesses
  document.getElementById('shamrock').src = `img/shamrock${wrongGuesses}.png`

  // If max mistakes are reached, end the game
  if (wrongGuesses === maxMistakes) {
      endGame(false)
  }
}

// Handle Correct Guess
function updateCorrectGuess(guessedLetter) {
  let newDisplayedWord = ''

  for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] === guessedLetter) {
          newDisplayedWord += guessedLetter // Replace underscore with correct letter
      } else {
          newDisplayedWord += displayedWord[i] // Keep existing correct letters
      }
  }

  displayedWord = newDisplayedWord
  updateUI()

  // Check if the player has guessed all letters
  if (!displayedWord.includes('_')) {
      endGame(true)
  }
}

// End Game
function endGame(won) {
  let message = ''

  if (won) {
      message = `You won! The word was "${selectedWord}". 🎉`
  } else {
      message = `You lost! The correct word was "${selectedWord}". Better luck next time! 🍀`
  }

  setTimeout(() => alert(message), 100)
}

// Restart Game
function restartGame() {
  // Reset game
  selectedWord = ''
  displayedWord = ''
  wrongGuesses = 0
  guessedLetters = []

  // Hide game area and difficulty box
  document.getElementById('gameArea').classList.add('d-none')
  document.getElementById('difficultyBox').classList.add('d-none')

  // Show difficulty selection buttons again
  document.getElementById('difficultySelection').classList.remove('d-none')

  // Clear UI elements
  document.getElementById('wordDisplay').textContent = '_ _ _ _ _'
  document.getElementById('wrongLetters').textContent = 'Wrong Guesses: '
  document.getElementById('letterInput').value = ''

  // Reset shamrock image to starting state
  document.getElementById('shamrock').src = 'img/shamrock1.png'

  // Auto-focus back on input (if needed)
  document.getElementById('letterInput').focus()
}

// Allow Enter to submit a guess
document.getElementById('letterInput').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
      guessLetter()
  }
})
