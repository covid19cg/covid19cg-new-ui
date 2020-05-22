import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/stable';
// import 'react-app-polyfill/ie11'; // For IE 11 support
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import ReactGA from 'react-ga';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const trackingId = 'UA-164643845-1';
ReactGA.initialize(trackingId);

Sentry.init({dsn: "https://8144d2b391c74029a1b58ea3dd1bb10b@o231550.ingest.sentry.io/5233531"});
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

if (process.env.NODE_ENV === 'production') {
  serviceWorker.register();
} else {
  serviceWorker.unregister();
}
