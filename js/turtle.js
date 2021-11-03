// import * as THREE from "./three.js";
class Turtle {
  constructor(CP, CD) {
    //CURRENT POINT
    this.CP = CP;
    //CURRENT ANGLE
    this.CD = CD;
    //TURTLE STATE - CP, CD, STEP WIDTH
    this.state = { CP: this.CP, CD: this.CD, stepWidth: (this.stepWidth = 1) };
    //TURTLE MEMORY
    this.turtleStack = [];
    this.turtleStack.push(this.state);
    //BOOLEANS FOR TURTLE PATH
    //saving incoming bracket [
    this.saveBracket = true;
    //saving incoming point CP with CD
    this.savePoint = false;
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
    //if the current character is [ then push the current state to the stack with the current character i.e [
    if (this.saveBracket) {
      // console.log("Saving Bracket");
      this.turtleStack.push("[");
      this.saveBracket = false;
    }
    this.turtleStack.push(this.state);
  }

  //RESTORE TURTLE
  restoreTurtle() {
    //looping array in reverse order for back tracking
    for (let i = this.turtleStack.length - 1; i >= 0; i--) {
      //if the opening of the bracket is found then break
      if (this.turtleStack[i] == "[") {
        this.turtleStack.pop();
        if (i == 0) {
          //when reached the end of stack then do not save upcoming points
          this.savePoint = false;
        }
        break;
      }
      let lastState = this.turtleStack.pop();
      // console.log("This CP Before Line", this.CP);
      this.path.lineTo(lastState.CP.x, lastState.CP.y);
      this.setCurrentState(lastState);
      // console.log("Last CP ", lastState.CP.x, " ", lastState.CP.y + " ");
      // console.log("This CP After Line", this.CP);
    }
    this.saveBracket = true;
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

  //PRODUCE STRING ACCORDING TO GIVEN RULE SET AND ITERATION
  produceString(atom, ruleSet, iterations) {
    let atomPos = 0,
      rule,
      char;
    atom = atom.toUpperCase();
    atom = atom.split("");
    // console.log(atom);
    for (let i = 0; i < iterations; i++) {
      // console.log("Iteration: ", i);
      for (atomPos = 0; atomPos < atom.length; ) {
        char = atom[atomPos];
        // console.log("char: ", char);
        if (char == "+" || char == "-" || char == "[" || char == "]") {
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
        this.turnRight(angle);
      } else if (ch == "-") {
        this.turnLeft(angle);
      } else if (ch == "[") {
        this.saveBracket = true;
        this.savePoint = true;
        this.saveTurtle();
      } else if (ch == "]") {
        this.restoreTurtle();
      } else if (ch == "F") {
        if (this.savePoint) this.turtleStack.push(this.state);
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
    this.material = new THREE.LineBasicMaterial({ color: 0xffffff });
    this.line = new THREE.Line(this.geometry, this.material);
    return this.line;
  }
}
