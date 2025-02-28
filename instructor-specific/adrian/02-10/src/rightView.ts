import { Layout, SKContainer, SKLabel } from "simplekit/imperative-mode";
import { observer } from "./observer";
import { model } from "./model";

export class rightView extends SKContainer implements observer {
    constructor(private model: model) {
        super({width: 0, id: "right", fill: "white", border: "grey", padding: 20, margin: 20, fillWidth: 1, fillHeight: 1, layoutMethod: new Layout.WrapRowLayout({ gap: 10 })})

        // add this View (as observer) to the model (a.k.a., subject)
        this.model.addObserver(this)
    }

    update(): void {
        // rightView acting as View: clearing and adding one label per model.counter value
        this.clearChildren()
        for (let i = 1; i <= this.model.counter; ++i) {
            this.addChild(new SKLabel({text: i.toString() }))
        }
    }
}