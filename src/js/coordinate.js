'use strict'

export default class {
  constructor (x, y) {
    this.x = x
    this.y = y
  }

  equals (coord) {
    return this.x === coord.x && this.y === coord.y
  }
}
