import { SKEvent, SKMouseEvent } from "simplekit/canvas-mode";
import { SKElement, SKElementProps } from "./element";
import { Style } from "./style";

// An Object that contains all property values necessary to construct a checkbox.
//   These properties include the standard ones from SKElement, and also checked,
//   which can be used to give a checkbox an initial value
export type SKCheckBoxProps = SKElementProps & {checked?: boolean}

// An Event indicating that a change to a checkbox has occurred.
export class SKCheckBoxEvent extends SKEvent {
    constructor(
		type: string,
		timeStamp: number,
		public checked: boolean, // checked holds the new value of the checkbox
		source?: object) {
		super(type, timeStamp, source);
    }
  }

// A checkbox (i.e., Boolean Widget
export class SKCheckBox extends SKElement {
    checked: boolean // stores the current state of the checkbox

    constructor({
        checked = false,
        width = Style.widgetHeight, // using the same values for width and height to create a square-shaped checkbox
        height = Style.widgetHeight,
        ...otherElementProps
    }: SKCheckBoxProps = {}) {
        super({ ...otherElementProps, width, height });
        this.checked = checked
    }

    draw(gc: CanvasRenderingContext2D): void {
        gc.save()
        
		gc.lineWidth = 2
        gc.strokeRect(this.x, this.y, this.width, this.height)
        if (this.checked) {
			const offset = 6
			
			// alternative 1: smaller square in checkbox
            gc.fillRect(this.x + offset, this.y + offset, this.width - 2.0 * offset, this.height - 2.0 * offset)
			
			// alternative 2: X in checkbox
			/*gc.beginPath()
            gc.moveTo(this.x + offset, this.y + offset)
            gc.lineTo(this.x + this.width - offset, this.y + this.height - offset)
            gc.moveTo(this.x + this.width - offset, this.y + offset)
            gc.lineTo(this.x + offset, this.y + this.height - offset)
            gc.stroke()*/
        }
        gc.restore()
    }

	// respond to all mouse events
    handleMouseEvent(mev: SKMouseEvent) {
        switch (mev.type) {
            case "click":
                if (this.hitTest(mev.x, mev.y)) { // if click event was inside checkbox
					// toggle value (true -> false, or false -> true)
                    this.checked = !this.checked
					// find all registered listeners for type "cbchange" (=> "clickbox change") and notify them via callback
					//   the callback receives a SKCheckBoxEvent with field "checked" set to the new value of the checkbox
                    this.listeners.filter(lstnr => lstnr.t === "cbchange").forEach(lstnr => lstnr.cb(new SKCheckBoxEvent("cbchange", mev.timeStamp, this.checked, mev.source)))
                }
            break;
        }
    }

    // array of event listeners
	listeners: Array<{t: string, cb: (ev: SKEvent) => void}> = new Array()
	
	// function to register ("add") event listeners with the checkbox
    addEventListener(type: string, callback: (ev: SKEvent) => void) {
        this.listeners.push({t: type, cb: callback})
    }
}