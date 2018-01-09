'use strict'

export default class {
  constructor (coordinate, foodColor) {
    this.location = coordinate
    this.color = foodColor
  }

  setLocation (coordinate) {
    this.location = coordinate
  }
}
