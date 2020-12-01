import React, { Component } from 'react'
import MazeTwo from './maze-two'
import spaceship from './assets/spaceship.jpg'

export default class MazeTwoPage extends Component {

  constructor(props) {
    super(props) 
      this.state = {
        difficulty: "easy",
        height: 400,
        width: 400,
        length: 40
      }
  }

  componentDidMount() {
    if(this.getDifficulty()) {
      const difficulty = this.getDifficulty()
      console.dir(difficulty.level)
      this.setState(difficulty.level)
    }
  }

  setDifficulty = (difficulty) => {
    let level
    const easy = {
      difficulty,
      height: 400,
      width: 400,
      length: 40
    }
    const medium = {
      difficulty,
      height: 525,
      width: 525,
      length: 35
    }
    const hard = {
      difficulty,
      height: 600,
      width: 600,
      length: 30
    }
    if(difficulty === "easy") {
      level = easy
    }
    if(difficulty === "medium") {
      level = medium
    }
    if(difficulty === "hard") {
      level = hard
    }
    this.saveDifficulty(level)
    document.location.reload()
  }

  getDifficulty() {
    return JSON.parse(window.sessionStorage.getItem("difficulty"))
  }

  saveDifficulty(difficulty) {
    window.sessionStorage.setItem(
      "difficulty", JSON.stringify({level: difficulty})
    )
  }

  render() {
    const { height, width, length } = this.state
    return (
      <div className="App">
        <div className="youWon" id="youWon">
          <img className="spaceship" alt="spaceship- you won" src={spaceship}/>
          <p>You won!</p>
        </div>
        <div className="btn-con">
          <button onClick={e => this.setDifficulty("easy")}>Easy</button>
          <button onClick={e => this.setDifficulty("medium")}>Medium</button>
          <button onClick={e => this.setDifficulty("hard")}>Hard</button>
        </div>
        <MazeTwo height={height} width={width} length={length}/>
      </div>
    );
}
}