class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  logPosition() {
    console.log(this.x, this.y);
  }
}
let myPoint = new Point(5, 10);
myPoint.logPosition();
