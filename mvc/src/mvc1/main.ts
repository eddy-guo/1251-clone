import {
  startSimpleKit,
  setSKRoot,
  SKContainer,
  Layout,
} from "simplekit/imperative-mode";

// local imports
import { Model } from "./model";
import { LeftView } from "./leftView";
import { RightView } from "./rightView";
import { LeftController } from "./leftController";

// create model
const model = new Model();

// user interface

// root container
const root = new SKContainer();
root.id = "root";
root.fill = "whitesmoke";
root.layoutMethod = new Layout.FillRowLayout();

// centred panel
const panel = new SKContainer();
panel.margin = 50;
panel.fillWidth = 1;
panel.fillHeight = 1;

root.addChild(panel);

// add views to main panel
panel.layoutMethod = new Layout.FillRowLayout({ gap: 50 });
panel.addChild(new LeftView(model, new LeftController(model)));
panel.addChild(new RightView(model));

setSKRoot(root);

startSimpleKit();
