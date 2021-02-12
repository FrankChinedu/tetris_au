import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Router } from 'react-router-dom';
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';

import './index.css';
import App from './views/App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';


ReactGA.initialize("UA-189671562-1");

const history = createBrowserHistory();

history.listen(location => {
    ReactGA.set({ page: location.pathname }); // Update the user's current page
    ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

ReactDOM.render(
  <React.StrictMode>
      <Router history={history}>
        <BrowserRouter>
        <App />
        </BrowserRouter>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorkerRegistration.register();
reportWebVitals();
