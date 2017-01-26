import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from '../../components/App';
import HTML from '../../components/Index';

// Accept header defaults for:
//              most browsers    Internet Explorer
const HTML_RE = /(text\/html)|(application\/xaml\+xml)/i

const renderHtmlOrJson = ({ headers }, data) => {
  console.log(headers.accept)
  if (HTML_RE.test(headers.accept)) {
    return ReactDOMServer.renderToStaticMarkup(
      <HTML state={ data } >
        <App data={ data } />
      </HTML>
    );
  }
  return data;
}
 
export default renderHtmlOrJson
