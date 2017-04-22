const canvas = document.querySelector('#particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Randomizer {
    static getRandomColor() {
        let rgb = 'rgba(', i;
        for (i = 0; i < 3; i++) {
            rgb += Math.floor(Math.random() * 255) + ', ';
        }
        return rgb + '0.5)';
    }
}

class Particle {
    constructor() {
        this.randomize();
    }
    tick() {
        if (this.radius < 2) {
            this.randomize();
        }
        this.radius -= Math.random();
    }
    randomize() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = 50 + Math.random() * 50;
        this.color = Randomizer.getRandomColor();
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
    }
    tick() {
        this.particles.forEach(particle => {
            particle.draw(ctx);
            particle.tick();
        });
    }
}

const mob = new ParticlesMob();

(function animationLoop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    mob.tick();
    window.requestAnimationFrame(animationLoop);
})();