// A timer notifies via callback that a certain amount of time (duration, in ms) has passed.
//   If continuous is false, the timer only calls the callback once and then becomes inactive;
//   if continuous is true, the timer continues calling the callback every duration ms.
export class timer {
    starttime = Date.now()
    active = true
    constructor(public duration: number, public callback: (time: number) => void, public continuous = false) { }

    update(time: number) {
        if (this.active && Date.now() - this.starttime > this.duration) {
            this.callback(time)
            if (this.continuous) {
                this.starttime = Date.now()
            } else {
                this.active = false
            }
        }
    }
}