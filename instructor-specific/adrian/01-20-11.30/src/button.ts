import { widget } from "./widget";

export class button implements widget {
    private isMO : boolean = false; // "is currently mouse-overed"
    private isDC : boolean = false; // "a double-click has occurred"
    constructor(public x: number, public y: number, public label: string) {
    }

    draw(gc: CanvasRenderingContext2D): void {
        gc.fillStyle = "lightgray"
        gc.fillRect(this.x, this.y, 200, 100)
        if (this.isDC)
            gc.lineWidth = 15
        else
            gc.lineWidth = 5
        if (this.isMO) 
            gc.strokeStyle = "red"
        else
            gc.strokeStyle = "gray"
        gc.strokeRect(this.x, this.y, 200, 100)
        gc.textAlign = "center"
        gc.textBaseline = "middle"
        gc.fillStyle = "black"
        gc.fillText(this.label, this.x + 200 / 2, this.y + 100 / 2)
    }
    
    mousemove(mx: number, my: number) : void {
        this.isMO = this.x <= mx && mx <= this.x + 200 && this.y <= my && my <= this.y + 100
    }

    dblclk(mx: number, my: number) : void {
        // toggle this.isDC, ignoring location of double-click
        this.isDC = !this.isDC
    }
}