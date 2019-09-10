/*
globals @ index.js
colourize = bool, colour&fill ripples on true, black&unfilled on false
ctx = canvas dom-element 2d-context:
    https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
*/
function Ripple (opts = {}) {

    this.state = {
        alive: true,
    };

    const spawn = () => {
        const c = document.querySelector('canvas').getBoundingClientRect();
        this.state.r = Math.random() * (10 - 5) + 5;
        this.state.x = opts.x || Math.random() * c.width;
        this.state.y = opts.y || Math.random() * c.height;
        this.state.v = Math.random() * (1.1 - 0.4) + 0.4;
        this.state.lw = opts.temp ? 1 : Math.random() * (2.5 - 0.5) + 0.5;
    };

    // constructor
    (() => {
        spawn();
    })();

    // reset if alpha/velocity is 0
    this.draw = () => {
        if(this.state.v <= 0) {
            if(mode !== 1 || opts.temp) {
                this.state.alive = false;
                return;
            }
            else spawn();
        }

        ctx.beginPath();
        ctx.arc(this.state.x, this.state.y, this.state.r, 0, 2 * Math.PI, false);
        ctx.strokeStyle = `rgba(0,0,0,${this.state.v})`;
        ctx.lineWidth = this.state.lw;
        ctx.stroke();

        this.state.r += this.state.v;
        this.state.v -= 0.01;
        this.state.lw -= 0.01;
    };
}