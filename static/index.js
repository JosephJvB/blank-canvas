console.log('====\n\n script loaded \n\n====');

const canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const ctx = canvas.getContext('2d');

let ripples = []
let totalRipples = window.innerHeight * window.innerWidth * 0.000005;
for(let i = 0; i < totalRipples; i ++) ripples.push(new Ripple());

(function animate () {
    const c = canvas.getBoundingClientRect();
    ctx.clearRect(0,0,c.width,c.height);
    if(ripples.length > totalRipples) {
        ripples = ripples.filter(r => r.state.alive);
    }
    ripples.forEach(r => r.draw());
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

window.addEventListener('resize', (e) => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    // control ripple numbers...
    // let newTot = window.innerHeight * window.innerWidth * 0.0002;
    // if(tot > newTot) {
    //     while(tot > newTot) {
    //         ripples.pop();
    //         tot--;
    //     }
    // } else {
    //     while(tot < newTot) {
    //         ripples.push(new Ripple());
    //         tot++;
    //     }
    // }
});