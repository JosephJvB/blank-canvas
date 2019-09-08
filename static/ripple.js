function Ripple () {

    const state = {};

    const init = () => {
        const c = document.querySelector('canvas').getBoundingClientRect()
        state.r = Math.random() * (10 - 5) + 5;
        state.x =  Math.random() * c.width;
        state.y = Math.random() * c.height;
        state.v = Math.random() * (1.1 - 0.4) + 0.4;
    };

    // constructor
    (() => {
        init();
    })();


    this.draw = () => {
        if(state.v <= 0)
            init();
        state.r += state.v;
        state.v -= 0.01;
        ctx.beginPath();
        ctx.arc(state.x, state.y, state.r, 0, 2 * Math.PI, false);
        ctx.strokeStyle = `rgba(0,0,0,${state.v})`;
        ctx.stroke();
    };
}