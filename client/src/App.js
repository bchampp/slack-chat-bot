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
      <div className='banner-container'>
        <img className='slack-img' src='/images/slack.png' alt='slack'></img>
        <img className='slack-img' src='/images/chat.png' alt='chat'></img>

        <h1>Slack Chat Bot</h1>
      </div>
      <div className='about-container'>
        <h2 className='about-heading'>
          Real time communication with customers
        </h2>
        <p className='about-text'>
          Interact with potential leads or current customers from your website through slack. 
          This plugin will redirect chat messages from your website to your slack workspace, 
          reducing the complexity in communicating with clients.  
        </p>
        <h2 className='about-heading'>
          Free
        </h2>
        <p className='about-text'>
          This plugin is hosted through AWS Serverless, which means that you are only charged on a per use basis.
          Rather than having a dedicated server, AWS will invoke the server functions only when the endpoints are called.
          Since the AWS free usage tier allows 1 million free requests per month, this plugin will most likely be free of use. 
          If your application requires more than this, it scales at $0.20c per additional 1M requests.
        </p>
        <h2 className='about-heading'>
          Customizable
        </h2>
        <p className='about-text'>
          Since we've open sourced the API for people to deploy their own plugins, any developer would be able to add additional 
          functionality to the plugin. Basically, anyone with experience in JavaScript/TypeScript will easily be able to develop on top of
          this base product. However, the base product is likely enough for most applications.
        </p>
        <h2 className='about-heading'>
          Getting Started
        </h2>
        <p className='about-text'>
          Instructions for getting started with the plugin can be found in the <a href='https://github.com/bchampp/slack-chat-bot/README.md'>README.</a>
        </p>
      </div>
      <Widget
        title="Slack Integration Chat"
        subtitle="Demo"
        handleNewUserMessage={handleNewUserMessage}
      />
    </div>
  );
}

export default App;
