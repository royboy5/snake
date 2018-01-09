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

    document
      .querySelector('#start')
      .addEventListener('click', this.handleClick.bind(this))

    document
      .querySelector('#stop')
      .addEventListener('click', this.handleClick.bind(this))

    this.init()
  }

  init () {
    this.board.clear()
    this.endGame = false
    this.score = config.START_SCORE
    this.updateScore()
    this.food = new Food(this.board.getRandomCoord(), config.FOOD_COLOR)
    this.snake = new Snake(config.SNAKE_COLOR)
    console.log(this.snake)
  }

  gameLoop () {
    this.board.clear()
    this.board.drawSquare(this.food.location, this.food.color)
    this.board.drawSquares(this.snake.segments, this.snake.color)
    // this.food.location = this.board.getRandomCoord()

    this.snake.move()

    if (this.isGameOver()) {
      return
    }

    let self = this

    // Run in a loop
    setTimeout(function () {
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
