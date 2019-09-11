function Bubble (opts = {}) {
    this.state = {
        alive: true,
        cycles: 0,
        next: 3
    };

    const spawn = () => {
        this.state.cycles++;
        const c = document.querySelector('canvas').getBoundingClientRect();
        this.state.r = Math.random() * (10 - 5) + 5;
        this.state.x = opts.x || Math.random() * (c.width - 150) + 51;
        this.state.y = opts.y || Math.random() * (c.height - 150) + 51;
        this.state.v = Math.random() * (1.1 - 0.4) + 0.4;
        this.state.lw = Math.random() * (2.5 - 0.5) + 0.5;
        // these numbers make pretty colours, no logic
        const entropyStr = this.state.x.toString().replace('.', '');
        this.state.rgb = [
            Math.floor(255 - 28.3 * entropyStr[1]),
            Math.floor(255 - 28.3 * entropyStr[2]),
            Math.floor(255 - 28.3 * entropyStr[3])
        ];
        this.state.fill = Math.random() <= 0.66;
    };

    (() => {
        spawn();
    })();

    this.draw = () => {
        if(this.state.v <= 0) {
            if(this.state.cycles >= 3) {
                this.state.alive = false;
                return;
            }
            spawn();
        }

        ctx.beginPath();
        ctx.arc(this.state.x, this.state.y, this.state.r, 0, 2 * Math.PI, false);
        ctx.lineWidth = this.state.lw;
        ctx.strokeStyle = `rgba(
            ${this.state.rgb[0]},
            ${this.state.rgb[1]},
            ${this.state.rgb[2]},
            ${this.state.v}
        )`;
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