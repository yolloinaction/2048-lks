const height = 400
const width = 400
const wildNode = ['W','i',"L","D"]
let grid = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0]
]
let playground
let score = 0
let wildCount = 0

function setup() {
  // put setup code here
  let cvs = createCanvas(480,720)
  playground = createGraphics(400,400).show()
  cvs.position((windowWidth/2)-480*0.5,(windowHeight/2)-720*0.5)
  playground.position((windowWidth/2)-width*0.5,(windowHeight/2)-height*0.5)

  addNumber()
  addNumber()

}

function draw() {
  // put drawing code here
  playground.strokeWeight(2)
  background('rgb(0,255,0)')
  stroke(0)
  // draw the playground
  playground.background(255)
  drawGrid()
  displayNumb(grid);
  displayScore(score)
}


// *function goes here
// ?draw the grid
function drawGrid() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      playground.noFill()
      playground.rect(i*(width/4),j*(height/4),width/4,height/4)
    }
  }
}

// ? display number to the board
function displayNumb(grid){
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      playground.fill(0)
      playground.textSize(32)
      playground.strokeWeight(1)
      playground.textAlign(CENTER,CENTER)
      playground.text(grid[j][i] ,i*(width/4)+50,j*(width/4)+50)
    }
  }
}
// ? display score
function displayScore(score){
  textSize(28)
  textAlign(RIGHT,CENTER)
  text(score,(480/2+(width*0.5)-10),(720/2-(height*0.5)-20))
}

// ? add number to board
function addNumber() {
  let gridTmp = []
  // * lihat dan tampung jumlah column dari grid yang masih kosong
  for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[x].length; y++) {
        if (grid[x][y] == 0) {
          gridTmp.push({x,y})
        }
    }
  }
  if (gridTmp.length != 0) {
    let tmp = random(gridTmp)
    if (wildCount == 8) {
      grid[tmp.x][tmp.y] = random(wildNode)
      wildCount = 0
    }else{
      grid[tmp.x][tmp.y] = random(1) > 0.5 ? 4 : 2
    }
    return grid
  }
  return grid
}

// ? sum the same number
function sumNumber(grid,direction) {

switch (direction) {
  case 'right':
    for (let i = 3; i >= 0; i--) {
      for (let j = 3; j >= 0; j--) {
        // * cek apakah sama
        if(isNaN(grid[i][j-1]) || isNaN(grid[i][j])){
          if (wildNode.includes(grid[i][j-1]) && grid[i][j] != 0) {
            grid[i][j] = grid[i][j] * 2
            grid[i][j-1] = 0
            addScore(grid[i][j])
          }
          else if (wildNode.includes(grid[i][j]) && grid[i][j-1] != 0) {
            grid[i][j-1] = grid[i][j-1] * 2
            grid[i][j] = 0
            addScore(grid[i][j-1])
          }
        }
        else if(grid[i][j] == grid[i][j-1]) {
          grid[i][j] = grid[i][j] + grid[i][j-1]
          grid[i][j-1] = 0
          addScore(grid[i][j])
        }
      }
    }
    break;

  case 'left':
    for (let i = 0; i <= 3; i++) {
      for (let j = 0; j <= 3; j++) {
        // * cek apakah sama
        if (grid[i][j] == grid[i][j+1]) {
          grid[i][j] = grid[i][j] + grid[i][j+1]
          grid[i][j+1] = 0
          addScore(grid[i][j])
        }
      }
    }
    break;

  case 'down':
        for (let i = 3; i >= 0; i--) { //index lv.1
          for (let j = 3; j >= 0; j--) { //index lv.2
            // * cek apakah sama
            if (j != 0 && grid[j][i] == grid[j-1][i]) {
              grid[j][i] = grid[j][i] + grid[j-1][i]
              grid[j-1][i] = 0
              addScore(grid[j][i])
            }
          }
        }
    break;

  case 'up':
        for (let i = 0; i <= 3; i++) { //index lv.1
          for (let j = 0; j <= 3; j++) { //index lv.2
            // * cek apakah sama
            if (j != 3 && grid[j][i] == grid[j+1][i]) {
              grid[j][i] = grid[j][i] + grid[j+1][i]
              grid[j+1][i] = 0
              addScore(grid[j][i])
            }
          }
        }
      break;

  default:
    alert('error : the second parameter must be left | right | up | down')
    break;
}
}


