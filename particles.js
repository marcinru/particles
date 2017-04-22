const canvas = document.querySelector('#particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var Particle = function() {
    this.init();
};

Particle.prototype.init = function() {
    this._color = getRandomColor();
    this._x = Math.random() * canvas.width;
    this._y = Math.random() * canvas.height;
    this._radius = 50 + Math.random() * 50;
};

Particle.prototype.draw = function() {
    ctx.fillStyle = this._color;
    ctx.beginPath();
    ctx.arc(this._x, this._y, this._radius, 0, Math.PI * 2);
    ctx.fill();
};

Particle.prototype.tick = function() {
    if (this._radius < 2) {
        this.init();
    }
    this._radius -= Math.random();
};

var ParticleMob = function(){
    this._particles = [];
    for (var i = 0; i < 50; i++) {
        this._particles.push(new Particle());
    }
};

var mob = new ParticleMob();

ParticleMob.prototype.tick = function() {
    this._particles.forEach(function(particle) {
        particle.draw();
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