export interface widget {
    draw(gc: CanvasRenderingContext2D) : void
    mousemove(mx: number, my: number) : void
    dblclk(mx: number, my: number) : void
}
