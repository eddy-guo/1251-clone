import { Animator } from "./animator";
import { CallbackTimer } from "./timer";

type SquareProps = {
  x?: number;
  y?: number;
  x1?: number;
  y1?: number;
  size?: number;
  fill?: string;
  stroke?: string;
  lineWidth?: number;
  animateFill?: Animator;
  animatePositionX?: Animator;
  animatePositionY?: Animator;
  timer?: CallbackTimer;
};

const green = 120;
const blue = 240;

export class Square {
  constructor({
    x = 0,
    y = 0,
    x1 = 0,
    y1 = 0,
    size = 100,
    fill = "green",
    stroke = "none",
    lineWidth = 0,
    animateFill = new Animator(green, blue, 500, (value) => {
        this.fill = `hsl(${value}, 100%, 50%)`;
    }),
    animatePositionX = new Animator(0, 1, 1000, (value) => {
        this.x = this.x + value * (this.x1 - this.x);
    }),
    animatePositionY = new Animator(0, 1, 1000, (value) => {
        this.y = this.y + value * (this.y1 - this.y);
    }),
    timer = new CallbackTimer(2000, (time) => {
        console.log(`return to green (${green}) at ${time}!`);
        this.fill = `hsl(${green}, 100%, 50%)`;
    }),
  }: SquareProps = {}) {
    this.x = x;
    this.y = y;
    this.x1 = x1;
    this.y1 = y1;
    this.size = size;
    this.fill = fill;
    this.stroke = stroke;
    this.lineWidth = lineWidth;
    this.animateFill = animateFill;
    this.animatePositionX = animatePositionX;
    this.animatePositionY = animatePositionY;
    this.timer = timer;
  }

  x: number;
  y: number;
  x1: number;
  y1: number;
  size: number;
  fill: string;
  stroke: string;
  lineWidth: number;
  animateFill: Animator;
  animatePositionX: Animator;
  animatePositionY: Animator;
  timer: CallbackTimer;

  draw(gc: CanvasRenderingContext2D) {
    gc.beginPath();
    if (this.fill) gc.fillStyle = this.fill;
    if (this.stroke) gc.strokeStyle = this.stroke;
    if (this.lineWidth) gc.lineWidth = this.lineWidth;
    gc.rect(
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size
    );
    if (this.fill) gc.fill();
    if (this.lineWidth) gc.stroke();
  }

  hitTest(x: number, y: number) {
    return (
      x >= this.x - this.size / 2 &&
      x <= this.x + this.size / 2 &&
      y >= this.y - this.size / 2 &&
      y <= this.y + this.size / 2
    );
  }

  
}
