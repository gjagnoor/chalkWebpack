const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

let colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
      '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
      
const getAllFiles = function(dirPath, arrayOfFiles) {
  let files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file))
    }
  })
  return arrayOfFiles
}

class chalkWebpack {
  apply(compiler) {
      compiler.hooks.thisCompilation.tap("chalkWebpack", compilation => {
        let directoryPath = path.resolve(`${__dirname}/src/`);
        let files = getAllFiles(directoryPath);
        files.forEach((filePath) => {
          fs.readFile(filePath, "utf8", (err, data) => {
            if (data) {
              const rgx = /console.log\(['|"](.*?)['|"]\)/g;
              let strarr = data.match(rgx);
              let strarr_ = strarr ? strarr.map((str) => str.split('"')[1]) : null;
              let newdata = data;
              if (strarr && strarr_ && strarr.length) {
                for (var i = 0; i < strarr.length; i++) {
                  if (strarr_[i].split("%c").length > 1) {
                    continue;
                  } else {
                    newdata = newdata.replace(`${strarr[i]}`, `console.log("%c ${strarr_[i]}", 'color: ${colors[Math.floor(Math.random() * colors.length)]};')`);
                    console.log(chalk.blue("logs are now colorful!"))
                    if (err) console.log(err);
                    fs.writeFile(filePath, newdata, function (err) {
                      if (err) {
                        return console.log(err)
                      } 
                    });
                  }
                }
              }
            }
          })
        })
      })
    }
}

module.exports = chalkWebpack;