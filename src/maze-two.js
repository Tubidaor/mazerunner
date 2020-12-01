import React from 'react'
import Sketch from "react-p5"
import cal from './assets/cal.jpeg'
import danKatie from './assets/dankatie.jpeg'

export default function MazeTwo(props) {
  class Player {
    constructor() {
      this.x = 2.5
      this.y = 2.5
      this.length = props.length
    }
  display(p5) {
    p5.image(this.img, this.x, this.y)
  }
}

  function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    this.visited = false;

    this.checkNeighbors = function() {
      let neighbors = [];
      let top = grid[index(i, j - 1)]
      let right = grid[index(i + 1, j)]
      let bottom = grid[index(i, j + 1)]
      let left = grid[index(i - 1, j)]

      if (top && !top.visited) {
        neighbors.push(top);
      }
      if (right && !right.visited) {
        neighbors.push(right);
      }
      if (bottom && !bottom.visited) {
        neighbors.push(bottom);
      }
      if (left && !left.visited) {
        neighbors.push(left);
      }
      if (neighbors.length > 0) {
        let r = Math.floor(Math.random() * neighbors.length)
        return neighbors[r];
      } else {
        return undefined;
      }
    }

    this.show = function(p5) {
      let x = this.i * w
      let y = this.j * w
      p5.stroke(0);
      if (this.walls[0]) {
        p5.line(x, y, x + w, y)
        p5.strokeWeight(6)
      }
      if (this.walls[1]) {
        p5.line(x + w, y, x + w, y + w)
        p5.strokeWeight(6)

      }
      if (this.walls[2]) {
        p5.line(x + w, y + w, x, y + w)
        p5.strokeWeight(6)
      }
      if (this.walls[3]) {
        p5.line(x, y + w, x, y);
        p5.strokeWeight(6)
      }
    }
  }

  let cols, rows
  let grid = []
  let current = []
  let stack = []
  let playerOne = new Player()
  let goal = new Player()
  let w = playerOne.length
  let currentIndex = 0
  
  function setup(p5, canvasParentRef) {
    const { width, height, length } = props
    p5.createCanvas(width, height).parent(canvasParentRef);
    cols = Math.floor(width / w);
    rows = Math.floor(height / w);
    playerOne.x = (Math.floor(Math.random() * (height / length)) * length) + 2.5
    playerOne.y = (Math.floor(Math.random() * (height / length)) * length) + 2.5
    currentIndex = (((playerOne.y - 2.5) / playerOne.length) * cols) +
      ((playerOne.x - 2.5) / playerOne.length)
    goal.x = (Math.floor(Math.random() * (height / length)) * length) + 2.5
    goal.y = (Math.floor(Math.random() * (height / length)) * length) + 2.5
    playerOne.img = p5.loadImage(cal)
    goal.img = p5.loadImage(danKatie)
    
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        var cell = new Cell(i, j)
        grid.push(cell)
      }
    }
    
    current = grid[0];
    
  }
  
  function draw(p5) {
    p5.background(255, 15, 15);
    for (let i = 0; i < grid.length; i++) {
      grid[i].show(p5)
    }
    // p5.frameRate()
    playerOne.display(p5)
    playerOne.img.resize( playerOne.length - 2.5, playerOne.length - 2.5)
    goal.display(p5)
    goal.img.resize(goal.length - 2.5, goal.length - 2.5)
    current.visited = true;
    let next = current.checkNeighbors()

    if (next) {
      next.visited = true;
      stack.push(current);
      removeWalls(current, next)
      current = next;
    } else if (stack.length > 0) {
      current = stack.pop()
    }

    reachedGoal(p5)
  }

  function returnIndex(index) {
    if(index < 0 || index > grid.length - 1) {
      return grid.length - 1
    }
    return index
  }
  
  function checkForWall(direction) {
    if(direction === "ArrowUp") {
      currentIndex = currentIndex - rows
      if(!grid[returnIndex(currentIndex)].walls[2] &&
        !grid[currentIndex + rows].walls[0]) {
        return "No walls"
      } else { currentIndex = currentIndex + rows
      }
      return "walls"
    }
    if(direction === "ArrowDown") {
      currentIndex = currentIndex + rows
      if(!grid[returnIndex(currentIndex)].walls[0] &&
        !grid[currentIndex - rows].walls[2]) {
        return "No walls"
      } else { currentIndex = currentIndex - rows
      
      }
      return "walls"
    }
    if(direction === "ArrowRight") {
      currentIndex = currentIndex + 1
      if(!grid[returnIndex(currentIndex)].walls[3] &&
        !grid[currentIndex - 1].walls[1]) {
        return "No walls"
      } else { currentIndex = currentIndex - 1
      }
      return "walls"
    }
    if(direction === "ArrowLeft") {
      currentIndex = currentIndex - 1
      if(!grid[returnIndex(currentIndex)].walls[1] &&
        !grid[currentIndex + 1].walls[3]) {
        return "No walls"
      } else { currentIndex = currentIndex + 1
      }
      return "walls"
    }
  }

  function keyPressed(e) {
    switch (e.key) {
      case "ArrowUp":
        if(checkForWall(e.key) === "No walls") {
          playerOne.y = playerOne.y - playerOne.length
        }
        break
      case "ArrowRight":
        if(checkForWall(e.key) === "No walls") {
          playerOne.x = playerOne.x + playerOne.length
        }
        break
      case "ArrowDown":
        if(checkForWall(e.key) === "No walls") {
          playerOne.y = playerOne.y + playerOne.length
        }
        break
      case "ArrowLeft":
        if(checkForWall(e.key) === "No walls") {
          playerOne.x = playerOne.x - playerOne.length
        }
        break
    }
  }

  function index(i, j) {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
      return -1
    }
    return i + j * cols
  }

  function removeWalls(a, b) {
    let x = a.i - b.i
    if (x === 1) {
      a.walls[3] = false
      b.walls[1] = false
    } else if (x === -1) {
      a.walls[1] = false
      b.walls[3] = false
    }
    let y = a.j - b.j
    if (y === 1) {
      a.walls[0] = false
      b.walls[2] = false
    } else if (y === -1) {
      a.walls[2] = false
      b.walls[0] = false
    }
  }

  function reachedGoal(p5) {
    if(playerOne.x === goal.x && playerOne.y === goal.y) {
      const youWon = document.getElementById('youWon')
      youWon.style.display = "block"
      p5.noLoop()
      setTimeout(() => {
        document.location.reload()
      }, 2000) 
    }
  }

  return <Sketch setup={setup} keyPressed={keyPressed} draw={draw} />
}

