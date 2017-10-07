## Install

```bash
git clone git@github.com:postlight/serverless-babel-starter.git project_name
cd project_name
rm -rf .git
git init && git add . && git commit -m "Initial commit"
yarn
```

## Development

You can develop and test your lambda functions locally in a few different ways.

### Live-reloading functions

To run the hello function with the event data defined in [`fixtures/event.json`](fixtures/event.json) (with live reloading), run:

```bash
yarn watch:hello
```

### API Gateway-like local dev server

To spin up a local dev server that will more closely match the API Gateway endpoint/experience:

```bash
yarn serve
```

### Test your functions

Jest is installed as the testrunner. To create a test, co-locate your test with the file it's testing
as `<filename>.test.js` and then run/watch tests with:

```bash
yarn test
```

### Adding new functions/files to Webpack

When you add a new function to your serverless config, you don't need to also add it as a new entry
for Webpack. The `serverless-webpack` plugin allows us to follow a simple convention in our `serverless.yml`
file which is uses to automatically resolve your function handlers to the appropriate file:


```yaml
functions:
  hello:
    handler: src/hello
```

As you can see, the path to the file with the function has to explicitly say where the handler
file is. (If your function weren't the default export of that file, you'd do something like:
`src/hello.namedExport` instead.)

### Keep your lambda functions warm

Lambda functions will go "cold" if they haven't been invoked for a certain period of time (estimates vary, and AWS doesn't offer a clear answer). From the [Serverless blog](https://serverless.com/blog/keep-your-lambdas-warm/):

> Cold start happens when you execute an inactive (cold) function for the first time. It occurs while your cloud provider provisions your selected runtime container and then runs your function. This process, referred to as cold start, will increase your execution time considerably.

A frequently running function won't have this problem, but you can keep your function running hot by scheduling a regular ping to your lambda function. Here's what that looks like in your `serverless.yml`:

```yaml
functions:
  myFunc:
    handler: src/myFunc
    timeout: 10
    memorySize: 256
    events:
      # ...other config happening up here and then...
      # Ping every 5 minutes to avoid cold starts
      - schedule:
          rate: rate(5 minutes)
          enabled: true
```

Your handler function can then handle this event like so:

```javascript
const myFunc = (event, context, callback) => {
  // Detect the keep-alive ping from CloudWatch and exit early. This keeps our
  // lambda function running hot.
  if (event.source === 'aws.events') { // aws.events is the source for Scheduled events
    return callback(null, 'pinged');
  }

  // ... the rest of your function
}

export default myFunc;

```

Copying and pasting the above can be tedious, so we've added a higher order function to wrap your run-warm functions. You still need to config the ping in your `serverless.yml` file; then your function should look like this:

```javascript
import runWarm from './utils'

const myFunc = (event, context, callback) => {
  // Your function logic
}

export default runWarm(myFunc);
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
