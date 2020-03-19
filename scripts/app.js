function init() {

  //  DOM Variables
  const grid = document.querySelector('.grid')
  const reset = document.querySelector('.reset')
  const start = document.querySelector('.start')
  const stopiStart = document.querySelector('.stopStart')
  const scoreSpan = document.querySelector('.score')
  const playerScore = document.querySelector('.score').innerHTML
  let squares = []
  let intervalId = null
  let snakeArray = [3, 2, 1, 0]
  let running = false
  let speed = 300

  

  // Game Variables
  const width = 11 //121 squares
  let direction = 'right'
  let playerP = parseInt(playerScore)


  // (HOW TO MAKE A SIMPLE GRID)
  function createGrid(){
    Array(width * width).join('.').split('.').forEach(() => {
      const square = document.createElement('div')
      square.classList.add('grid-item')
      squares.push(square)
      grid.appendChild(square)
    })
  }
  createGrid()


  function addSnake() {
    snakeArray.forEach(snake => squares[snake].classList.add('snake'))
  }
  function removeSnake(){
    snakeArray.forEach(snake => squares[snake].classList.remove('snake'))
  }


  function handleKeyDown(e) { //KEYBOARD FUNCTION TO MOVE AROUND THE GRID 
    switch (e.keyCode){
      case 39://moves by one right
        if (direction !== 'left')
          direction = 'right'
        break
      case 37: //moves by one left
        if (direction !== 'right')
          direction = 'left'

        break
      case 40: //moves by one down
        if (direction !== 'up')
          direction = 'down'
        break
      case 38: //moves by one up
        if (direction !== 'down')
          direction = 'up'
        break
      default: 
        console.log('player shouldnt move')
    }

  }
  // SNAKE MOVEMENT()
  function moveSnake() {
    if (direction === 'right' && snakeArray[0] % width < width - 1) {
      moveRight()
      // direction !== 'left'
    } else if (direction === 'left' && snakeArray[0] % width > 0){
      moveLeft()
      // direction !== 'right'
    } else if (direction === 'down' && snakeArray[0] + width < width * width){
      moveDown()
      // direction !== 'up'
    } else if (direction === 'up' && snakeArray[0] - width >= 0){
      moveUp()
      // direction !== 'down'
    } else {
      removeSnake()
      clearInterval(intervalId)
      grid.innerHTML = `<div><p>YOU LOSE! YOUR SCORE WAS ${playerP}</p><br><p> press "Reset" to Play Again</p></div>`
      storeScores()
      console.log('player would of lost')
      
    }
    
  }
  function startGame(){
    console.log('start')
    addSnake()
    clearInterval(intervalId)
    speed = 300
    intervalId = setInterval(moveSnake, speed)
    generateFood()
  }

  

  function moveRight (){
    removeSnake()
    snakeArray.unshift(snakeArray[0] + 1)
    // console.log(squares[snakeArray[0]].classList.contains('food'))
    if (!squares[snakeArray[0]].classList.contains('food')) {
      snakeArray.pop()
    }
    snakeEats()
    gameEnd()
    addSnake()
    
  }
  function moveLeft(){
    removeSnake()
    snakeArray.unshift(snakeArray[0] - 1)
    // console.log(squares[snakeArray[0]].classList.contains('food'))
    if (!squares[snakeArray[0]].classList.contains('food')) {
      snakeArray.pop()
    }
    snakeEats()
    gameEnd()
    addSnake()
    gameEnd()
  }
  function moveDown(){
    removeSnake()
    snakeArray.unshift(snakeArray[0] + width)
    // console.log(squares[snakeArray[0]].classList.contains('food'))
    if (!squares[snakeArray[0]].classList.contains('food')) {
      snakeArray.pop()
    }
    snakeEats()
    gameEnd()
    addSnake()
    gameEnd()
  }
  function moveUp(){
    removeSnake()
    snakeArray.unshift(snakeArray[0] - width)
    if (!squares[snakeArray[0]].classList.contains('food')) {
      snakeArray.pop()
    }
    snakeEats()
    gameEnd()
    addSnake()
    gameEnd()
  }

  // SNAKE HITS WALL
  function gameEnd(){
    if (snakeArray.slice(1).includes(snakeArray[0])){
      grid.innerHTML = `<div id="lose"><p> YOU LOSE! YOUR SCORE WAS ${playerP}</p><br><p> press "Reset" to Play Again</p></div>`
      clearInterval(intervalId)
      storeScores()
      // clearGrid()
    }
    // if (squares[snakeArray[0]].classList.contains('wall')){
    //   grid.innerHTML = `<div id="lose"><p>YOU LOSE! YOUR SCORE WAS ${playerP}</p></div>`
    // }
  }


  //FOOD SECTION
  function generateFood (){

    // const randomNumbers = new Set() // create an empty set to push random numbers in to
    // while (randomNumbers.size < 1) {
    //   const randomNumber = Math.floor(Math.random() * (121 - snakeArray ) // generate a random number between 0 and 49
    //   randomNumbers.add(randomNumber) // add randomNumber to the end of the randomNumbers set
    // }
    // randomNumbers.forEach((number) => { // loop through the randomNumbers set
    //   squares[number].classList.add('food') // find the li with the index of the random number and add the class of "active"
    // })
    // produce one random number between 0 - 121, but it cant be any numbers included in the current snake array
    let randomNumber = Math.floor(Math.random() * (width * width))

    while (snakeArray.includes(randomNumber)) {
      randomNumber = Math.floor(Math.random() * (width * width))
    }
    squares[randomNumber].classList.add('food')
  }

  //SNAKE EATS FOOD
  function snakeEats(){
    if (squares[snakeArray[0]].classList.contains('food')) { //square = singular of squares variable
      squares[snakeArray[0]].classList.remove('food')//remove class -> remove color
      playerP = (playerP + 10)
      scoreSpan.innerHTML = playerP
      clearInterval(intervalId)
      speed = speed - 10
      intervalId = setInterval(moveSnake, speed)
      console.log(speed)
      generateFood()
    } 
  }

  function clearGrid(){
    grid.innerHTML = ''
    scoreSpan.innerHTML = 0
    squares = []
    snakeArray = [3, 2, 1, 0]
    direction = 'right'
    playerP = 0
    clearInterval(intervalId)
  }
  
  //Rebuild Grid
  function resetGame(){
    clearGrid()
    createGrid()
    startGame()
  }

  //PAUSE

  function stopStart(){
    console.log('hi')
    if (!running) {
      stopStart.innerHTML = 'Pause' 
      clearInterval(intervalId)
      running = true 
    } else {
      intervalId = setInterval(moveSnake, speed) 
      stopStart.innerHTML = 'Resume' 
      running = false
    }
  }

  //HI SCORE

  let storedHiScore = localStorage.getItem('storedHiScore') ? JSON.parse(localStorage.getItem('storedHiScore')) : null
  const highScore = document.querySelector('.hiScore')
  const data = JSON.parse(localStorage.getItem('storedHiScore'))
  // Function to set up your page to display your high score  
  function hiScoreCreate() {
    if ( storedHiScore) {
      highScore.innerHTML = storedHiScore
    }
    // //if the div is already there then just update it
    // if (storedHiScore) {
    //   hiScore.innerHTML = storedHiScore
    // } else {
    //   const hiScore = document.createElement('div')
    //   hiScore.classList.add('hi-score')
    //   hiScore.innerHTML = storedHiScore
    //   highScore.appendChild(hiScore)  
    // }
    // const hiScore = document.createElement('div')
    // hiScore.classList.add('hi-score')
    
    // highScore.appendChild(hiScore)
  }
  // Function to store your score into local storage - it's up to you at what point in the game to call this function
  function storeScores() {
    if (playerP > storedHiScore) { // if the current points value is higher than the value stored in local storage
      storedHiScore = playerP // assign storedHiScore to equal the current value of points
      localStorage.setItem('storedHiScore', JSON.stringify(storedHiScore)) // set storedHiScore into local storage
      // this is a key value pair - you are setting the key above and then giving it the value of your latest 
      // high score
      hiScoreCreate() // this will enable you to display the score immediately if needed
    }
  }
  // Create a function to check if there is any data in local storage when the page is loaded, if so - 
  // display this data using the hiScoreCreate function, otherwise - do nothing.
  // Invoke this function immediately so that it is run as soon as the DOM content is loaded   
  function displayHiScore() {
    data ? hiScoreCreate(data) : null
  }
  displayHiScore()
  // If you ever want to reset the data - you can do this in the console - localStorage.clear()
  // or you can create a function and invoke localStorage.clear() within it - if you want the user to have 
  // control over what is stored. 

  
  

  //Event Listeners
  window.addEventListener('keydown', handleKeyDown)
  reset.addEventListener('click', resetGame)
  start.addEventListener('click', startGame )
  stopiStart.addEventListener('click', stopStart)

}

window.addEventListener('DOMContentLoaded', init)
