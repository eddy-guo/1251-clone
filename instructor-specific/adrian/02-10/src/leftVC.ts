import { Layout, SKButton, SKContainer } from "simplekit/imperative-mode";
import { observer } from "./observer";
import { model } from "./model";

export class leftViewController extends SKContainer implements observer {
    private _button : SKButton
    constructor(private model: model) {
        super({width: 0, id: "left", fill: "white", border: "grey", padding: 20, margin: 20, fillWidth: 1, layoutMethod: new Layout.CentredLayout()})

        this._button = new SKButton({ text: model.counter.toString(), width: 100 })
        this._button.addEventListener("action", () => {
            // leftViewController acting as Controller: instructing the model to update / recalculate its state
            this.model.increment()
        });
        this.addChild(this._button)

        // add this ViewController (as observer) to the model (a.k.a., subject)
        this.model.addObserver(this)
    }

    update(): void {
        // leftViewController acting as View: updating the button text upon model notification
        this._button.text = this.model.counter.toString()
    }
}