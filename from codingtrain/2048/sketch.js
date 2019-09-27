let grid = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0]
]

function setup() {
  // put setup code here
  let cvs = createCanvas(400,400)
  cvs.position((windowWidth/2)-width*0.5,(windowHeight/2)-height*0.5)

  grid = addNumber(grid)
  grid = addNumber(grid)

}

function draw() {
  // put drawing code here
  strokeWeight(2)
  background(255)
  stroke(1)
  // draw the playground
  drawGrid()
  displayNumb(grid);
}


// *function goes here
// ?draw the grid
function drawGrid() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      noFill()
      rect(i*(width/4),j*(height/4),width/4,height/4)
    }
  }
}

// ? display number to the board
function displayNumb(grid){
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      fill(0)
      textSize(32)
      strokeWeight(1)
      textAlign(CENTER,CENTER)
      text(grid[j][i] ,i*(width/4)+50,j*(width/4)+50)
    }
  }
}

// ? add number to board
function addNumber(grid) {
  let option = {x:0,y:0}
  let arrTmp = []
  for (let i = 0; i < grid.length; i++) {
    console.log(grid[i].length);
    
      if (grid[i].length == 0) {
        console.log("sip");
      }
      
      arrTmp.push(grid[i].filter( v => !v));
  }
  console.table(arrTmp.filter( v => v !== []));
  // if (arrTmp.fil) {
    
  // }
  
  while (true){
    let x = round(random(3))
    let y = round(random(3))

      if (grid[x][y] == 0 ) {
        option.x = x
        option.y = y
        break
      }
  }
  grid[option.x][option.y] = random(1) > 0.5 ? 4 : 2 ;
  return grid
}

// ? geser angka nya
function doSlide(row) {
  let arr  = row.filter( v => v)
  let zeros = Array( 4 - arr.length ).fill(0)
  return arr = zeros.concat(arr)
}

// ? when key is pressed
function keyPressed() {

  if (keyCode == LEFT_ARROW ) {
    for (let i = 0; i < 4; i++) {
      grid[i] = doSlide(grid[i])
    }
    addNumber(grid)
  }
  // return false
}