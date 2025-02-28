import { id, lerp } from "./animator";

// keyframe encodes the desired (property) value at a given time (in ms)
export type keyframe = { time: number, value: number }

// keyframer processes an array of keyframes and yield the interpolated values back via callback.
export class keyframer {
     // keyframes: an array of keyframes
     // callback: he callback used for tweening
    constructor(public keyframes: Array<keyframe>, public callback: (p: number) => void) { }

    update(time: number) {
        let idx = 0
        // finding the next keyframe, i.e., the keyframe just after the current time
        for (; idx < this.keyframes.length; ++idx) {
            if (this.keyframes[idx].time > time) break;
        }
    	// if animation is over, return
        if (idx === this.keyframes.length) {
        	return
        } else {
        	const keyframePrev = this.keyframes[idx-1] // keyframe just before the current time
        	const keyframeNext = this.keyframes[idx]   // keyframe just after the current time
        	// i.e., keyframePrev.time <= time < keyframeNext.time
        	
        	// perform normal linear interpolation
        	let animationtime = (time - keyframePrev.time) / (keyframeNext.time - keyframePrev.time)
        	let currentval = lerp(keyframePrev.value, keyframeNext.value, animationtime, id)
        	this.callback(currentval)
    	}
    }
}