const circRes = 1000;

class Drop {
  constructor(x, y, r, col) {
    this.center = createVector(x, y);
    this.r = r;

    this.vertices = [];

    for (let i = 0; i < circRes; i++) {
      let angle = map(i, 0, circRes, 0, TWO_PI);
      let v = createVector(cos(angle), sin(angle));
      v.mult(this.r);
      v.add(this.center);
      this.vertices[i] = v;
    }
    this.col = col;
  }

  tineGeneral(m, x, y, z, c) {
    let u = 1 / pow(2, 1 / c);
    let b = createVector(x, y);
    for (let v of this.vertices) {
      let pb = p5.Vector.sub(v, b);
      let n = m.copy().rotate(HALF_PI);
      let d = abs(pb.dot(n));
      let mag = z * pow(u, d);
      v.add(m.copy().mult(mag));
    }
  }

  /* tineX(v, x, y, z, c) {
    let u = 1 / pow(2, 1 / c);
    for (let v of this.vertices) {
      v.x = v.x;
      v.y = v.y + z * pow(u, abs(v.x - x));
    }
  }

  tineY(v, x, y, z, c) {
    let u = 1 / pow(2, 1 / c);
    for (let v of this.vertices) {
      v.x = v.x + z * pow(u, abs(v.y - y));
      v.y = v.y;
    }
  } */

  marble(other) {
    for (let v of this.vertices) {
      let c = other.center;
      let r = other.r;
      let p = v.copy();
      p.sub(c);

      let m = p.magSq();
      let root = sqrt(1 + pow(r, 2) / m);
      p.mult(root);
      p.add(c);
      v.set(p);
    }
  }

  show() {
    fill(this.col);
    noStroke();
    beginShape();
    for (let v of this.vertices) {
      vertex(v.x, v.y);
    }
    endShape(CLOSE);
  }
}
