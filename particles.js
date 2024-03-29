//jshint esnext:true
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const getRandomColor = () => {
    let rgb = '';
    for (let i = 0; i < 3; i++) {
        rgb += Math.floor(Math.random() * 255) + ', ';
    }
    return `rgba(${rgb}0.5)`;
};

class Particle {
    constructor(options) {
        this.randomize(options);
    }
    tick() {
        if (this.radius < 2) {
            this.randomize();
        }
        this.radius -= Math.random();
    }
    randomize(options) {
        this.x = options ? options.x : Math.random() * canvas.width;
        this.y = options ? options.y : Math.random() * canvas.height;
        this.radius = 50 + Math.random() * 50;
        this.color = options ? options.color : getRandomColor();
    }
    draw() {
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
    }
    tick() {
        this.particles.forEach(particle => {
            particle.draw();
            particle.tick();
        });
    }
    addParticleAt(x, y) {
        this.particles.push(new Particle({ x, y, color: 'red' }));
    }
}

const mob = new ParticlesMob();

(function animation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    mob.tick();
    window.requestAnimationFrame(animation);
})();

canvas.addEventListener('click', (ev) => {
    mob.addParticleAt(ev.clientX, ev.clientY);
});