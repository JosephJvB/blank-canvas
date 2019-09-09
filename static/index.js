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
*/
canvas.addEventListener('keydown', (e) => {
    if((e.keyCode == 39) || (e.keyCode == 38)) {
        ripples.push(new Ripple());
        totalRipples++;
    }
    if((e.keyCode == 37) || (e.keyCode == 40)) {
        ripples.pop();
        totalRipples--;
    }
    if(e.keyCode == 13) {
        colourize = !colourize;
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