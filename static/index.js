console.log('====\n\n script loaded \n\n====');

const canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.focus();
const ctx = canvas.getContext('2d');

let ripples = []
let totalRipples = window.innerHeight * window.innerWidth * 0.000005;
for(let i = 0; i < totalRipples; i ++) ripples.push(new Ripple());
const counter = new Counter();

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
});

canvas.addEventListener('mousemove', (e) => {
    ripples.push(new Ripple({
        x: e.clientX,
        y: e.clientY,
        temp: true
    }));
})

// todo: add ripples on screen grow, remove on screen shrink
// hard is: how many should I add / remove?
window.addEventListener('resize', (e) => {
    // const currentSize = canvas.height * canvas.width * 0.0002;
    // const newSize = window.innerHeight * window.innerWidth * 0.0002;
    
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    
    // if(currentSize > newSize) {
    //     while(currentSize > newSize) {
    //         ripples.pop();
    //         currentSize--;
    //     }
    // } else {
    //     while(currentSize < newSize) {
    //         ripples.push(new Ripple());
    //         currentSize++;
    //     }
    // }
});