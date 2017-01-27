import renderHtmlOrJson from './utils/render-html-or-json';

const hello = (event, context, callback) => {
  const data = { name: "World" };
  const response = {
    statusCode: 200,
    ...renderHtmlOrJson(event, data),
  };

  callback(null, response);
};

export default hello;
