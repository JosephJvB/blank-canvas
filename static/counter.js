function Counter () {
  (() => {

  })();

  this.draw = () => {
    const n = circles.length;
    const digitOffset = (n.toString().length - 1) * 15;
    const x = window.innerWidth / 2 - digitOffset;
    const y = window.innerHeight / 2 - 20;
    // github code font family
    ctx.font = '100 48px SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace';
    ctx.fillStyle = 'black';
    ctx.fillText(n, x, y);
    // if(n.toString().includes(69)) {
    //   ctx.font = '100 12px SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace';
    //   ctx.fillText('nice', x + digitOffset, y + 20);
    // }
  }
}