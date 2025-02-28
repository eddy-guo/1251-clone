import { widget } from "./widget";

export class myhappwidget implements widget {
    private mvIsIn : boolean = false
    private dblclkIsIn : boolean = false
    constructor(public x: number, public y: number) {

    }
    
    draw(gc: CanvasRenderingContext2D): void {
        gc.fillStyle = "pink"
        if (this.mvIsIn)
            gc.strokeStyle = "lightblue"
        else
            gc.strokeStyle = "darkblue"
        gc.lineWidth = 5
        gc.beginPath()
        gc.ellipse(this.x, this.y, 100.0, 100.0, 0.0, 0.0, Math.PI * 2.0)
        gc.fill()
        gc.stroke()
        if (this.dblclkIsIn)
            gc.fillStyle = "darkred"
        else
            gc.fillStyle = "lightgreen"
        gc.beginPath()
        gc.ellipse(this.x - 50.0, this.y - 20.0, 20.0, 20.0, 0.0, 0.0, Math.PI * 2.0)
        gc.fill()
        gc.beginPath()
        gc.ellipse(this.x + 50.0, this.y - 20.0, 20.0, 20.0, 0.0, 0.0, Math.PI * 2.0)
        gc.fill()
        gc.beginPath()
        gc.ellipse(this.x, this.y + 30.0, 40.0, 30.0, 0.0, 0.0, Math.PI)
        gc.fill()
    }

    mousedblclk(mx: number, my: number) : void {
        this.dblclkIsIn = Math.sqrt((mx - this.x) * (mx - this.x) + (my - this.y) * (my - this.y)) <= 100.0
    }

    mousemove(mx: number, my: number) : void {
        this.mvIsIn = Math.sqrt((mx - this.x) * (mx - this.x) + (my - this.y) * (my - this.y)) <= 100.0
    }  
}