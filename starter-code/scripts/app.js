
function init() {

  //  DOM Variables
  const grid = document.querySelector('.grid')
  const start = document.querySelector('.start')
  const reset = document.querySelector('.reset')
  const squares = []
  const snakeArray = [0, 1, 2, 3]

 
  // Game Variables
  const width = 11 //121 squares
  let playerIndex = 4

 
  // (HOW TO MAKE A SIMPLE GRID)
  Array(width * width).join('.').split('.').forEach(() => {
    const square = document.createElement('div')
    square.classList.add('grid-item')
    squares.push(square)
    grid.appendChild(square)
  })
  squares[playerIndex].classList.add('snake')

  function addSnake() {
    snakeArray.map(snake => squares[snake].classList.add('snake'))
  }
  addSnake(grid)

  function handleKeyDown(e) { //KEYBOARD FUNCTION TO MOVE AROUND THE GRID 
    // console.log(playerIndex % width < width - 1)
    // console.log(e.keyCode)
    switch (e.keyCode){
      case 39:
        if (playerIndex % width < width - 1){
          playerIndex++ //moves by one right
        }
        break
      case 37:
        if (playerIndex % width > 0){
          playerIndex--//moves by one left
        }
        break
      case 40:
        if (playerIndex + width < width * width){
          playerIndex += width//moves by one down
        }
        break
      case 38:
        if (playerIndex - width >= 0 ){
          playerIndex -= width//moves by one up
        }
        break
      default: 
        console.log('player shouldnt move')
    }
    
    squares.forEach(square => square.classList.remove('snake'))
    squares[playerIndex].classList.add('snake')

  }

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
  //RESET SECTION
  function clearGrid() {
    location.reload()
  }


  //Event Listeners
  window.addEventListener('keydown', handleKeyDown)
  start.addEventListener('click', generateFood)
  reset.addEventListener('click', clearGrid)
}

window.addEventListener('DOMContentLoaded', init)
