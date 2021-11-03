const scene = new THREE.Scene();
//factory arguments (position_X, position_Y, position_Y, Length)
var fac = new factory(0, 5, 50, 100);

var plane = new THREE.GridHelper(100, 10);
scene.add(plane);

initialize();

animate();

//Declare or Initialize variables here..
var point, initAngle, ninjaTurtle, map, order;

//-------------------------------------------------------------------------------
//HERE ALL MAPS ARE DEFINED FOR DIFFERENT SHAPES, just paste the map in the init function
//-------------------------------------------------------------------------------

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
//Branch
map = {
  atom: "F",
  F: "FF-[-F+F+F]+[+F-F-F]",
  X: "",
  Y: "",
  angle: 20,
};
//ANOTHER BRANCH
map = {
  atom: "X",
  F: "FF",
  X: "F-[[X]+X]+F[+FX]-X",
  Y: "",
  angle: 22,
};

//==============================================================================
//====================== ENTRY POINT FOR YOUR SCENE ============================
//==============================================================================
function initialize() {
  point = new THREE.Vector2(0, 0);

  //INITiAL ANGEL FOR THE CURVE
  initAngle = 90;

  //Branch
  map = {
    atom: "F",
    F: "FF-[-F+F+F]+[+F-F-F]",
    X: "",
    Y: "",
    angle: 20,
  };

  //ITERATION COUNTER
  order = 5;

  //NINJA TURTLE
  ninjaTurtle = new Turtle(point, initAngle);

  //GETTING PRODUCED STRING
  var string = ninjaTurtle.produceString(map.atom, map, order);
  console.log(string);

  //RENDERING THE STRING
  scene.add(ninjaTurtle.drawString(string, map.angle));
}

function animate() {
  requestAnimationFrame(animate);

  fac.renderScene();
}
