function processLSystem(iterations, atom, rules, maxDrawCount) {
    var drawCount;
    var specialCharactersRE = /[\+\-\&\^\\\/\|\[\]]/g;
    for(var i = 0; i < iterations; i++) {
        var buffer = "";
        for(var j = 0; j < atom.length; j++) {
            var currentChar = atom.charAt(j);
            if(!specialCharactersRE.test(currentChar) && rules[currentChar] != null) {
                buffer += rules[currentChar];
            } else {
                buffer += currentChar;
            }
        }
        atom = buffer;
        drawCount = (atom.match(/[FG]/g) || []).length;
        if (drawCount > maxDrawCount) {
            break;
        }
    }
    return atom;
}
var rules = [];
rules["F"] ="FF";
var command = "F-F", iterations = 1, maxVertexCount = 1000000;
var commandEx = processLSystem(iterations, command, rules, maxVertexCount);
console.log(commandEx);

// class Turtle {
//   constructor() {
//     this.memory = [];
//     this.saveBracket = true;
//     this.savePoint = false;
//   }
//   saveTurtle() {
//     if (this.saveBracket) {
//       this.memory.push("[");
//       this.saveBracket = false;
//     }
//     this.memory.push("P");
//   }
//   restoreTurtle() {
//     for (let i = this.memory.length -1; i >= 0  ; i--) {
//       if (this.memory[i] == "[") {
//         this.memory.pop();
//         if(i == 0) this.savePoint = false;
//         break;
//       }
//       let p = this.memory.pop();
//       console.log(p);
//     }
//     this.saveBracket = true;
//   }

//   //DRAWING THROUGH STRING
//   drawString(str) {
//     str = str.toUpperCase();
//     for (let ch of str) {
//       if (ch == "+") {
//         console.log(ch);
//       } else if (ch == "-") {
//         console.log(ch);
//       } else if (ch == "[") {
//         this.saveBracket = true;
//         this.savePoint = true;
//         this.saveTurtle();
//       } else if (ch == "]") {
//         this.restoreTurtle();
//       } else if (ch == "F") {
//         if (this.savePoint) this.memory.push("P");
//       }
//       console.log(this.memory);
//     }
//   }
// }
// var t = new Turtle();

// t.drawString(
//   "[F[[F]FF]]"
// );
