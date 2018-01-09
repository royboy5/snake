'use strict'

import _ from 'lodash'
import Coordinate from './coordinate'

export default class {
  constructor (hSquare, vSquare, square) {
    this.canvas = document.createElement('canvas')
    this.canvas.width = hSquare * square
    this.canvas.height = vSquare * square
    this.canvas.style.width = `${this.canvas.width}px`
    this.canvas.style.height = `${this.canvas.height}px`
    this.ctx = this.canvas.getContext('2d')
    this.square = square

    document.querySelector('#app').appendChild(this.canvas)
  }

  clear () {
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  drawSquare (coordinate, color) {
    let x = coordinate.x * this.square
    let y = coordinate.y * this.square
    this.ctx.fillStyle = color
    this.ctx.beginPath()
    this.ctx.moveTo(x - this.square / 2, y - this.square / 2)
    this.ctx.lineTo(x + this.square / 2, y - this.square / 2)
    this.ctx.lineTo(x + this.square / 2, y + this.square / 2)
    this.ctx.lineTo(x - this.square / 2, y + this.square / 2)
    this.ctx.closePath()
    this.ctx.fill()
  }

  drawSquares (coordinates, color) {
    coordinates.forEach(coordinate => {
      this.drawSquare(coordinate, color)
    })
  }

  wallCollision (coord) {
    return (
      coord.x <= 0 ||
      coord.y <= 0 ||
      coord.x * this.square >= this.canvas.width ||
      coord.y * this.square >= this.canvas.height
    )
  }

  getRandomCoord () {
    let maxX = (this.canvas.width - this.square) / this.square
    let maxY = (this.canvas.height - this.square) / this.square

    let coord = new Coordinate(_.random(1, maxX), _.random(1, maxY))

    return coord
  }
}
