import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from '../../components/App';
import HTML from '../../components/Index';

import downcaseKeys from './downcase-keys';

// Accept header defaults for:
//              most browsers    Internet Explorer
const HTML_RE = /(text\/html)|(application\/xaml\+xml)/i

const renderHtmlOrJson = ({ headers }, data) => {
  if (HTML_RE.test(downcaseKeys(headers).accept)) {
    return {
      body: ReactDOMServer.renderToStaticMarkup(
        <HTML state={ data } >
          <App data={ data } />
        </HTML>
      ),
      headers: {
        'content-type': 'text/html'
      }
    }
  }
  return { body: JSON.stringify(data) };
}

export default renderHtmlOrJson
