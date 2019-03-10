var _ = require("lodash");

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


  _.shuffle(horizontals).forEach( function(val ,i){
    slideshows += val[0]+'\n'
    lines_count += 1
  })

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

  // var verticals_slides = []
  // var v_used = []
  // verticals.forEach( function(val ,i){
  //   let tags = val.slice(3, val.length)
  //   for (y= i + 1; y < verticals.length; y++){
  //     let ytags = verticals[y].slice(3, verticals[y].length)
  //     let common = _.intersection(tags, ytags);
  //     if(common.length > 0 && !_.includes(v_used, y)){
  //       v_used.push(y)
  //       verticals_slides.push([val,verticals[y]])
  //     }
  //   }
  // })

  // console.log(verticals.length, verticals_slides.length)

  output = lines_count + '\n' + slideshows

  // console.log('---RESULT---')
  // console.log(output)

  fs.writeFile("out_example_c.txt", output, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
  });

  // console.log(horizontals);
  // console.log(verticals);
}
solution();
