// dig into SimpleKit to pull out the simulated "raw" events
// and simulated "window system" event loop
// *** WARNING *** This is not the usual way to import from SimpleKit
import {
  createWindowingSystem,
  FundamentalEvent,
} from "../../../simplekit/src/windowing-system";

// simulated UI Toolkit events
import { SKEvent } from "simplekit/canvas-mode";

// event translators for this demo
import {
  EventTranslator,
  fundamentalTranslator,
  clickTranslator,
  dblclickTranslator,
  dragTranslator,
} from "./translators";

// Coalesces some fundamental events into a single event of
// the same type (it mutates the list)
function coalesceEvents(
  events: FundamentalEvent[],
  eventTypes: String[] = ["mousemove", "resize", "null"]
) {
  
  const original = [...events];
  events.length = 0;
  original.forEach((e) => {
    // events.push(e);
    if (eventTypes.indexOf(e.type) > -1) {
      const i = original.findIndex((ee) => ee.type in eventTypes);
      if (i > -1) {
        console.log(`${e.type} (${e.x}, ${e.y}) at ${e.timeStamp}`);
        events[i] = e;
      } else {
        events.push(e);
      }
    } else {
      events.push(e);
    }
  });
  if (events.length !== original.length) {
    console.log(`coalesced ${original.length} events into ${events.length} events`);
  }
}

export function runLoop(
  eventQueue: FundamentalEvent[],
  time: number
) {

  // fundamental event queue coalescing
  coalesceEvents(eventQueue);
  
  // list of toolkit events to dispatch
  let events: SKEvent[] = [];

  // if (eventQueue.length == 0) {
  //   eventQueue.push({
  //     type: "null",
  //     timeStamp: time,
  //   } as FundamentalEvent);
  // }

  // translate fundamental events to toolkit events
  while (eventQueue.length > 0) {
    const fundamentalEvent = eventQueue.shift();
    if (!fundamentalEvent) continue;

    // multiple translators can return a translated event
    translators.forEach((t) => {
      const translatedEvent = t.update(fundamentalEvent);
      if (translatedEvent) {
        events.push(translatedEvent);
      }
    });
  }

  // global dispatch all events
  if (eventListener) events.forEach((e) => eventListener(e));
  
  // now tell application to redraw
  if (drawCallback) drawCallback(gc);

  
}

// event listener callback fo toolkit apps
export function setEventListener(listener: EventListener) {
  eventListener = listener;
}
type EventListener = (e: SKEvent) => void;
let eventListener: EventListener;

// draw callback for toolkit apps
export function setDrawCallback(draw: DrawCallback) {
  drawCallback = draw;
}
type DrawCallback = (gc: CanvasRenderingContext2D) => void;
let drawCallback: DrawCallback;

const translators: EventTranslator[] = [
  fundamentalTranslator,
  clickTranslator,
  dblclickTranslator,
  dragTranslator,
];

export function addEventTranslator(translator: EventTranslator) {
  translators.push(translator);
  console.log(
    `added event translator, now ${translators.length} translators`
  );
}

// save the canvas context for the draw callback
let gc: CanvasRenderingContext2D;

export function startRunLoop() {
  console.log(`start run loop`);

  // create a canvas and add it to the document body
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
  // set a background style to make it easier to see the canvas
  canvas.style.setProperty("background", "whitesmoke");

  // save graphics context to local module variable
  const graphicsContext = canvas.getContext("2d");
  // this should never happen, but we need to check
  if (!graphicsContext) {
    console.error("Unable to get graphics context from canvas");
    return false;
  }
  gc = graphicsContext;

  // create the simulated windowing system with run loop
  createWindowingSystem(runLoop);
}
