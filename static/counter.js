// GLOBALS
// index.js: ctx, ripples
function Counter () {
  (() => {

  })();

  this.draw = () => {
    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2;
    const num = ripples.length;
    // github code font family
    ctx.font = '48px SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace';
    ctx.fillText(num, x, y);
  }
}