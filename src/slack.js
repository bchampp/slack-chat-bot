/* Slack Support Bot Implementation */

import { WebClient, LogLevel } from '@slack/web-api'
require('dotenv').config()

// Configure client
const client = new WebClient({
  token: process.env.SLACK_OAUTH_TOKEN,
  logLevel: LogLevel.DEBUG
});

async function publishMessage(id, text) {
  try {
    // Call the chat.postMessage method using the built-in WebClient
    const result = await client.chat.postMessage({
      token: process.env.SLACK_OAUTH_TOKEN,
      channel: id,

      text: text
      // You could also use a blocks[] array to send richer content
    });

    // Print result, which includes information about the message (like TS)
    console.log(result);
  }
  catch (error) {
    console.error(error);
  }
}

publishMessage("general", "test test test test test test" );