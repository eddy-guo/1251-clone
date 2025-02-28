// linear interpolation: the function calculates a (property) value ranging from startval (at time 0.0)
//   to endval (at time 1.0), with time being [0.0, ..., 1.0]; also applies easing function to time.
export function lerp(
    startval: number,
    endval: number,
    time: number) : number {
    return startval + (endval - startval) * time
}

// identify-easing function
export function id(time: number) {
    return time
}

// flip-easing function: flips order of animation
export function flip(time: number) {
    return 1.0 - time
}

// easeIn-easing function: starts slower, ends faster
//   (more precisely: compresses time towards the beginning of the animation)
export function easeIn(time: number) {
    return Math.pow(time, 2) // return time * time
}

// easeOut-easing function: starts faster, ends slower
//   (more precisely: compresses time towards the end of the animation)
export function easeOut(time: number) {
    return flip(easeIn(flip(time)))
}

// easeInOut-easing function: starts and ends slower, faster in the middle
//   (more precisely: compresses time towards beginning and end of the animation)
export function easeInOut(time: number) {
    return lerp(easeOut(time), easeIn(time), time)
}

export class animator {
    constructor(
        public startval: number, // starting value
        public endvalue: number, // end value
        public duration: number, // duration (in ms) to transition form startval to endval
        public callback: (curvalue: number) => void, // callback to provide the current (interpolated) value
        public easing: (time: number) => number = id) // easing function to use (default: id)
        { }

    starttime = Date.now()
    
    update(time: number) {
        let animationtime = (Date.now() - this.starttime) / this.duration // convert current time, with [0.0, ..., 1.0] meaning that animation is ongoing
        animationtime = Math.min(Math.max(animationtime, 0.0), 1.0) // force animationtime into the range [0.0, ..., 1.0]
        const currentval = lerp(this.startval, this.endvalue, this.easing(animationtime))
        this.callback(currentval)
    }
}