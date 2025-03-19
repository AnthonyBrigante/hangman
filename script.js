//word list
const wordlist = [
'gold',
'luck',
'clover',
'rain',
'charm',
'parade',






]

//declare varibale
let selectedWord =''
let displaydWord =''
let wrongGuesses = 0
let  guessedLetters = []
const maxMistakes = 6


// start game function (runs everything)
function startGame(level) {
    //reset game
    wrongGuesses = 0
    guessedLetters = []

    selectedWord = getRandomWord(level)
    updateDifficultyDisplay(level)
    

//show game area and difficulty display, hide selection buttons
document.getElementById('gameArea').classList.remove('d-none')
document.getElementById('gameArea').classList.add('d-block')

document.getElementById('difficultyBox').classList.remove('d-none')
document.getElementById('difficultyBox').classList.add('d-block')

document.getElementById('difficultySelection').classList.add('d-none')
}




function getRandomWord(level){
    let filteredWords = wordlist.filter ( word => {
if (level === 'easy') return word.length <= 4
if (level === 'medium') return word.length >= 5 && word.length <=7
if (level === 'hard') return word.length >=8
    })
    return filteredWords[Math.floor(Math.random()*filteredWords.length)]
}


//update difficulty display
function updateDifficultyDisplay(level){
let difficultyBox = document.getElementById('difficultyBox')
difficultyBox.classList.remove('easy','medium','hard')
 
if(level === 'easy') {
difficultyBox.innerText = 'difficulty: easy'
difficultyBox.classList.add('easy')
}else if(level === 'medium'){
    difficultyBox.innerText = 'difficulty: medium'
    difficultyBox.classList.add('medium')
}else if(level === 'hard'){
    difficultyBox.innerText = 'difficulty: hard'
    difficultyBox.classList.add('hard')
}

}