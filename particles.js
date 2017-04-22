const canvas = document.querySelector('#particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor() {
        this.randomize();
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
    randomize() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = 50 + Math.random() * 50;
        this.color = getRandomColor();
    }
    tick() {
        if (this.radius < 2) {
            this.randomize();
        }
        this.radius -= Math.random();
    }
}


var ParticleMob = function(){
    this._particles = [];
    for (var i = 0; i < 50; i++) {
        this._particles.push(new Particle());
    }
};

var mob = new ParticleMob();

ParticleMob.prototype.tick = function() {
    this._particles.forEach(function(particle) {
        particle.draw(ctx);
        particle.tick();
    });
};

(function animationLoop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    mob.tick();
    window.requestAnimationFrame(animationLoop);
})();

function getRandomColor() {
    let rgb = 'rgba(', i;
    for (i = 0; i < 3; i++) {
        rgb += Math.floor(Math.random() * 255) + ', ';
    }
    return rgb + '0.5)';
}