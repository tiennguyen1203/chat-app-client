// import Amplify from 'aws-amplify';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import { awsconfig } from './aws-config';
import * as serviceWorker from './serviceWorker';
import './index.css';

// import LocalServiceWorkerRegister from './sw-register';
// LocalServiceWorkerRegister();

// Amplify.configure(awsconfig);
ReactDOM.render(
  <React.StrictMode>
    {/* <AmplifySignOut />
    <Chat /> */}
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
// serviceWorker.register({
//   onUpdate
// })
serviceWorker.register();
