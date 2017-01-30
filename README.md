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

Assuming you've already set up your default AWS credentials (or have set a different AWS profile via [the profile field](serverless.yml#L25)):

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

After you've deployed, the output of the deploy script will give you the API endpoint for your deployed function(s),
so you should be able to test the deployed API via that URL.

## Ideas in progress

### Universal React

See [this PR](https://github.com/postlight/serverless-babel-starter/pull/1) to see an example of
universal rendering w/React.

The PR is much more fleshed out, but for very basic React setup:

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
