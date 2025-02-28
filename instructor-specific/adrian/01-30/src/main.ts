import { setSKDrawCallback, setSKEventListener, SKMouseEvent, startSimpleKit } from "simplekit/canvas-mode";
import { SKCheckBox, SKCheckBoxEvent } from "./checkbox";

const checkbox = new SKCheckBox({checked: false, x: 50, y: 50})

checkbox.addEventListener("cbchange", ev => {
    const cbev = ev as SKCheckBoxEvent
    console.log(cbev.checked)
})

setSKDrawCallback(gc => {
    gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height)
    checkbox.draw(gc)
})

setSKEventListener(ev => {
    const mev = ev as SKMouseEvent
    if (mev) {
        checkbox.handleMouseEvent(mev)
    }
})

startSimpleKit()