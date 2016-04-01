var canvas = document.querySelector('.particles');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');

var ParticleMob = function(){
    this._particles = [];
    for (var i = 0; i < 50; i++) {
        this._particles.push(new Particle());
    }
};

ParticleMob.prototype.tick = function() {
    this._particles.forEach(function(particle) {
        particle.draw();
        particle.tick();
    });
};

var Particle = function() {
    this.init();
};

function randomColour(){
    return Math.floor(Math.random() * 255)+',';
}

Particle.prototype.init = function() {
    this._color = 'rgba('+randomColour()+randomColour()+randomColour() +  '0.5)';
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

var mob = new ParticleMob();

(function animation(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    mob.tick();
    window.requestAnimationFrame(animation);
})();