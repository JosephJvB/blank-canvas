console.log('====\n\n script loaded \n\n====');

// globals
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let circles = [];
let colourize = false;
let mode = 1;
const counter = new Counter(); // counter.js
const dict = {
    1: Ripple, // ripple.js
    2: Bubble, // bubble.js
    3: Ball // ball.js
};
// setup canvas
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.focus();

(function animate () {
    const c = canvas.getBoundingClientRect();
    ctx.clearRect(0,0,c.width,c.height);
    // is there a better way to remove circles from screen?
    circles = circles.reduce((rips, r) => {
        if(!r.state.alive) {
            if(r.state.temp) return rips;
            if(r.state.mode !== mode) rips.push(new dict[mode](r.state));
        }
        else rips.push(r);
        return rips;
    }, []);
    circles.forEach(r => r.draw());
    counter.draw();
    requestAnimationFrame(animate);
})();

/*
left = 37
up = 38
right = 39
down = 40
enter = 13
backspace = 8
*/
canvas.addEventListener('keydown', (e) => {
    switch(e.keyCode) {
        case 38:
        case 39: {
            circles.push(new dict[mode]());
            return;
        }
        case 37:
        case 40: {
            if(!circles[0]) return;
            circles[0].state.alive = false;
            return;
        }
        case 13: {
            mode++;
            if(mode > 3) mode = 1;
            return;
        }
        case 8: {
            circles = [];
            return;
        }
        default: return;
    }
});

canvas.addEventListener('mousemove', (e) => {
    if(mode !== 1) return;
    circles.push(new Ripple({
        x: e.clientX,
        y: e.clientY,
        temp: true
    }));
})

window.addEventListener('resize', (e) => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
});