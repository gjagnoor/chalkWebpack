`chalk-webpack` is a `Chalk` clone but specifically for the frontend. It's a plugin for webpack that allows your console.logs to appear colorful in the browser - resulting in an improved developer experience. If you are looking for your logs to standout in an abyss of logs, this package will help get you there!

# Install

```javascript
npm i chalk-webpack --save-dev
```

```javascript
npm i npm-watch react-app-rewired --save-dev
```

```javascript
npm install serve -g 
```

# Setup 

Create a `config-overrides.js` file in the root directory, and add the following code to it:

```javascript
const chalkWebpack = require("chalk-webpack");
module.exports = {
  webpack: function(config, env) {
        ...
        config.plugins.push(new chalkWebpack());
        ...
        return config;
  },
  ...
}
```

In `package.json` of your root directory, make the following changes:

```javascript
  /* package.json */
...
"scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test",
+   "test": "react-app-rewired test",
    "eject": "react-scripts eject",
+   "watch": "npm-watch"
},
"watch": {
    "build": "src/"
},
...
```

in a terminal window run:
```
npm run watch
```

in a separate terminal window, run:
```
serve -s build
```

visit `localhost:5000`

# Usage

You can add as many strings as you want to your console.logs, but please make sure the custom color that you pass in is the **last string in your log** and that all your strings inside console.logs use double quotes `""` or template literals.

For example, 

Inside your `App.js` file or any `.js` file in `src/` folder, add the following `console.log()` statements. There are three ways you can write your logs:

First Case. You can use any valid hex code:

```
console.log("hello from chalk-webpack", "#006666");
```

Second Case. You can add any html color name of your choice: 
```
console.log("hello again from chalk-webpack", "teal");
```

Third case. You can omit colors from your logs. In this case, all logs will default to `lightblue` color in the browser

```
console.log("I am a log without a custom color");
```

<center> << Made with ♥ by Noor Grewal >>  </center>
