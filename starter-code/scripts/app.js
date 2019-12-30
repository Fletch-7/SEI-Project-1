
function init() {

  //  DOM Variables
  const grid = document.querySelector('.grid')
  const start = document.querySelector('.start')
  const reset = document.querySelector('.reset')
  const squares = []
 
  // Game Variables
  const width = 11 //121 squares
  let playerIndex = 0

 
  // (HOW TO MAKE A SIMPLE GRID)
  Array(width * width).join('.').split('.').forEach(() => {
    const square = document.createElement('div')
    square.classList.add('grid-item')
    squares.push(square)
    grid.appendChild(square)
 
  })
  squares[playerIndex].classList.add('player')

  
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

        grid.snake = 1
    }
    squares.forEach(square => square.classList.remove('player'))
    squares[playerIndex].classList.add('player')

  }

  //FOOD SECTION
  function generateFood (){
    const randomNumbers = new Set() // create an empty set to push random numbers in to
    while (randomNumbers.size < 1){
      console.log('hello')
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
