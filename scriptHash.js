var _ = require("lodash");

function permutations(xs) {
  let ret = [];

  for (let i = 0; i < xs.length; i = i + 1) {
    let rest = permutations(xs.slice(0, i).concat(xs.slice(i + 1)));

    if (!rest.length) {
      ret.push([xs[i]]);
    } else {
      for (let j = 0; j < rest.length; j = j + 1) {
        ret.push([xs[i]].concat(rest[j]));
      }
    }
  }
  return ret;
}

function calculateScore(verticals) {
  //var score = 0;
  //makes a deep copy of array
  if (verticals.length % 2 !== 0) {
    newVerticals = verticals.slice(-1);
  } else {
    newVerticals = verticals.slice(0);
  }
  //console.log(newVerticals);

  for (var i = 0; i < newVerticals.length - 1; i = i + 2) {
    set1 = _.words(newVerticals[i]).splice(3);
    set2 = _.words(newVerticals[i + 1]).splice(3);
    //console.log(set1);
    var left = _.difference(set1, set2);
    var right = _.difference(set2, set1);
    var howManyLeft = left.length;
    var howManyRight = right.length;
    var howManyEquals =
      (set1.length + set2.length - howManyLeft - howManyRight) / 2;
    var min;
    if (howManyLeft < howManyRight) {
      min = howManyLeft;
    } else {
      min = howManyRight;
    }

    if (min < howManyEquals) {
      //do nothing
    } else {
      min = howManyEquals;
    }

    return min;
  }
}

function maximizeVerticals(arrayVerticals) {
  var i, j;
  var score = 0;
  index = 0;
  var perm = [];
  for (var i = 0; i <= 100000; i++) {
    perm[i] = _.shuffle(arrayVerticals);
  }
  //perm = permutations(arrayVerticals);

  score = calculateScore(perm[0]);
  index = 0;
  for (i = 1; i < perm.length; i++) {
    if (calculateScore(perm[i]) < score) {
      score = calculateScore(perm[i]);
      index = i;
    }
  }

  return perm[index];
}

function solution() {
  var fs = require("fs");

  var lineByLineArray = fs
    .readFileSync("c_memorable_moments.txt", "utf8")
    .toString()
    .match(/^.+$/gm);

  //console.log(lineByLineArray);

  var horizontals = [],
    verticals = [],
    lines_count = 0,
    slideshows = "",
    output = "";

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

  var orderedVerticals = [];
  orderedVerticals = maximizeVerticals(verticals);

  var orderedOrizontals = [];
  orderedOrizontals = maximizeVerticals(horizontals);

  // _.shuffle(horizontals).forEach(function(val, i) {
  //   slideshows += val.split(" ")[0] + "\n";
  //   lines_count += 1;
  // });

  orderedOrizontals.forEach(function(val, i) {
    slideshows += val.split(" ")[0] + "\n";
    lines_count += 1;
  });

  orderedVerticals.forEach(function(val, i) {
    console.log(val);
    if (i % 2 == 1) {
      //console.log("odd:"+val[0])
      slideshows +=
        val.split(" ")[0] + " " + orderedVerticals[i - 1].split(" ")[0] + "\n";
      lines_count += 1;
    } else {
      //console.log("even:"+val[0])
    }
  });

  //console.log(orderedVerticals);

  // WRITE ON FILE
  output = lines_count + "\n" + slideshows;

  console.log("---RESULT---");
  //console.log(output);

  fs.writeFile("out_example_c.txt", output, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
}
solution();
