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
    option.x = tmp.x
    option.y = tmp.y
    grid[option.x][option.y] = random(1) > 0.5 ? 4 : 2 ;
    return grid
  }
  return grid
}

// ? sum same number
function sumNumber(grid,direction) {

switch (direction) {
  case 'right':
    for (let i = 3; i >= 0; i--) {
      for (let j = 3; j >= 0; j--) {
        // * cek apakah sama
        if (grid[i][j] == grid[i][j-1]) {
          grid[i][j] = grid[i][j] + grid[i][j-1]
          grid[i][j-1] = 0
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
            }
          }
        }
    break;

  case 'up':
        for (let i = 0; i <= 3; i++) { //index lv.1
          for (let j = 0; j <= 3; j++) { //index lv.2
            // * cek apakah sama
            if (j != 3 && grid[j][i] == grid[j+1][i]) {
              console.log('lol')
              grid[j][i] = grid[j][i] + grid[j+1][i]
              grid[j+1][i] = 0
            }
          }
        }
      break;

  default:
    alert('error : the second parameter must be horizon | up | down')
    break;
}
}


// ? geser angka nya
function doSlide(row,direction = 'left') {
  let arr  = row.filter( v => v)
  let zeros = Array( 4 - arr.length ).fill(0)
  return direction == 'left' ? arr = zeros.concat(arr) : arr = arr.concat(zeros)
}


// TODO: key pressed
// ? when key is pressed
function keyPressed() {
  let gridClone = [...grid]

  // * arrow kanan
  if (keyCode == RIGHT_ARROW ) {
    for (let i = 0; i < 4; i++) {
      grid[i] = doSlide(grid[i])
    }
    sumNumber(grid,'right')
    for (let i = 0; i < 4; i++) {
      grid[i] = doSlide(grid[i])
    }
    addNumber(grid)
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
    addNumber(grid)
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

    addNumber(grid)
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
    addNumber(grid)
  }

  console.log(gridClone);
  console.log(grid);
  
  


  // return false
}