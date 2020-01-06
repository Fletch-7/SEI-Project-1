
function init() {

  //  DOM Variables
  const grid = document.querySelector('.grid')
  const start = document.querySelector('.start')
  const reset = document.querySelector('.reset')
  const squares = []
  let snakeArray = [0, 1, 2, 3].sort((a, b) => b - a)
  let snakeHead = [0]
  let speed = 300
 
  // Game Variables
  const width = 11 //121 squares
  
  let direction = 'right'

 
  // (HOW TO MAKE A SIMPLE GRID)
  Array(width * width).join('.').split('.').forEach(() => {
    const square = document.createElement('div')
    square.classList.add('grid-item')
    squares.push(square)
    grid.appendChild(square)
  })

  function addSnake() {
    snakeArray.map(snake => squares[snake].classList.add('snake'))
  }
  function removeSnake(){
    snakeArray.map(snake => squares[snake].classList.remove('snake'))
  }
  addSnake()

  function handleKeyDown(e) { //KEYBOARD FUNCTION TO MOVE AROUND THE GRID 
    switch (e.keyCode){
      case 39: direction = 'right'//moves by one right
        moveRight()
        if (direction !== 'right')
          direction === true
        break
      case 37: direction = 'left'//moves by one left
        moveLeft()
        if (direction !== 'left')
          direction === true
        break
      case 40: direction = 'down'//moves by one down
        moveDown()
        if (direction !== 'down')
          direction === 'up'
        break
      case 38: direction = 'up'//moves by one up
        moveUp()
        if (direction !== 'up')
          direction === 'down'
        break
      default: 
        console.log('player shouldnt move')
    }

  }
  // handleKeyDown()


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


    
  function moveRight (){
    removeSnake()
    snakeArray.pop()
    snakeArray.unshift(snakeArray[0] + 1)
    addSnake()
  }
  function moveLeft(){
    removeSnake()
    snakeArray.pop()
    snakeArray.unshift(snakeArray[0] - 1)
    addSnake()
  }
  function moveDown(){
    removeSnake()
    snakeArray.pop()
    snakeArray.unshift(snakeArray[0] + width)
    addSnake()
  }
  function moveUp(){
    removeSnake()
    snakeArray.pop()
    snakeArray.unshift(snakeArray[0] - width)
    addSnake()
  }

    
  
  
  setInterval(moveSnake, speed)
  generateFood()

  //FOOD SECTION
  function generateFood (){
    const randomNumbers = new Set() // create an empty set to push random numbers in to
    while (randomNumbers.size < 1){
      const randomNumber = Math.floor(Math.random() * 121) // generate a random number between 0 and 49
      randomNumbers.add(randomNumber) // add randomNumber to the end of the randomNumbers set
    }
    randomNumbers.forEach((number) => { // loop through the randomNumbers set
      squares[number].classList.add('active') // find the li with the index of the random number and add the class of "active"
    })
  }

  //Snake Eat Food
  
  //RESET SECTION
  function clearGrid() {
    location.reload()
  }


  //Event Listeners
  window.addEventListener('keydown', handleKeyDown)
  // start.addEventListener('click', generateFood)
  reset.addEventListener('click', clearGrid)
}

window.addEventListener('DOMContentLoaded', init)
