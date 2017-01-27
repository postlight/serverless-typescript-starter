import React from 'react';
import ReactDOM from 'react-dom';

import App from '../components/App';

ReactDOM.render(<App data={ window.APP_STATE || {} } />, document.getElementById('app'))
