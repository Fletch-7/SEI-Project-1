function init() {

  //  DOM Variables
  const grid = document.querySelector('.grid')
  const reset = document.querySelector('.reset')
  const squares = []
  const snakeArray = [3, 2, 1, 0]
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
    snakeWall()
    removeSnake()
    snakeArray.unshift(snakeArray[0] + 1)
    console.log(squares[snakeArray[0]].classList.contains('food'))
    if (!squares[snakeArray[0]].classList.contains('food')) {
      snakeArray.pop()
    }
    snakeEats()
    addSnake()
    
  }
  function moveLeft(){
    snakeWall()
    removeSnake()
    snakeArray.unshift(snakeArray[0] - 1)
    console.log(squares[snakeArray[0]].classList.contains('food'))
    if (!squares[snakeArray[0]].classList.contains('food')) {
      snakeArray.pop()
    }
    snakeEats()
    addSnake()
    
  }
  function moveDown(){
    snakeWall()
    removeSnake()
    snakeArray.unshift(snakeArray[0] + width)
    console.log(squares[snakeArray[0]].classList.contains('food'))
    if (!squares[snakeArray[0]].classList.contains('food')) {
      snakeArray.pop()
    }
    snakeEats()
    addSnake()
   
  }
  function moveUp(){
    snakeWall()
    removeSnake()
    if (snakeArray[0] > 0) {
      snakeArray.unshift(snakeArray[0] - width)
      if (!squares[snakeArray[0]].classList.contains('food')) {
        snakeArray.pop()
      }
      snakeEats()
      addSnake()
    }
  }

  setInterval(moveSnake, speed)
  generateFood()
  
  

  // Snake hits wall
  function snakeWall(){
    
    if (snakeArray[0] === snakeArray[0] % width < width - 1 < 0 ){
      window.alert('GAME OVER :(')
      clearGrid()
    } 
    if (snakeArray[0] === snakeArray[0] % width > 0 ){
      window.alert('GAME OVER :(')
      clearGrid()
    }
    if (snakeArray[0] === snakeArray[0] + width < width * width){
      window.alert('GAME OVER :(')
      clearGrid()
    }
    if (snakeArray[0] === snakeArray[0] - width >= 0){
      window.alert('GAME OVER :(')
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

  //Snake Eat Food
  // function snakeEats(){
  //   if (snakeArray[0] === 'active')
  //     squares.classList.remove('active')
  // }
  // snakeEats()
  //(squares[snakeArray[0]].classList.contains('food'))
  function snakeEats(){
    if (squares[snakeArray[0]].classList.contains('food')) { //square = singular of squares variable
      squares[snakeArray[0]].classList.remove('food')//remove class -> remove color
      generateFood()
      speed = speed - 100
    } 
  }
    

  
  

  
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
