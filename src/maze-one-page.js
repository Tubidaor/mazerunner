import React, { Component } from 'react'
import Maze from './maze-one'
import spaceship from './assets/spaceship.jpg'

export default class MazeOnePage extends Component {

  constructor(props) {
    super(props) 
      this.state = {
        difficulty: "easy",
        height: 400,
        width: 400,
        length: 40,
        letter: 'XX'
      }
  }

  componentDidMount() {
    if(this.state.letter === 'XX') {
      this.returnLetter()
    }
    if(this.getDifficulty()) {
      const difficulty = this.getDifficulty()
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

  
  returnLetter() {
    const letters = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z"
    ]

    this.setState({
      letter: letters[Math.floor(Math.random() * 26)]
    })
  }
  
  render() {
    const { height, width, length, letter } = this.state
    let num = 0
    let time = 3000
    function talk() {
      var msg = new SpeechSynthesisUtterance()
      msg.text = `...Get to the letter... ${letter}`
      setTimeout(function() {window.speechSynthesis.speak(msg)}, time)
    }

    function speak() {
      if(num === 61) {
        return
      }
      if(letter !== "XX" && (num % 10 === 0)) {
        talk()
      }
      num = num + 1
      time = time + 2000
      speak()
    }
  
      
    speak()
  
    return (
      <div className="App">
        <div className="youWon" id="youWon">
          <img className="spaceship" alt="spaceship - you won" src={spaceship}/>
          <p>You won!</p>
        </div>
        <div className="btn-con">
          <button onClick={e => this.setDifficulty("easy")}>Easy</button>
          <button onClick={e => this.setDifficulty("medium")}>Medium</button>
          <button onClick={e => this.setDifficulty("hard")}>Hard</button>
        </div>
        <div className='letter'>
          <header>
            <h1>Get to the letter "{letter}"</h1>
          </header>
        </div>
        <Maze height={height} width={width} length={length} letter={letter}/>
      </div>
    );
}
}