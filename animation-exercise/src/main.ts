import { random } from "simplekit/utility";
import {
  startSimpleKit,
  setSKDrawCallback,
  setSKAnimationCallback,
  setSKEventListener,
  SKResizeEvent,
  SKMouseEvent
} from "simplekit/canvas-mode";

let width = 0;
let height = 0;

import { Square } from "./square";

const size = 64;
let resized = false;

const square = new Square({
    x: random(size, width - size),
    y: random(size, height - size),
    size: size
});

setSKEventListener((e) => {
    if (e.type === "resize") {
      const re = e as SKResizeEvent;
      width = re.width;
      height = re.height;
      console.log(`${e.type} (${width}, ${height}) at ${e.timeStamp} `);
      if (!resized) {
        square.x = random(size, width - size);
        square.y = random(size, width - size);
        resized = true;
      }
      else {
        if (square.x > width - size) {
          square.x = width - size;
        }
        if (square.x < 0 ) {
            square.x = 0;
        }    
        if (square.y > height - size) {
          square.y = height - size;
        }
        if (square.y < 0 ) {
            square.y = 0;
        }
      }
      
    }
    else if (e.type === "click") {
      const m = e as SKMouseEvent;
      console.log(`${e.type} at (${m.x}, ${m.y}) at ${e.timeStamp}`);
      if (square.hitTest(m.x, m.y)) {
        square.animateFill.start(e.timeStamp);
        square.timer.start(e.timeStamp);
      }
      else {
        square.x1 = m.x;
        square.y1 = m.y;
        square.animatePositionX.start(e.timeStamp);
        square.animatePositionY.start(e.timeStamp);
      }
    }
}); 

setSKDrawCallback((gc) => {
  // clear canvas and draw everything
  gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);
  square.draw(gc);
});

// set the animation callback
setSKAnimationCallback((time) => {
    // update the square
    square.animateFill.update(time);
    square.animatePositionX.update(time);
    square.animatePositionY.update(time);
    square.timer.update(time);
});

startSimpleKit();