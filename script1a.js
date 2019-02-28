var _ = require("lodash");

function maximizeVerticals(arrayVerticals) {
  var i, j;
  var score = 0;
  for (i = 0; i < arrayVerticals.length - 1; i++) {
    for (j = i + 1; j < arrayVerticals.length; j++) {
      console.log(arrayVerticals[j]);
    }
  }
}

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
      horizontals.push(
        []
          .concat(
            (i - 1)
              .toString()
              .concat(" ")
              .concat(lineByLineArray[i])
          )
          .toString()
      );
      //console.log(horizontals);
    }

    if (singleLineInArrayForm[0] === "V") {
      verticals.push(
        []
          .concat(
            (i - 1)
              .toString()
              .concat(" ")
              .concat(lineByLineArray[i])
          )
          .toString()
      );
    }
  }

  //console.log(horizontals);
  //console.log(verticals);

  var orderedVerticals = [];
  orderedVerticals = maximizeVerticals(verticals);

  //Disposizioni semplici di n elementi a k a k	D(n,k) = n(n-1)(n-2)...(n-k+1)
}
solution();
