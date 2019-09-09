/*
globals @ index.js
colourize = bool, colour&fill ripples on true, black&unfilled on false
ctx = canvas dom-element 2d-context:
    https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
*/
function Ripple (opts = {}) {

    this.state = {
        alive: true,
        rgb: [0, 0, 0],
        fill: false
    };

    const spawn = () => {
        const c = document.querySelector('canvas').getBoundingClientRect()
        this.state.r = Math.random() * (10 - 5) + 5;
        this.state.x =  opts.x || Math.random() * c.width;
        this.state.y = opts .y || Math.random() * c.height;
        this.state.v = Math.random() * (1.1 - 0.4) + 0.4;
        this.state.lw = opts.temp ? 1 : Math.random() * (2.5 - 0.5) + 0.5;
        if(colourize) {
            // these numbers make pretty colours, no logic
            this.state.rgb = [
                Math.floor(200 - 25 * this.state.x.toString()[0]),
                Math.floor(200 - 25 * this.state.x.toString()[1]),
                Math.floor(200 - 25 * this.state.x.toString()[2])
            ];
            this.state.fill = Math.random() >= (ripples.length / 200);
        } else {
            this.state.rgb = [0, 0, 0];
            this.state.fill = false;
        }
    };

    // constructor
    (() => {
        spawn();
    })();

    // reset if alpha/velocity is 0
    this.draw = () => {
        if(this.state.v <= 0) {
            if(opts.temp) { this.state.alive = false; return ;}
            else spawn();
        }

        ctx.beginPath();
        ctx.arc(this.state.x, this.state.y, this.state.r, 0, 2 * Math.PI, false);
        ctx.strokeStyle = `rgba(
            ${this.state.rgb[0]},
            ${this.state.rgb[1]},
            ${this.state.rgb[2]},
            ${this.state.v}
        )`;
        ctx.lineWidth = this.state.lw;
        ctx.stroke();
        if(this.state.fill) {
            ctx.fillStyle = `rgba(
                ${this.state.rgb[0]},
                ${this.state.rgb[1]},
                ${this.state.rgb[2]},
                ${this.state.v - 0.2}
            )`;
            ctx.fill();
        }

        this.state.r += this.state.v;
        this.state.v -= 0.01;
        this.state.lw -= 0.01;
    };
}