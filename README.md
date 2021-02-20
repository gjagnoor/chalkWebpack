`chalk-webpack` is a `Chalk` clone but specifically for the frontend. It's a plugin for webpack that allows your console.logs to appear colorful in the browser - resulting in an improved developer experience. If you are looking for your logs to standout in a large abyss of logs, this package will help get you there!

# Install

```
npm i chalk-webpack --save-dev
```

# Usage 

Add the plugin to your `webpack.config.js` file: 

```
const chalkWebpack = require("chalk-webpack");


module.exports = {
    ...,
    plugins: [
        new chalkWebpack(),
    ]
}
```

run your app!

<center> << Made with ♥ by Noor Grewal >>  </center>
