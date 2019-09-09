/*
globals @ index.js
ripples = array of Ripples
ctx = canvas dom-element 2d-context:
    https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
 */
function Counter () {
  (() => {

  })();

  this.draw = () => {
    const x = window.innerWidth / 2 - 27;
    const y = window.innerHeight / 2;
    // github code font family
    ctx.font = '100 48px SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace';
    ctx.fillStyle = 'black';
    ctx.fillText(ripples.length, x, y);
  }
}