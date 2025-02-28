export class circle {
    constructor(public x = 0, public y = 0, public r = 32, public fill = "red") {}
    draw(gc: CanvasRenderingContext2D) {
        gc.save();
        gc.beginPath();
        gc.fillStyle = this.fill
        gc.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        gc.fill();
        gc.restore();
    }

    // setting x- and y-velocity to [-3.0, ..., 3.0]
    deltax = (Math.random() - 0.5) * 6.0
    deltay = (Math.random() - 0.5) * 6.0
    
    // manual animation
    update(time: number) {
        // adding x- and y-velocity to x- and y-coordinates
        this.x += this.deltax
        this.y += this.deltay
    }
}