const canvas = document.querySelector('#particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Randomizer {
  static getRandomColor() {
    let rgb = '';
    for (let i = 0; i < 3; i++) {
      rgb += Math.floor(Math.random() * 255) + ', ';
    }
    return `rgba(${rgb}0.5)`;
  }
}

class Particle {
  constructor(x = Math.random() * canvas.width, y = Math.random() * canvas.height, minRadius = 50) {
    this.x = x;
    this.y = y;
    this.minRadius = minRadius;
    this.randomize();
  }
  tick() {
    if (this.radius < 2) {
      this.randomize();
    }
    this.radius -= Math.random();
    move(this);
    function move(particle) {
      particle.x += particle.xVel;
      particle.y += particle.yVel;
    }
  }
  randomize() {
    this.radius = this.minRadius + Math.random() * 50;
    this.color = Randomizer.getRandomColor();
    this.xVel = Math.random() - 0.5;
    this.yVel = Math.random() - 0.5;
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

class ParticlesMob {
  constructor() {
    this.particles = [];
    for (let i = 0; i < 50; i++) {
      this.particles.push(new Particle());
    }
    canvas.addEventListener('click', (event) => {
      for (var i = 0; i < 50; i++) {
        this.particles.push(new Particle(event.clientX, event.clientY, 5));
      }
    });
  }
  tick() {
    if (this.particles.length > 500) {
      this.particles.shift();
    };
    this.particles.forEach(particle => {
      particle.draw(ctx);
      particle.tick();
    });
  }
}

const mob = new ParticlesMob();
(function animationLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  mob.tick();
  window.requestAnimationFrame(animationLoop);
})();
