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
