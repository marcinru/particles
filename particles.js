var canvas = document.querySelector('#playground');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');
var particles = [
    { x: 50, y: 50, r: 20, color: 'red' },
    { x: 150, y: 20, r: 10, color: 'green' },
    { x: 100, y: 150, r: 50, color: 'blue' }
];

for (var i = 0; i < particles.length; i++) {
    draw(particles[i]);
}

function draw(particle) {
    ctx.beginPath();
    ctx.fillStyle = particle.color;
    ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
    ctx.fill();
}
