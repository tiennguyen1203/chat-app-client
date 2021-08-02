import { AmplifySignOut } from '@aws-amplify/ui-react';
import Amplify from 'aws-amplify';
import React from 'react';
import ReactDOM from 'react-dom';
import { awsconfig } from './aws-config';
import Chat from './chat/Chat';
import './index.css';
import * as serviceWorker from './serviceWorker';
Amplify.configure(awsconfig);

ReactDOM.render(
  <React.StrictMode>
    <AmplifySignOut />
    <Chat />
    {/* <App /> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
