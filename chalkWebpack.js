const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

let CSS_COLOR_NAMES = [
    "AliceBlue",
    "AntiqueWhite",
    "Aqua",
    "Aquamarine",
    "Azure",
    "Beige",
    "Bisque",
    "Black",
    "BlanchedAlmond",
    "Blue",
    "BlueViolet",
    "Brown",
    "BurlyWood",
    "CadetBlue",
    "Chartreuse",
    "Chocolate",
    "Coral",
    "CornflowerBlue",
    "Cornsilk",
    "Crimson",
    "Cyan",
    "DarkBlue",
    "DarkCyan",
    "DarkGoldenRod",
    "DarkGray",
    "DarkGrey",
    "DarkGreen",
    "DarkKhaki",
    "DarkMagenta",
    "DarkOliveGreen",
    "DarkOrange",
    "DarkOrchid",
    "DarkRed",
    "DarkSalmon",
    "DarkSeaGreen",
    "DarkSlateBlue",
    "DarkSlateGray",
    "DarkSlateGrey",
    "DarkTurquoise",
    "DarkViolet",
    "DeepPink",
    "DeepSkyBlue",
    "DimGray",
    "DimGrey",
    "DodgerBlue",
    "FireBrick",
    "FloralWhite",
    "ForestGreen",
    "Fuchsia",
    "Gainsboro",
    "GhostWhite",
    "Gold",
    "GoldenRod",
    "Gray",
    "Grey",
    "Green",
    "GreenYellow",
    "HoneyDew",
    "HotPink",
    "IndianRed",
    "Indigo",
    "Ivory",
    "Khaki",
    "Lavender",
    "LavenderBlush",
    "LawnGreen",
    "LemonChiffon",
    "LightBlue",
    "LightCoral",
    "LightCyan",
    "LightGoldenRodYellow",
    "LightGray",
    "LightGrey",
    "LightGreen",
    "LightPink",
    "LightSalmon",
    "LightSeaGreen",
    "LightSkyBlue",
    "LightSlateGray",
    "LightSlateGrey",
    "LightSteelBlue",
    "LightYellow",
    "Lime",
    "LimeGreen",
    "Linen",
    "Magenta",
    "Maroon",
    "MediumAquaMarine",
    "MediumBlue",
    "MediumOrchid",
    "MediumPurple",
    "MediumSeaGreen",
    "MediumSlateBlue",
    "MediumSpringGreen",
    "MediumTurquoise",
    "MediumVioletRed",
    "MidnightBlue",
    "MintCream",
    "MistyRose",
    "Moccasin",
    "NavajoWhite",
    "Navy",
    "OldLace",
    "Olive",
    "OliveDrab",
    "Orange",
    "OrangeRed",
    "Orchid",
    "PaleGoldenRod",
    "PaleGreen",
    "PaleTurquoise",
    "PaleVioletRed",
    "PapayaWhip",
    "PeachPuff",
    "Peru",
    "Pink",
    "Plum",
    "PowderBlue",
    "Purple",
    "RebeccaPurple",
    "Red",
    "RosyBrown",
    "RoyalBlue",
    "SaddleBrown",
    "Salmon",
    "SandyBrown",
    "SeaGreen",
    "SeaShell",
    "Sienna",
    "Silver",
    "SkyBlue",
    "SlateBlue",
    "SlateGray",
    "SlateGrey",
    "Snow",
    "SpringGreen",
    "SteelBlue",
    "Tan",
    "Teal",
    "Thistle",
    "Tomato",
    "Turquoise",
    "Violet",
    "Wheat",
    "White",
    "WhiteSmoke",
    "Yellow",
    "YellowGreen",
];

// eslint-disable-next-line no-unused-vars
CSS_COLOR_NAMES = CSS_COLOR_NAMES.map((color) => color.toLowerCase());

module.exports = class chalkwebpack {
    apply(compiler) {
        compiler.hooks.afterEmit.tap("chalkwebpack", stats => {
        // const { path, filename } = stats.compilation.options.output;
        try {
            // let filePath = path + "/" + filename;
            let directoryPath = path.resolve(`${__dirname}/build/static/js/`);
            let files = getAllFiles(directoryPath);
            files.forEach((filePath) => {
                fs.readFile(filePath, "utf8", (err, data) => {
                    if (data) {
                        const rgx = /console.log\(['|"](.*?)['|"]\)/g;
                        let arr = ['console.log(', ', ', ')', ","]
                        let strarr = data.match(rgx);
                        let strarr_ = strarr ? strarr.map((str) => [str.slice().split('"').filter((ele, i) => !arr.includes(ele) && i !== str.slice().split('"').length-2 ), str.split('"')[str.split('"').length-2] || null]) : null;
                        let newdata = data;
                        if (strarr && strarr_ && strarr.length) {
                            for (var i = 0; i < strarr.length; i++) {
                            newdata = newdata.replace(`${strarr[i]}`, `console.log("%c ${strarr_[i][0]}", 'color: ${CSS_COLOR_NAMES.includes(strarr_[i][1]) || (/^#[0-9A-F]{6}$/i.test(strarr_[i][1])) ? strarr_[i][1] : "lightblue" || "lightblue"};')`);
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
                });
            })
        } catch (error) {
            console.log(error)
        }
        });
    }
};
      
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