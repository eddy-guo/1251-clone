import { subject } from "./observer";

export class model extends subject {
    private _counter: number = 0

    get counter() {
        return this._counter
    }

    // increment increments the counter by 1
    increment() {
        ++this._counter
        // there could be more sanity / constraint / requirement checking here, e.g.,
        //   this._counter = Math.min(this._counter, 349)
        this.notifyObservers()
    }
}