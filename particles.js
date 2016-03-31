var canvas = document.querySelector('.particles');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');

var particles = [
    { x: 50, y: 50, r: 20, color: 'red' },
    { x: 150, y: 20, r: 10, color: 'green' },
    { x: 100, y: 150, r: 50, color: 'blue' }
];

particles.forEach(function (particle) {
    draw(particle);
});

function draw(particle) {
    ctx.beginPath();
    ctx.fillStyle = particle.color;
    ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
    ctx.fill();
}
