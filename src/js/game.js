'use strict'

import config from './config'
import Board from './board'
import Food from './food'
import Snake from './snake'

export default class {
  constructor () {
    this.board = new Board(
      config.HORIZONTAL_SQUARES,
      config.VERTICAL_SQUARES,
      config.SQUARE_SIZE
    )

    this.init()
  }

  init () {
    this.board.clear()
    this.endGame = false
    this.score = config.START_SCORE
    this.updateScore()
    this.food = new Food(this.board.getRandomCoord())
    this.snake = new Snake()

    console.log(this.snake.getSnake())

    document
      .querySelector('#start')
      .addEventListener('click', this.handleClick.bind(this))

    document
      .querySelector('#stop')
      .addEventListener('click', this.handleClick.bind(this))
  }

  gameLoop () {
    this.board.clear()
    this.board.drawSquare(this.food.location)
    this.food.location = this.board.getRandomCoord()

    if (this.isGameOver()) {
      return
    }

    let self = this

    // Run in a loop
    setTimeout(function () {
      console.log('in loop')
      requestAnimationFrame(self.gameLoop.bind(self))
    }, 1000 / config.FPS)
  }

  gameStart () {
    this.init()
    this.gameLoop()
  }

  isGameOver () {
    return this.endGame
  }

  updateScore () {
    this.gameScore = document.querySelector('#score')
    this.gameScore.innerText = `Score: ${this.score}`
  }

  handleClick (e) {
    if (e.target.id === 'start') {
      document.querySelector(`#${e.target.id}`).disabled = true
      this.gameStart()
    }

    if (e.target.id === 'stop') {
      this.endGame = true
      document.querySelector('#start').disabled = false
    }
  }
}
