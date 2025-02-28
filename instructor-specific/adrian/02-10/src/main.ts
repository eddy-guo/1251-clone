import { Layout, setSKRoot, SKContainer, startSimpleKit } from "simplekit/imperative-mode";
import { rightView } from "./rightView";
import { leftViewController } from "./leftVC";
import { model } from "./model";

const mymodel = new model()

// root container
const root = new SKContainer();
root.id = "root"
root.fill = "whitesmoke"
root.padding = 20
root.layoutMethod = new Layout.FillRowLayout({ gap: 50 })

// left side of panel
const left = new leftViewController(mymodel)

// right side of panel
const right = new rightView(mymodel)

root.addChild(left)
root.addChild(right)

setSKRoot(root)
startSimpleKit()