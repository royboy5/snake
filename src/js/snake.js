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
    if (this.isInvalidDirection(nextDirection)) {
      console.log('invalid direction')
      return
    }
    this.direction = nextDirection
  }

  addSegment () {
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

    // console.log('new coords:', newCoords)
    return newCoords
  }

  isInvalidDirection (newDirection) {
    return (
      newDirection === this.direction ||
      (newDirection === Direction.UP &&
        this.directionBeforeMove == Direction.DOWN) ||
      (newDirection === Direction.DOWN &&
        this.directionBeforeMove == Direction.UP) ||
      (newDirection === Direction.LEFT &&
        this.directionBeforeMove == Direction.RIGHT) ||
      (newDirection === Direction.RIGHT &&
        this.directionBeforeMove == Direction.LEFT)
    )
  }

  selfCollision () {
    let head = this.getHead()
    return (
      this.segments.slice(1).filter(function (segment) {
        return segment.equals(head)
      }).length > 0
    )
  }
}
