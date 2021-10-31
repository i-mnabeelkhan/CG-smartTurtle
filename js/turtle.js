// import * as THREE from "./three.js";
class Turtle {
  constructor(CP, CD) {
    //CURRENT POINT
    this.CP = CP;
    //CURRENT ANGLE
    this.CD = CD;
    //TURTLE STATE
    this.state = { CP: this.CP, CD: this.CD, stepWidth: (this.stepWidth = 1) };
    //TURTLE MEMORY
    this.memory = [];
    // this.memory.push(this.state);
    //CURRENT PATHS
    this.path = new THREE.Path();
    this.path.moveTo(this.CP.x, this.CP.y);
    this.points = this.path.getPoints();
    this.geometry = new THREE.BufferGeometry().setFromPoints(this.points);
    this.material = new THREE.LineBasicMaterial({ color: 0xffffff });
    this.line = new THREE.Line(this.geometry, this.material);
    console.log(this);
  }
  //SET STATE
  setCurrentState(state) {
    this.state = { CP: state.CP, CD: state.CD, stepWidth: state.stepWidth };
    this.CP = this.state.CP;
    this.CD = this.state.CD;
  }
  //UPDATE STATE
  updateState() {
    this.state = { CP: this.CP, CD: this.CD, stepWidth: (this.stepWidth = 1) };
    this.CP = this.state.CP;
    this.CD = this.state.CD;
  }
  //SAVE TURTLE
  saveTurtle() {
    this.memory.push(this.state);
    this.updateState();
    console.log("SSSS ", this.state);
  }
  //RESTORE TURTLE
  restoreTurtle() {
    let lastState = this.memory.pop();
    this.setCurrentState(lastState);

    // this.path.moveTo(2, 0);
    // this.path.currentPoint= {x: 0, y: 0};
    console.log("LLL", lastState);
    console.log("CCC", this.state);
    console.log(this.path.moveTo(lastState.CP.x, lastState.CP.y));
  }
  //TURNING TO A SPECIFIC ANGLE
  turnTo(angle) {
    this.CD = angle;
    this.updateState();
  }

  //MOVING TO A SPECIFIC ANGLE WRT CURRENT ANGLE
  turn(angle) {
    this.CD += angle;
    this.updateState();

    // console.log(angle);
  }

  //TURN RIGHT
  turnRight(angle) {
    this.CD -= angle;
    this.updateState();
  }

  //TURN LEFT
  turnLeft(angle) {
    this.CD += angle;
    this.updateState();
  }

  //MOVING FORWARD TO A DISTANCE
  moveForward(dist, isVisible) {
    let radPerDeg = 0.017453393;
    let x = this.CP.x + dist * Math.cos(radPerDeg * this.CD);
    let y = this.CP.y + dist * Math.sin(radPerDeg * this.CD);
    if (isVisible) this.path.lineTo(x, y);
    else this.path.moveTo(x, y);
    this.CP = new THREE.Vector2(x, y);
    this.updateState();
    // console.log(this.CP);
  }
  //MOVING FORWARD TO A DISTANCE
  moveForwardFromAPoint(CP, dist, isVisible) {
    //moving back to the point
    this.path.moveTo(CP.x, CP.y);
    let radPerDeg = 0.017453393;
    let x = this.CP.x + dist * Math.cos(radPerDeg * this.CD);
    let y = this.CP.y + dist * Math.sin(radPerDeg * this.CD);
    if (isVisible) this.path.lineTo(x, y);
    else this.path.moveTo(x, y);
    this.CP = new THREE.Vector2(x, y);
    this.updateState();
    // console.log(this.CP);
  }

  //PRODUCE STRING ACCORDING TO GIVEN RULE SET AND ITERATION
  produceString(atom, ruleSet, iterations) {
    let atomPos = 0,
      rule,
      char;
    atom = atom.toUpperCase();
    atom = atom.split("");
    // console.log(atom);
    for (let i = 0; i < iterations; i++) {
      // console.log(i);
      for (atomPos = 0; atomPos < atom.length; ) {
        char = atom[atomPos];
        // console.log("char: ", char);
        if (char == "+" || char == "-") {
          atomPos++;
          continue;
        }
        rule = ruleSet[char].split("");
        // console.log("Rule: ", rule);
        atom.splice(atomPos, 1, ...rule);
        atomPos += rule.length;
        // console.log("Atom: ", atom);
      }
    }
    atom = atom.join("");
    // console.log("Final: ", atom);
    return atom;
  }

  //DRAWING THROUGH STRING
  drawString(str, angle) {
    // console.log("String: ", str);
    str = str.toUpperCase();
    for (let ch of str) {
      // console.log("Char: ", str[i], " CD: ", this.CD);
      if (ch == "+") {
        // this.turnRight(this.CD);
        this.turn(-angle);
      } else if (ch == "-") {
        // this.turnLeft(this.CD);
        this.turn(angle);
      } else if (ch == "[") {
        this.saveTurtle();
      } else if (ch == "]") {
        this.restoreTurtle();
      } else if (ch == "F") {
        this.moveForward(1, 1);
      }
    }
    return this.drawTurtle();
  }
  //DRAWING ALL THE MOVEMENTS
  drawTurtle() {
    //CURRENT PATHS
    this.path.moveTo(this.CP.x, this.CP.y);
    this.points = this.path.getPoints();
    this.geometry = this.geometry.setFromPoints(this.points);
    // this.material = new THREE.LineBasicMaterial({ color: 0xffffff });
    this.line = new THREE.Line(this.geometry, this.material);
    // return this.line;
    return this.line;
  }
}
