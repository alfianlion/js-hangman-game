let wordList = ['Apple','Banana','Cherry','Durian','Guava','Jackfruit']
let selectedWord = ''
let hiddenWord = ''
let guessCounter = 3
let gameState = false

toggleGameDisplay(gameState)

function randomizedWord(wList){
	const index = Math.floor(Math.random() * wList.length)
	selectedWord = wList.at(index) 
	selectedWord = selectedWord.toLowerCase()
	removeWordinList(index,wList)
	return selectedWord 
}

function removeWordinList(index, wList){
	return wList.splice(index,1)	
}

function hideWord(w){
	for(i=0;i<w.length;i++){
		hiddenWord += '*'	
	}
	return hiddenWord
}

function displayWord(w){
	return document.getElementById('word-answer').innerHTML = w
}

function initGame(){
	wordList = ['Apple','Banana','Cherry','Durian','Guava','Lime']
	selectedWord = ''
	hiddenWord = ''
	guessCounter = 3
	gameState = false 
	toggleGameDisplay(gameState)
}

function startGame(){	
	initGame()

	toggleGameDisplay(true)
	randomizedWord(wordList)
	hideWord(selectedWord)
	displayWord(hiddenWord)

	console.log("Selected Word:",selectedWord)
	console.log(wordList)
}

function toggleGameDisplay(state){
	let gameButton = document.getElementsByClassName('alphabet')
	if (state == false){
		document.getElementById('play').style.display = "block"
		document.getElementById('counter').style.display = "none"
		document.getElementById('word-answer').innerHTML = "Welcome! Press 'Play' to Begin"
		for (var index = 0; index < gameButton.length; index ++){
			gameButton[index].disabled = true
		}
	} else {
		document.getElementById('play').style.display = "none"
		document.getElementById('counter').style.display = "block"
		document.getElementById('counter').innerHTML = "Guess counter: " + guessCounter
		for (var index = 0; index < gameButton.length; index ++){
			gameButton[index].disabled = false 
		}
	}
}

function incrementGuessCounter(){
	let counterText = document.getElementById('counter')
	let userText = document.getElementById('userInput')
	let guessButton = document.getElementById('userGuess')

	// increament the counter by one if user made a guess
	if (guessCounter > 1){
		guessCounter -= 1
		counterText.innerHTML = "Guess counter: " + guessCounter
	} else {
		// Ask user for their word guess
		counterText.innerHTML = "Guess the word: "
		userText.style.display = 'block'
		guessButton.style.display = 'block'
	}
	return guessCounter
}

function getButtonValue(buttonGuess){
	let button = document.getElementById(buttonGuess)
	let buttonValue = button.value
	button.disabled = true
	incrementGuessCounter()
	console.log(buttonValue)
	return buttonValue 
}

