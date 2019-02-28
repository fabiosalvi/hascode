function solution() {
  var fs = require("fs");

  var lineByLineArray = fs
    .readFileSync("a_example.txt", "utf8")
    .toString()
    .match(/^.+$/gm);

  //console.log(lineByLineArray);

  var horizontals = [],
    verticals = [];
  for (let i = 0; i < lineByLineArray.length; i++) {
    singleLineInArrayForm = lineByLineArray[i].toString().split(" ");

    if (singleLineInArrayForm[0] === "H") {
      horizontals.push(lineByLineArray[i]);
      //console.log(horizontals);
    }

    if (singleLineInArrayForm[0] === "V") {
      verticals.push(lineByLineArray[i]);
    }
  }

  console.log(horizontals);
  console.log(verticals);
}
solution();
