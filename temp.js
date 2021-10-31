//DRAW PATH WITH ATOM
drawPath("F", {F:"F-F++F-F", X: "X+YF+", Y: "-FX-Y" }, 2);

function drawPath(atom, map, iterations) {
  var atomPos = 0,
    rule,
    char;
  atom = atom.toUpperCase();
  atom = atom.split("");
  console.log(atom);
  for (var i = 0; i < iterations; i++) {
    console.log(i);
    for (atomPos = 0; atomPos < atom.length; ) {
      char = atom[atomPos];
      console.log("char: ", char);

      if (char == "+" || char == "-") {
        atomPos++;
        continue;
      }
      rule = map[char].split("");
      console.log("Rule: ", rule);

      atom.splice(atomPos, 1, ...rule);
      atomPos += rule.length;
      console.log("Atom: ", atom);
    }
  }
  atom = atom.join("");
  console.log("Final: ", atom);
}
