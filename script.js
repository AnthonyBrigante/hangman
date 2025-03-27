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

// Start Game Function
function startGame(level) {
  // Reset game state
  wrongGuesses = 0
  guessedLetters = []

  selectedWord = getRandomWord(level)
  displayedWord = '_'.repeat(selectedWord.length)

  updateDifficultyDisplay(level)
  updateUI()
  
  // Show Game Area & Difficulty Display
  document.getElementById('gameArea').classList.remove('d-none')
  document.getElementById('gameArea').classList.add('d-block')

  document.getElementById('difficultyBox').classList.remove('d-none')
  document.getElementById('difficultyBox').classList.add('d-block')

  document.getElementById('difficultySelection').classList.add('d-none')

  // Auto-focus on input
  document.getElementById('letterInput').focus()
}

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

function updateUI() {
  document.getElementById('wordDisplay').textContent = displayedWord.split('').join('  ')
}

function guessLetter() {
  let inputField = document.getElementById('letterInput')
  let guessedLetter = inputField.value.toLowerCase()

  // Check if input is a valid letter (A-Z)
  if (!guessedLetter.match(/^[a-z]$/)){
    alert('Please enter a valid letter (A-Z)!')
    inputField.value = ''
    return
  }

  // Check if letter was already guessed
  if (guessedLetters.includes(guessedLetter)) {
    alert(`You already guessed '${guessedLetter}'. Try a different letter!`)
    inputField.value = ''
    return
  }

  guessedLetters.push(guessedLetter)

  if (selectedWord.includes(guessedLetter)){
    updateCorrectGuess(guessedLetter)
  } else {
    updateWrongGuess(guessedLetter)
  }

  inputField.value = ''
  document.getElementById('letterInput').focus()
}

// ➡️ Update wrong guesses with shamrock images
function updateWrongGuess(guessedLetter) { 
  wrongGuesses++
  
  // Add the guessed letter to the wrong guesses display
  document.getElementById('wrongLetters').textContent += ` ${guessedLetter}`

  // Add a new shamrock image for each wrong guess
  if (wrongGuesses <= maxMistakes) {
    const img = document.createElement('img')
    img.src = `img/shamrock${wrongGuesses}.jpg`
    img.alt = `Wrong guess ${wrongGuesses}`
    img.classList.add('shamrock-img', 'me-2')

    // Append to the wrong guess container
    document.getElementById('wrongGuessImages').appendChild(img)
  }

  if (wrongGuesses === maxMistakes) {
    endGame(false)
  }
}

function updateCorrectGuess(guessedLetter) {
  let newDisplayedWord = ''

  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i] === guessedLetter) {
      newDisplayedWord += guessedLetter
    } else {
      newDisplayedWord += displayedWord[i]
    }
  }

  displayedWord = newDisplayedWord
  updateUI()

  if (!displayedWord.includes('_')) {
    endGame(true)
  }
}

function endGame(won) {
  let message = won
    ? `You won! The word was "${selectedWord}". 🎉`
    : `You lost! The correct word was "${selectedWord}". Better luck next time! 🍀`
  
  setTimeout(() => alert(message), 100)
}

// ➡️ Reset images and state on restart
function restartGame() {
  selectedWord = ''
  displayedWord = ''
  wrongGuesses = 0
  guessedLetters = []

  document.getElementById('gameArea').classList.add('d-none')
  document.getElementById('difficultyBox').classList.add('d-none')

  document.getElementById('difficultySelection').classList.remove('d-none')

  document.getElementById('wordDisplay').textContent = '_ _ _ _ _'
  document.getElementById('wrongLetters').textContent = 'Wrong Guesses: '
  document.getElementById('letterInput').value = ''

  // ❗ Clear all wrong guess images
  document.getElementById('wrongGuessImages').innerHTML = ''

  // Reset starting shamrock image
  document.getElementById('shamrock').src = 'img/shamrock1.jpg'

  document.getElementById('letterInput').focus()
}

// Allow Enter key to submit a guess
document.getElementById('letterInput').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    guessLetter()
  }
})
