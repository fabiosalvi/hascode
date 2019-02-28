function solution() {
  var fs = require("fs");

  var lineByLineArray = fs
    .readFileSync("a_example.txt", "utf8")
    .toString()
    .match(/^.+$/gm);

  //console.log(lineByLineArray);

  var horizontals = [],
      verticals = [],
      slideshows = '',
      output = '';

  for (let i = 0; i < lineByLineArray.length; i++) {
    singleLineInArrayForm = lineByLineArray[i].toString().split(" ");

    if (singleLineInArrayForm[0] === "H") {
      horizontals.push(lineByLineArray[i]);
      //console.log(horizontals);
      slideshows += i-1+'\n'
    }

    if (singleLineInArrayForm[0] === "V") {
      verticals.push(lineByLineArray[i]);
    }
  }

  verticals.forEach( function(val ,i){
    console.log(val)
  })

  output = slideshows

  console.log('slides')
  console.log(slideshows)




  fs.writeFile("out_example.txt", output, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
  });

  console.log(horizontals);
  console.log(verticals);
}
solution();
