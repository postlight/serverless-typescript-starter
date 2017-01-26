import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../components/App';
import HTML from '../components/Index';

const hello = (event, context, callback) => {
  const data = { name: "World" };
  const html =
    ReactDOMServer.renderToStaticMarkup(
      <HTML state={ data } >
        <App data={ data } />
      </HTML>
    );
  const response = {
    statusCode: 200,
    body: html,
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

export default hello;
