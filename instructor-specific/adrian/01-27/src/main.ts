import { setSKAnimationCallback, setSKDrawCallback, startSimpleKit } from "simplekit/canvas-mode"
import { circle } from "./circle"
import { keyframer } from "./keyframer"
import { animator, easeIn, easeInOut, easeOut, flip, id } from "./animator"
import { timer } from "./timer"

// five circles
const circles = new Array(
    new circle(200, 125, 10),
    new circle(300, 125, 10),
    new circle(400, 125, 10),
    new circle(500, 125, 10),
    new circle(600, 125, 10)
)

setSKDrawCallback(gc => {
    gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height)
    circles.forEach(c => c.draw(gc))
    gc.strokeRect(100, 100, 600, 400)
})

setSKAnimationCallback(time => {

    // manual animation
    circles.forEach(circ => {
        // reversing x- / y-direction if circ is out of bounds
        if (circ.x > 700 - circ.r || circ.x < 100 + circ.r) circ.deltax *= -1.0
        if (circ.y > 500 - circ.r || circ.y < 100 + circ.r) circ.deltay *= -1.0
        circ.update(time)
    })

    // timer animation
    //timers.forEach(t => t.update(time))

    // animator animation
    //animators.forEach(t => t.update(time))

    // keyframe animation
    //kf.update(time)
})

// two timers that turn circles green every 3 seconds, and back red every 5 seconds
const timers = new Array(
    new timer(3000, (time) => {
        circles.forEach(c => c.fill = "green");
    }, true),
    new timer(5000, (time) => {
        circles.forEach(c => c.fill = "red");
    }, true)
)

// five animators, one for each circle, all interpolating between the same values ([125, ..., 475]) over
//   3000 ms (= 3 seconds), but using different easing functions
const animators = new Array(
    new animator(125, 475, 3000, (val) => {  
        circles[0].y = val
    }, id),
    new animator(125, 475, 3000, (val) => {  
        circles[1].y = val
    }, flip),
    new animator(125, 475, 3000, (val) => {  
        circles[2].y = val
    }, easeIn),
    new animator(125, 475, 3000, (val) => {  
        circles[3].y = val
    }, easeOut),
    new animator(125, 475, 3000, (val) => {  
        circles[4].y = val
    }, easeInOut))

// setting the radius of all circles using six keyframes
const kf = new keyframer([
    {time: 0, value: 10},
    {time: 1000, value: 30},
    {time: 4000, value: 50},
    {time: 4500, value: 5},
    {time: 5500, value: 50},
    {time: 9000, value: 10},
], (curval) => {
    circles.forEach(circ => circ.r = curval)
})

startSimpleKit()