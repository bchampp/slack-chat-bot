import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Amplify } from 'aws-amplify';

Amplify.configure({
  API: {
    endpoints: [
      {
        name: "chat-bot",
        endpoint: 'https://dysdm9f1ne.execute-api.ca-central-1.amazonaws.com/dev',
        region: 'ca-central-1',
      },
    ]
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);