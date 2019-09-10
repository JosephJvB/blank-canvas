function Bubble () {
    this.state = {
        alive: true,
        mode: 2
    };

    const spawn = () => {
        const c = document.querySelector('canvas').getBoundingClientRect();
        this.state.r = Math.random() * (10 - 5) + 5;
        this.state.x = Math.random() * c.width;
        this.state.y = Math.random() * c.height;
        this.state.v = Math.random() * (1.1 - 0.4) + 0.4;
        this.state.lw = Math.random() * (2.5 - 0.5) + 0.5;
        // these numbers make pretty colours, no logic
        this.state.rgb = [
            Math.floor(255 - 28.3 * this.state.x.toString()[0]),
            Math.floor(255 - 28.3 * this.state.x.toString()[1]),
            Math.floor(255 - 28.3 * this.state.x.toString()[2])
        ];
        // todo better fill limiter logic
        this.state.fill = Math.random() >= (ripples.length / 200);
    };

    (() => {
        spawn();
    })();

    this.draw = () => {
        if(this.state.v <= 0) {
            if(mode !== this.state.mode) {
                this.state.alive = false;
                return;
            }
            spawn();
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