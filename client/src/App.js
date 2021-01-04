import React, { useEffect } from 'react';
import { Widget, addUserMessage, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

const SERVERLESS_DOMAIN = '<Your deployment url here!>';

function App() {
  useEffect(() => {
    // Load the initial messages
    function getMessages() {
      // Call /get-messages endpoint to retrieve array of messages

      // TODO: Update this to call endpoint
      const messages = [
        {'reply': true, 'text': 'Welcome to the Slack Integration App!'},
        {'reply': false, 'text': 'Hello world!'}
      ];

      // Load initial chats
      for (const msg of messages) {
        if (msg.reply === true) {
          addResponseMessage(msg.text);
        } else {
          addUserMessage(msg.text)
        }
      }
    }
    getMessages();
  }, []);

  const handleNewUserMessage = (response) => {
    console.log(`New user message incoming! ${response}`);
    // Send the message to be redirected through slack!
    // POST /post-message 
    // TODO: Call endpoint here
  };

  return (
    <div className="App">
      <div>
        <h1>Welcome to Slack Chat Bot</h1>
      </div>
      <Widget
        title="Slack Integration Chat"
        subtitle=""
        handleNewUserMessage={handleNewUserMessage}
      />
    </div>
  );
}

export default App;
