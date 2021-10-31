const scene = new THREE.Scene();
//factory arguments (position_X, position_Y, position_Y, Length)
var fac = new factory(0, 5, 50, 100);

var plane = new THREE.GridHelper(100, 10);
scene.add(plane);

initialize();

animate();

//Declare or Initialize variables here..
var point, initAngle, t, map, order;
//Koch Curve
map = {
  atom: "F",
  F: "F-F++F-F",
  X: "",
  Y: "",
  angle: 60,
};
//Quadratic Koch Island
map = {
  atom: "F+F+F+F",
  F: "F+F-F-FF+F+F-F",
  X: "",
  Y: "",
  angle: 90,
};
//Hilberd Curve
map = {
  atom: "X",
  F: "F",
  X: "-YF+XFX+FY-",
  Y: "+XF-YFY-FX+",
  angle: 90,
};
//Dragon Curve
map = {
  atom: "X",
  F: "F",
  X: "X+YF+",
  Y: "-FX-Y",
  angle: 90,
};
//Gosper Hexagonal Curve
map = {
  atom: "XF",
  F: "F",
  X: "X+YF++YF-FX--FXFX-YF+",
  Y: "-FX+YFYF++YF+FX--FX-Y",
  angle: 60,
};
//Sierpinski Gasket
map = {
  atom: "FXF--FF--FF",
  F: "FF",
  X: "--FXF++FXF++FXF--",
  Y: "",
  angle: 60,
};
//Sierpinski Arrow Head
map = {
  atom: "YF",
  F: "F",
  X: "YF+XF+Y",
  Y: "XF-YF-X",
  angle: 60,
};
//OriginalPeano
map = {
  atom: "X",
  F: "F",
  X: "XFYFX+F+YFXFY-F-XFYFX",
  Y: "YFXFY-F-XFYFX+F+YFXFY",
  angle: 90,
};

//Code your logic here..
function initialize() {
  point = new THREE.Vector2(0, 0);
  initAngle = 0;
  //Branch
  map = {
    atom: "F",
    F: "FF-[-F+F+F]+[+F-F-F]",
    // F: "FF[+F]-F",
    X: "",
    Y: "",
    angle: 22,
  };
  order = 1;
  t = new Turtle(point, initAngle);
  var text = t.produceString(map.atom, map, order);
  scene.add(t.drawString(text, map.angle));
}

function animate() {
  requestAnimationFrame(animate);

  fac.renderScene();
}
