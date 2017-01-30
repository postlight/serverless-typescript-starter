## Install

```bash
git clone git@github.com:adampash/serverless-babel-starter.git project_name
cd project_name
rm -rf .git
git init && git add . && git commit -m "Initial commit"
yarn
```

## Run the hello function (with live reloading)

```bash
yarn watch:hello
```

## Deploy

Assuming you've already set up your default AWS credentials:

```bash
yarn deploy
```

`yarn deploy` will deploy to "dev" environment. You can deploy to `stage` or `production`
with:

```bash
yarn deploy:stage

# -- or --

yarn deploy:production
```

## FAQ

#### Why is it working locally but not working when I deploy?

There are obviously plenty of reasons this might be happening, but one common culprit
involves how webpack packages your dependencies. When you add a new dependency to your
project, you also need to add it to your [webpack config](webpack.config.js#L7) and to
your [`serverless.yml`](serverless.yml). For example, after adding lodash as a dependency:

```bash
yarn add lodash
```

...you should update `webpack.config.js` like so:

```javascript
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/handler.js',
  target: 'node',
  externals: [
    'loadash', // <============== added lodash as external
    'babel-runtime',
    nodeExternals(),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: __dirname,
      exclude: /node_modules/,
    }],
  },
};
```

...and you should update `serverless.yml` like so:

```yaml
provider:
  name: aws
  runtime: nodejs4.3
  # If you want to change to a different AWS profile
  # from ~/.aws/credentials, you can do so here
  profile: Default 

plugins:
  - serverless-webpack

custom:
  webpackIncludeModules:
    - 'babel-runtime'
    - 'lodash' # <====================== added lodash here
```


## Things to try...

If you want to render React:

```bash
yarn add react react-dom
yarn add babel-preset-react --dev
```

Then update .babelrc with:

```json
{
  "plugins": ["transform-runtime"],
  "presets": ["es2015", "stage-0", "react"]
}
```

Then, if you have a component like `Hello.js`:

```javascript
import React, { Component } from 'react';

class Hello extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { name } = this.props;
    return (
      <div className="Hello">
        { `Hello ${name}` }
      </div>
    );
  }
}

Hello.propTypes = {
  name: React.PropTypes.string.isRequired,
};

export default Hello;
```

Your `hello` function might look like:

```javascript
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Hello from './components/Hello';

const hello = (event, context, callback) => {
  const html = ReactDOMServer.renderToString(<Hello name="World" />);
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: html,
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

export default hello;
```
