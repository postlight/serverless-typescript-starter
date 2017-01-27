import React from 'react'

const HTML = ({ children, state }) => {
  return (
      <html>
        <head>
        </head>
        <body>
          <div id="app" data-reactroot>
            { children }
          </div>
          <script type="text/javascript" dangerouslySetInnerHTML={{__html: 'window.APP_STATE = ' + JSON.stringify(state) }}></script>
          <script type="text/javascript" src={ process.env.NODE_ENV === 'dev' ? 'http://localhost:8080/assets/app.js' : '/dev/assets/app.js' }></script>
        </body>
      </html>
  )
}

export default HTML
