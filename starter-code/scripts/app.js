function init() {

  //  DOM Variables
  const grid = document.querySelector('.grid')
  const reset = document.querySelector('.reset')
  const start = document.querySelector('.start')
  const scoreSpan = document.querySelector('.score')
  const playerScore = document.querySelector('.score').innerHTML
  const squares = []
  let intervalId = null
  console.log(squares)
  const snakeArray = [3, 2, 1, 0]
  console.log(snakeArray)
  
  
  
  
 
  // Game Variables
  const width = 11 //121 squares
  let direction = 'right'
  let speed = 300
  let playerP = parseInt(playerScore)


 
  // (HOW TO MAKE A SIMPLE GRID)
  Array(width * width).join('.').split('.').forEach(() => {
    const square = document.createElement('div')
    square.classList.add('grid-item')
    squares.push(square)
    grid.appendChild(square)
  })

  function addSnake() {
    snakeArray.forEach(snake => squares[snake].classList.add('snake'))
  }
  function removeSnake(){
    snakeArray.forEach(snake => squares[snake].classList.remove('snake'))
  }
  addSnake()


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
    } 
    if (direction === 'left' && snakeArray[0] % width > 0){
      moveLeft()
    } 
    if (direction === 'down' && snakeArray[0] + width < width * width){
      moveDown()
    } 
    if (direction === 'up' && snakeArray[0] - width >= 0){
      moveUp()
    } 
    
  }
  function startGame(){
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
    if (snakeArray[0] > 0) {
      snakeArray.unshift(snakeArray[0] - width)
      if (!squares[snakeArray[0]].classList.contains('food')) {
        snakeArray.pop()
      }
      snakeEats()
      gameEnd()
      addSnake()
      gameEnd()
    }
  }
  
  

  // SNAKE HITS WALL
  function gameEnd(){
    if (snakeArray.slice(1).includes(snakeArray[0])){
      window.alert('GAME OVER')
      clearGrid()
    }
  }
 

  //FOOD SECTION
  function generateFood (){
    const randomNumbers = new Set() // create an empty set to push random numbers in to
    while (randomNumbers.size < 1){
      const randomNumber = Math.floor(Math.random() * 121) // generate a random number between 0 and 49
      randomNumbers.add(randomNumber) // add randomNumber to the end of the randomNumbers set
    }
    randomNumbers.forEach((number) => { // loop through the randomNumbers set
      squares[number].classList.add('food') // find the li with the index of the random number and add the class of "active"
    })
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
    

  //RESET SECTION
  function clearGrid() {
    location.reload()
  }


  //Event Listeners
  window.addEventListener('keydown', handleKeyDown)
  reset.addEventListener('click', clearGrid)
  start.addEventListener('click', startGame )
}

window.addEventListener('DOMContentLoaded', init)
