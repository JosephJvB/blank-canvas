console.log('====\n\n script loaded \n\n====');

// globals
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let ripples = [] // ripple.js
let totalRipples = 0;
let colourize = false;
const counter = new Counter(); // counter.js

// setup canvas
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.focus();

(function animate () {
    const c = canvas.getBoundingClientRect();
    ctx.clearRect(0,0,c.width,c.height);
    if(ripples.length > totalRipples) {
        ripples = ripples.filter(r => r.state.alive);
    }
    ripples.forEach(r => r.draw());
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
            ripples.push(new Ripple());
            totalRipples++;
            return;
        }
        // todo: dont immediately remove
        // flag ripple as alive = false. It wont respawn
        case 37:
        case 40: {
            ripples.pop();
            totalRipples--;
            return;
        }
        case 13: {
            colourize = !colourize;
            return;
        }
        case 8: {
            ripples = [];
            totalRipples = 0;
            return;
        }
        default: return;
    }
});

canvas.addEventListener('mousemove', (e) => {
    if(colourize) return;
    ripples.push(new Ripple({
        x: e.clientX,
        y: e.clientY,
        temp: true
    }));
})

window.addEventListener('resize', (e) => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
});