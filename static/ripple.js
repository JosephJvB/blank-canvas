function Ripple (opts = {}) {

    this.state = {
        alive: true,
        temp: opts.temp,
        mode: 1
    };

    const spawn = () => {
        const c = document.querySelector('canvas').getBoundingClientRect();
        this.state.r = Math.random() * (10 - 5) + 5;
        this.state.x = opts.x || Math.random() * (c.width - 150) + 51;
        this.state.y = opts.y || Math.random() * (c.height - 150) + 51;
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
            if(mode !== this.state.mode || opts.temp) {
                this.state.alive = false;
                return;
            }
            spawn();
        }

        ctx.beginPath();
        ctx.arc(this.state.x, this.state.y, this.state.r, 0, 2 * Math.PI, false);
        ctx.lineWidth = this.state.lw;
        ctx.strokeStyle = `rgba(0,0,0,${this.state.v})`;
        ctx.stroke();

        this.state.r += this.state.v;
        this.state.v -= 0.01;
        this.state.lw -= 0.01;
    };
}