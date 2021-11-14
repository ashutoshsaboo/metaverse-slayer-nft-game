import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router, Route } from "react-router-dom";

// export const history = createBrowserHistory({
//   basename: process.env.PUBLIC_URL
// });

ReactDOM.render(
  <React.StrictMode>
    <Router basename={process.env.PUBLIC_URL}>
      <Route path={`/`} component={App} />
      {/* <App /> */}
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
