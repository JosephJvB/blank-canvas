function Ball (opts = {}) {

  this.state = {
      alive: true,
      temp: opts.temp,
      mode: 1
  };

  const spawn = () => {
      const c = document.querySelector('canvas').getBoundingClientRect();
      this.state.r = opts.r || Math.random() * (50 - 5) + 5;
      this.state.x = opts.x || Math.random() * (c.width - 150) + 51;
      this.state.y = opts.y || Math.random() * (c.height - 150) + 51;
      this.state.vx = Math.random() * (1.1 - 0.4) + 0.4;
      this.state.vy = Math.random() * (1.1 - 0.4) + 0.4;
      this.state.lw = 2;
      if(Math.random() >= 0.5) this.state.vx *= -1;
      if(Math.random() >= 0.5) this.state.vy *= -1;
  };

  // constructor
  (() => {
      spawn();
  })();

  // reset if alpha/velocity is 0
  this.draw = () => {
      if(this.state.v <= 0) {
          if(mode !== this.state.mode || opts.temp) {
              this.state.alive = false;
              return;
          }
          spawn();
      }

      ctx.beginPath();
      ctx.arc(this.state.x, this.state.y, this.state.r, 0, 2 * Math.PI, false);
      ctx.lineWidth = this.state.lw;
      ctx.strokeStyle = `rgba(0,0,0,${this.state.v})`;
      ctx.stroke();

      const nextx = this.state.x += this.state.vx;
      const nexty = this.state.y += this.state.vy;
      if(nextx + this.state.r >= window.innerWidth || nextx - this.state.r <= 0) {
        this.state.vx *= -1;
      }
      if(nexty + this.state.r >= window.innerHeight || nexty - this.state.r <=0) {
        this.state.vy *= -1;
      }
      this.state.x += this.state.vx;
      this.state.y += this.state.vy;
  };
}