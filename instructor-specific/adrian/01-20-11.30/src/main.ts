import { addSKEventTranslator, dblclickTranslator, FundamentalEvent, setSKDrawCallback, setSKEventListener, SKEvent, SKKeyboardEvent, SKMouseEvent, startSimpleKit } from "simplekit/canvas-mode"
import { widget } from "./widget"
import { button } from "./button"

setSKDrawCallback(gc => {
    gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height)
    widgets.forEach(widget => widget.draw(gc))
})

setSKEventListener(ev => {
    if (ev.type === "mousemove") {
        const mev = ev as SKMouseEvent
        widgets.forEach(widget => widget.mousemove(mev.x, mev.y))
    } else if (ev.type === "dblclick") {
        const mev = ev as SKMouseEvent
        widgets.forEach(widget => widget.dblclk(mev.x, mev.y))
    } else if (ev.type === "longClick") {
        console.log("A long click has occurred!!!")
    } else if (ev.type === "keydown") {
        const kev = ev as SKKeyboardEvent
        console.log(kev.key)
    }
})

// creates a "longClick" mouse event if the mouse click was between 3 and 5 sconds long
const longclickTranslator = {
    minTime: 3,
    maxTime: 5,
    timer: 0,
    update(fe: FundamentalEvent) : SKEvent | undefined { // returns either an SKEvent or 
        switch (fe.type) {
            case "mousedown":
                this.timer = Date.now()
                break
            case "mouseup":
                const span = (Date.now() - this.timer) / 1000
                if (this.minTime <= span && span <= this.maxTime)
                    return new SKMouseEvent("longClick", fe.timeStamp, fe.x || 0, fe.y || 0)
                break
        }
    }
}

const widgets : Array<widget> = new Array()
widgets.push(new button(100, 100, "Okay"))
widgets.push(new button(350, 100, "Cancel"))

addSKEventTranslator(dblclickTranslator)
addSKEventTranslator(longclickTranslator)
startSimpleKit()