// ? geser angka nya
function doSlide(row,direction = 'left') {
  let arr  = row.filter( v => v)
  let zeros = Array( 4 - arr.length ).fill(0)
  return direction == 'left' ? arr = zeros.concat(arr) : arr = arr.concat(zeros)
}

// ? cek perubahan grid
function checkCange(gridClone) {
  if(JSON.stringify(grid) == JSON.stringify(gridClone) ) {
    return false;
  }
  else{
    wildCount +=1
    addNumber()
    return false;
  }
}

// ? add score
function addScore(newScore) {
  score += newScore
}

// TODO: key pressed
// ? when key is pressed
function keyPressed() {
  
  let gridClone = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ]
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      gridClone[i][j] = grid[i][j];
    }
  }

  // * arrow kanan
  if (keyCode == RIGHT_ARROW ) {
    for (let i = 0; i < 4; i++) {
      grid[i] = doSlide(grid[i])
    }
    sumNumber(grid,'right')
    for (let i = 0; i < 4; i++) {
      grid[i] = doSlide(grid[i])
    }
    return checkCange(gridClone)
  }

  // * arrow kiri
  if (keyCode == LEFT_ARROW ) {
    for (let i = 0; i < 4; i++) {
      grid[i] = doSlide(grid[i],'kanan')
    }
    sumNumber(grid,'left')
    for (let i = 0; i < 4; i++) {
      grid[i] = doSlide(grid[i],'!kiri')
    }
    return checkCange(gridClone)
  }

  // * arrow bawah
  if (keyCode == DOWN_ARROW ) {
    let rowTmp = []
    let colTmp = []
    let gridTmp = []

    // * rotate the grid array
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        colTmp.push(grid[j][i])
      }
      rowTmp.push(colTmp)
      colTmp = []
      // * lets slide the rotated array
      gridTmp.push(doSlide(rowTmp[i]))
    }

    // * restore the rotated array and change the display
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        grid[j][i] = gridTmp[i][j]
      }
    }

    sumNumber(grid,'down')

    rowTmp = []
    colTmp = []
    gridTmp = []

    // * rotate the grid array
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        colTmp.push(grid[j][i])
      }
      rowTmp.push(colTmp)
      colTmp = []
      // * lets slide the rotated array
      gridTmp.push(doSlide(rowTmp[i]))
    }

    // * restore the rotated array and change the display
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        grid[j][i] = gridTmp[i][j]
      }
    }
    return checkCange(gridClone)
  }

  // * arrow atas
  if (keyCode == UP_ARROW) {

    let rowTmp = []
    let colTmp = []
    let gridTmp = []

    // * rotate the grid array
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        colTmp.push(grid[j][i])
      }
      rowTmp.push(colTmp)
      colTmp = []

      // * lets slide the rotated array
      gridTmp.push(doSlide(rowTmp[i],'right'))
    }
    // * restore the rotated array and change the display
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        grid[j][i] = gridTmp[i][j]
      }
    }

    sumNumber(grid,'up')

    rowTmp = []
    colTmp = []
    gridTmp = []

    // * rotate the grid array
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        colTmp.push(grid[j][i])
      }
      rowTmp.push(colTmp)
      colTmp = []

      // * lets slide the rotated array
      gridTmp.push(doSlide(rowTmp[i],'right'))
    }
    // * restore the rotated array and change the display
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        grid[j][i] = gridTmp[i][j]
      }
    }
    return checkCange(gridClone)
  }
  // return false
}