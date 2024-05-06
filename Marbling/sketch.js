let drops = [];
let start;

function setup() {
  createCanvas(1200, 900);
  MoonWave();
}

function MoonWave() {
  r = 50;
  WaveHeight = 0.7 * height;

  BluePalette = [
    color(2, 8, 115),
    color(0, 102, 204),
    color(153, 255, 255),
    color(0, 0, 153),
    color(204, 229, 255),
    color(0, 51, 102),
    color(0, 204, 204),
    color(102, 102, 255),
    color(76, 0, 153),
  ];
  MoonPalette = [
    color(240, 230, 140),
    color(250, 235, 215),
    color(245, 245, 220),
    color(245, 222, 179),
    color(255, 250, 205),
    color(255, 228, 181),
    color(253, 245, 230),
    color(255, 255, 240),
    color(250, 240, 230),
    color(255, 250, 250),
  ];
  //Create Wave Part
  for (let i = 0; i <= width; i += r) {
    for (j = 0; j < WaveHeight; j += 30) {
      BlueColor = random(BluePalette);
      MoonColor = random(MoonPalette.concat(BluePalette));
      addInk(
        width - i,
        height - j,
        r,
        color(BlueColor) //random(0, 255), random(0, 255), random(0, 255))
      );
      //Create Moon Part
      addInk(100, 0, random(10,60), color(MoonColor)); //random(0, 255), random(0, 255), 0));//random(0, 255)));
    }
  }
}
function mousePressed() {
  start = createVector(mouseX, mouseY);
  //Optional on Click create a new drop of ink.
  /* addInk(
    mouseX ,
    mouseY ,
    30,
    color(random(0, 255), random(0, 255), random(0, 255))
  ); */
}

function mouseDragged() {
  //On click and drag create a tineor line dragged through the ink modifying it's shape.
  let end = createVector(mouseX, mouseY);
  end.sub(start);
  end.normalize();
  tineLine(end, mouseX, mouseY, 30, 16);
}

function tineLine(v, x, y, z, c) {
  for (let drop of drops) {
    drop.tineGeneral(v, x, y, z, c);
  }
}

function addInk(x, y, r, col) {
  let drop = new Drop(x, y, r, col);

  for (let other of drops) {
    other.marble(drop);
  }
  drops.push(drop);
}

function draw() {
  //Combing effect of tines based on the arror key pressed. Not fully functional.
  if (keyIsDown(RIGHT_ARROW)) {
    let step = 10;
    for (let j = 0; j < height; j += step) {
      let v = createVector(1, 0);
      tineLine(v, width / 2, j, 16, 3);
    }
  }
  if (keyIsDown(LEFT_ARROW)) {
    let step = 10;
    for (let j = 0; j < height; j += step) {
      let v = createVector(-1, 0);
      tineLine(v, width / 2, j, 16, 3);
    }
  }
  if (keyIsDown(DOWN_ARROW)) {
    let step = 10;
    for (let j = 0; j < height; j += step) {
      let v = createVector(0, 1);
      tineLine(v, j, width / 2, 16, 3);
    }
  }
  if (keyIsDown(UP_ARROW)) {
    let step = 10;
    for (let j = 0; j < height; j += step) {
      let v = createVector(0, -1);
      tineLine(v, j, width / 2, 16, 3);
    }
  }

  for (let drop of drops) {
    drop.show();
  }
}
