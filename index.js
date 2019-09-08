console.log('====\n\n script loaded \n\n====');

const C = document.querySelector('canvas');
const ctx = C.getContext('2d');
const rec = C.getBoundingClientRect();

function clicker () {
    ripp = new Ripple();
    anni();
}

function anni () {
    ctx.clearRect(0,0,rec.width, rec.height);
    ripp.draw();
    requestAnimationFrame(anni);
}

function Ripple () {

    let state = {};

    const init = () => {
        console.log('rip init');
        state.r = Math.random() * (30 - 5) + 5;
        state.x = Math.random() * 300;
        state.y = Math.random() * 150;
        state.max = Math.random() * (100 - 25) + 25;
        state.v = Math.random() * (0.9 - 0.4) + 0.4;
    }

    // constructor
    (() => {
        init();
    })();


    this.draw = () => {
        // if circle gets too big, start again
        if(state.r >= state.max) {
            init();
        }
        state.r += state.v;
        ctx.beginPath();
        ctx.arc(state.x, state.y, state.r, 0, 2 * Math.PI, false);
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }
}