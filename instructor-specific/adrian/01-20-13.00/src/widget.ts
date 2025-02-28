export interface widget {
    draw(gc: CanvasRenderingContext2D) : void
    mousemove(mx: number, my: number) : void
    mousedblclk(mx: number, my: number) : void
}