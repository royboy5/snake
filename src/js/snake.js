'use strict'

import config from './config'
import Coordinate from './coordinate'
import Direction from './direction'

export default class {
  constructor () {
    this.direction = Direction.RIGHT
    this.segments = this.createSnake(config.INIT_SNAKE_SIZE)
  }

  getHead () {
    return this.segments[0]
  }

  getSnake () {
    return this.segments
  }

  createSnake (size) {
    let snake = []
    for (let i = 1; i <= size; i++) {
      snake.unshift(new Coordinate(i, 1))
    }
    return snake
  }
}
