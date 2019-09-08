function Ripple (opts = {}) {

    this.state = {};

    const spawn = () => {
        const c = document.querySelector('canvas').getBoundingClientRect()
        this.state.r = Math.random() * (10 - 5) + 5;
        this.state.x =  opts.x || Math.random() * c.width;
        this.state.y = opts .y || Math.random() * c.height;
        this.state.v = Math.random() * (1.1 - 0.4) + 0.4;
    };

    const destroy = () => {
        const idx = ripples.findIndex(r => (
            r.state.x === this.state.x && r.state.y === this.state.y
        ));
        // alter global ripples array
        ripples.splice(idx, 1);
    }

    // constructor
    (() => {
        spawn();
    })();

    // reset if alpha/velocity is 0
    this.draw = () => {
        if(this.state.v <= 0) {
            if(opts.temp) return destroy();
            else spawn();
        }
        this.state.r += this.state.v;
        this.state.v -= 0.01;
        ctx.beginPath();
        ctx.arc(this.state.x, this.state.y, this.state.r, 0, 2 * Math.PI, false);
        ctx.strokeStyle = `rgba(0,0,0,${this.state.v})`;
        ctx.stroke();
    };
}