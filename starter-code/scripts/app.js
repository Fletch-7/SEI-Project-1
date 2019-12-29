
function init() {

  //  DOM Variables
  const grid = document.querySelector('.grid')
  const squares = []
  const startStopBtn = document.querySelector('button')
 
  // Game Variables
  let timerId = null // a variavble to store our interval id, we need to know this so we can stop it later (ticket at the coat check)
  let running = false // a boolean value we use to determine if we should be stopping or starting the timer when the button is clicked, is it is set to false we need to start the interval, if it is true we need to stop it
  const width = 11 //121 squares
  let playerIndex = 0

 
  // (HOW TO MAKE A SIMPLE GRID)
  Array(width * width).join('.').split('.').forEach(() => {
    const square = document.createElement('div')
    square.classList.add('grid-item')
    squares.push(square)
    grid.appendChild(square)
 
  })




  
  // squares[playerIndex].classList.add('player')
  
  // function handleKeyDown(e) { //KEYBOARD FUNCTION TO MOVE AROUND THE GRID 
  //   console.log(playerIndex % width < width - 1)
  //   // console.log(e.keyCode)
  //   switch (e.keyCode){
  //     case 39:
  //       if (playerIndex % width < width - 1){
  //         playerIndex++ //move by 1 everytime right
  //       }
  //       break
  //     case 37:
  //       if (playerIndex % width > 0){
  //         playerIndex-- //move one by everytime left
  //       }
  //       break
  //     case 40:
  //       if (playerIndex + width < width * width){
  //         playerIndex += width
  //       }
  //       break
  //     case 38:
  //       if (playerIndex - width >= 0 ){
  //         playerIndex -= width
  //       }
  //       break
  //     default: 
  //       console.log('player shouldnt move')
  //   }
  //   squares.forEach(square => square.classList.remove('player'))
  //   squares[playerIndex].classList.add('player')

  // }


  //MOVEMENT SECTION

  function changeSquareColor() {
    squares.forEach(square => square.style.backgroundColor = 'grey') // first we change all the squares back to green
    squares[playerIndex].style.backgroundColor = 'white' // then make the one single square (found at currentSquareIndex) red again
    playerIndex++ // increase that current square index at the end, so it is ready for the next run
    if (playerIndex >= squares.length) { // if we get to the end of the squares (in this case, our current square index reaches 5, the length of the squares array)
      playerIndex = 0 // set that current square index back to zero, so on the next run, it is the first square changing again and so forth, this will just keep looping them until the interval is cleared
    }
  }
  function handleStart() {
    if (!running) { // is the running value was false (the interval wasnt running)  
      timerId = setInterval(changeSquareColor, 1000) // start the interval, remember the syntax is, what function to run, and how often to run it, and we store the return id in a variable, so we can use it to stop the interval later
      startStopBtn.innerHTML = 'Stop' // we could even change the text inside the button to relect what it will do on its next action
      running = true // set the value of running to now be true, so when the button is next clicked, we know to stop the timer instead
    } else { // so the else runs only is running was true
      startStopBtn.innerHTML = 'Start' // when we stopped it, have the button say start again for the user
      clearInterval(timerId) // and that is when we stop the timer
    }
  }

  startStopBtn.addEventListener('click', handleStart) // event listenter for the click on our start/stop button, runs handleStart() on click.
  
  //MOVEMENT SECTION

  
  //Event Listeners
  // window.addEventListener('keydown', handleKeyDown)
}

window.addEventListener('DOMContentLoaded', init)
