var _ = require("lodash");

function solution() {
  var fs = require("fs");

  var lineByLineArray = fs
    .readFileSync("e_shiny_selfies.txt", "utf8")
    .toString()
    .match(/^.+$/gm);

  //console.log(lineByLineArray);

  var horizontals = [],
      verticals = [],
      lines_count = 0,
      slideshows = '',
      output = '';

  for (let i = 0; i < lineByLineArray.length; i++) {
    singleLineInArrayForm = lineByLineArray[i].toString().split(" ");

    if (singleLineInArrayForm[0] === "H") {
      let harr = [i-1, singleLineInArrayForm]
      horizontals.push(_.flatten(harr));
    }

    if (singleLineInArrayForm[0] === "V") {
      let varr = [i-1, singleLineInArrayForm]
      verticals.push(_.flatten(varr));
    }
  }
  let svert = _.shuffle(verticals)

  svert.forEach( function(val ,i){
    console.log(val)
    if(i % 2 == 1){
      console.log("odd:"+val[0])
      slideshows += val[0] + ' ' +svert[i-1][0] +'\n'
      lines_count += 1
    }else{
      console.log("even:"+val[0])
    }
  })

  _.shuffle(horizontals).forEach( function(val ,i){
    slideshows += val[0]+'\n'
    lines_count += 1
  })

  output = lines_count + '\n' + slideshows

  console.log('---RESULT---')
  console.log(output)

  fs.writeFile("out_example_e.txt", output, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
  });

  // console.log(horizontals);
  // console.log(verticals);
}
solution();
