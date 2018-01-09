'use strict'

import config from './config'
import Coordinate from './coordinate'
import Direction from './direction'

export default class {
  constructor (color) {
    this.color = color
    this.direction = Direction.RIGHT
    this.directionBeforeMove = Direction.RIGHT
    this.segments = this.createSnake(config.INIT_SNAKE_SIZE)
    this.growSnake = false
  }

  getHead () {
    return this.segments[0]
  }

  newDirection (nextDirection) {
    this.direction = nextDirection
  }

  growSnake () {
    this.growSnake = true
  }

  move () {
    this.directionBeforeMove = this.direction
    if (this.growSnake) {
      this.growSnake = false
    } else {
      this.segments.pop()
    }
    this.segments.unshift(this.getNextLocation())
  }

  createSnake (size) {
    let snake = []
    for (let i = 1; i <= size; i++) {
      snake.unshift(new Coordinate(i, 1))
    }

    return snake
  }

  getNextLocation () {
    let newCoords = new Coordinate(
      this.getHead().x + this.direction.x,
      this.getHead().y + this.direction.y
    )

    console.log('new coords:', newCoords)
    return newCoords
  }
}
