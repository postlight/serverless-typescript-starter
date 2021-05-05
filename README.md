![logo](./logo.png)
[![Greenkeeper badge](https://badges.greenkeeper.io/postlight/serverless-typescript-starter.svg)](https://greenkeeper.io/)
[![CircleCI](https://circleci.com/gh/postlight/serverless-typescript-starter/tree/master.svg?style=svg)](https://circleci.com/gh/postlight/serverless-typescript-starter/tree/master)

[Postlight](https://postlight.com)'s Modern Serverless Starter Kit adds a light layer on top of the Serverless framework, giving you the latest in modern JavaScript (ES6 via Webpack, TypeScript if you want it, testing with Jest, linting with ESLint, and formatting with Prettier), the ease and power of Serverless, and a few handy helpers (like functions for handling warm functions and response helpers).

Once installed, you can create and deploy functions with the latest ES6 features in minutes, with linting and formatting baked in.

Read more about it in [this handy introduction](https://postlight.com/trackchanges/introducing-postlights-modern-serverless-starter-kit).

Note: Currently, this starter kit specifically targets AWS.

## Install

```bash
# If you don't already have the serverless cli installed, do that
yarn global add serverless

# Use the serverless cli to install this repo
serverless install --url https://github.com/postlight/serverless-typescript-starter --name <your-service-name>

# cd into project and set it up
cd <your-service-name>

# Install dependencies
yarn install
```

## Development

Creating and deploying a new function takes two steps, which you can see in action with this repo's default Hello World function (if you're already familiar with Serverless, you're probably familiar with these steps).

#### 1. Add your function to `serverless.yml`

In the functions section of [`./serverless.yml`](./serverless.yml), you have to add your new function like so:

```yaml
functions:
  hello:
    handler: src/hello.default
    events:
      - http:
          path: hello
          method: get
```

Ignoring the scheduling event, you can see here that we're setting up a function named `hello` with a handler at `src/hello.ts` (the `.default` piece is just indicating that the function to run will be the default export from that file). The `http` event says that this function will run when an http event is triggered (on AWS, this happens via API Gateway).

#### 2. Create your function

This starter kit's Hello World function (which you will of course get rid of) can be found at [`./src/hello.ts`](./src/hello.ts). There you can see a basic function that's intended to work in conjunction with API Gateway (i.e., it is web-accessible). Like most Serverless functions, the `hello` function is asynchronous and accepts an event & context. (This is all basic Serverless; if you've never used it, be sure to read through [their docs](https://serverless.com/framework/docs/).

---

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

### Test your functions with Jest

Jest is installed as the testrunner. To create a test, co-locate your test with the file it's testing
as `<filename>.test.ts` and then run/watch tests with:

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
    handler: src/hello.default
```

As you can see, the path to the file with the function has to explicitly say where the handler
file is. (If your function weren't the default export of that file, you'd do something like:
`src/hello.namedExport` instead.)

### Keep your lambda functions warm

Lambda functions will go "cold" if they haven't been invoked for a certain period of time (estimates vary, and AWS doesn't offer a clear answer). From the [Serverless blog](https://serverless.com/blog/keep-your-lambdas-warm/):

> Cold start happens when you execute an inactive (cold) function for the first time. It occurs while your cloud provider provisions your selected runtime container and then runs your function. This process, referred to as cold start, will increase your execution time considerably.

A frequently running function won't have this problem, but you can keep your function running hot by scheduling a regular ping to your lambda function. Here's what that looks like in your `serverless.yml`:

```yaml
custom:
  warmup:
    enabled: true
    events:
      - schedule: rate(5 minutes)
    prewarm: true
    concurrency: 2
```

The above config would keep all of your deployed lambda functions running warm. The `prewarm` flag will ensure your function is warmed immediately after deploys (so you don't have to wait five minutes for the first scheduled event). And by setting the `concurrency` to `2`, we're keeping two instances warm for each deployed function.

Under `custom.warmup`, you can set project-wide warmup behaviors. On the other hand, if you want to set function-specific behaviours, you should use the `warmup` key under the select functions. You can browse all the options [here](https://www.npmjs.com/package/serverless-plugin-warmup#configuration).

Your handler function can then handle this event like so:

```javascript
const myFunc = (event, context, callback) => {
  // Detect the keep-alive ping from CloudWatch and exit early. This keeps our
  // lambda function running hot.
  if (event.source === 'serverless-plugin-warmup') {
    // serverless-plugin-warmup is the source for Scheduled events
    return callback(null, 'pinged');
  }

  // ... the rest of your function
};

export default myFunc;
```

Copying and pasting the above can be tedious, so we've added a higher order function to wrap your run-warm functions. You still need to config the ping in your `serverless.yml` file; then your function should look like this:

```javascript
import runWarm from './utils';

const myFunc = (event, context, callback) => {
  // Your function logic
};

export default runWarm(myFunc);
```

### Pruning old versions of deployed functions

The Serverless framework doesn't purge previous versions of functions from AWS, so the number of previous versions can grow out of hand and eventually filling up your code storage. This starter kit includes [serverless-prune-plugin](https://github.com/claygregory/serverless-prune-plugin) which automatically prunes old versions from AWS. The config for this plugin can be found in `serverless.yml` file. The defaults are:

```yaml
custom:
  prune:
    automatic: true
    number: 5 # Number of versions to keep
```

The above config removes all but the last five stale versions automatically after each deployment.

Go [here](https://medium.com/fluidity/the-dark-side-of-aws-lambda-5c9f620b7dd2) for more on why pruning is useful.

## Environment Variables

If you have environment variables stored in a `.env` file, you can reference them inside your `serverless.yml` and inside your functions. Considering you have a `NAME` variable:

In a function:

```node
process.env.NAME
```

In `serverless.yml`:

```yaml
provider:
  name: ${env:NAME}
  runtime: nodejs12.x
```

You can check the documentation [here](https://www.npmjs.com/package/serverless-dotenv-plugin).

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

After you've deployed, the output of the deploy script will give you the API endpoint
for your deployed function(s), so you should be able to test the deployed API via that URL.

---

🔬 A Labs project from your friends at [Postlight](https://postlight.com). Happy coding!
