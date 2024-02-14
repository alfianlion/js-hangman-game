let wordList = ['Apple','Banana','Cherry','Durian','Guava','Jackfruit', 'Orange', 'Tomato', 'Watermelon', 'Grapefruit','Chilli','Strawberry','Blueberry','Raspberry','Pineapple','Starfruit']
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

function revealLetter(index, letter){
	// remove the * from index, add letter to the same index
	hiddenWord = hiddenWord.slice(0,index) + hiddenWord.slice(index+1)
	hiddenWord = hiddenWord.slice(0,index) + letter + hiddenWord.slice(index) 
	return hiddenWord
}

function displayWord(w){
	return document.getElementById('word-answer').innerHTML = w
}

function initGame(){
	 wordList = ['Apple','Banana','Cherry','Durian','Guava','Jackfruit', 'Orange', 'Tomato', 'Watermelon', 'Grapefruit','Chilli','Strawberry','Blueberry','Raspberry','Pineapple','Starfruit']
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
	document.getElementById('submit').style.display = "none"

	console.log("Selected Word:",selectedWord)
	console.log(wordList)
}

function toggleGameDisplay(state){
	let gameButton = document.getElementsByClassName('alphabet')
	if (state == false){
		document.getElementById('play').style.display = "block"
		document.getElementById('counter').style.display = "none"
		document.getElementById('submit').style.display = "none"
		document.getElementById('userInput').style.display = "none"
		document.getElementById('word-answer').innerHTML = "Welcome! Press 'Play' to Begin"
		for (var index = 0; index < gameButton.length; index ++){
			gameButton[index].disabled = true
		}
	} else {
		document.getElementById('play').style.display = "none"
		document.getElementById('counter').style.display = "block"
		document.getElementById('submit').style.display = "block"
		document.getElementById('userInput').value = ""
		document.getElementById('counter').innerHTML = "Guess counter: " + guessCounter
		for (var index = 0; index < gameButton.length; index ++){
			gameButton[index].disabled = false 
		}
	}
}

function incrementGuessCounter(){
	let counterText = document.getElementById('counter')
	let userText = document.getElementById('userInput')
	let guessButton = document.getElementById('submit')
	let gameButton = document.getElementsByClassName('alphabet')

	guessCounter -= 1
	// increament the counter by one if user made a guess
	if (guessCounter != 0){
		counterText.innerHTML = "Guess counter: " + guessCounter
	} else {
		// Ask user for their word guess
		counterText.innerHTML = "Guess the word: "
		userText.style.display = 'block'
		guessButton.style.display = 'block'
		for (var index = 0; index < gameButton.length; index ++){
			gameButton[index].disabled = true
		}
	}
	return guessCounter
}

function checkAnswer(){
	let textField = document.getElementById('userInput')
	let answer = textField.value
	if (answer == selectedWord){
		toggleGameDisplay(false)
		document.getElementById('word-answer').innerHTML = "You Win! Click 'Play' to start again"
	} else {
		toggleGameDisplay(false)
		document.getElementById('word-answer').innerHTML = "You Lost! Click 'Play' to start again"
	}
}

function getButtonValue(buttonGuess){
	let button = document.getElementById(buttonGuess)
	let buttonValue = button.value
	button.disabled = true
	incrementGuessCounter()
	findValueinWord(buttonValue, selectedWord)
	return buttonValue 
}

function findValueinWord(letter, sWord){
	//TODO: get the letter
	// 		check if any alphabet in selectedWord match letter
	// 		unhide the alphabet in the word and re-set in hiddenWord
	// 		displayWord to player
	for(index = 0; index < sWord.length; index++){
		if (sWord[index] == letter){
			revealLetter(index,letter)
			displayWord(hiddenWord)
		}
	}
}
