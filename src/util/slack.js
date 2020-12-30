/* Slack Support Bot Implementation */

import { WebClient, LogLevel } from '@slack/web-api';
import { getTicket } from './dynamo';

// Configure client
const client = new WebClient({
  token: process.env.SLACK_OAUTH_TOKEN,
  logLevel: LogLevel.DEBUG
});

// Publish initial ticket published message and return timestamp
export async function publishMessage(channel, data) {
  return client.chat.postMessage({
    token: process.env.SLACK_OAUTH_TOKEN,
    channel: channel,
    attachments: [
      {
        color: "#F8E419",
        pretext: "Client Posted New Issue to JIRA",
        title: `JIRA Ticket [${data.id}]`,
        title_link: `${ticket.link}`,
        text: data.summary,
        fields: [
          {
            title: "Project",
            value: ticket.project,
            short: true
          },
          {
            title: "Issue Type",
            value: ticket.issueType,
            short: true
          },
          {
            title: "Priority",
            value: ticket.priority,
            short: true
          },
          {
            title: "Affected Firm",
            value: ticket.affectedFirm,
            short: true
          },
          {
            title: "Reported By",
            value: `${ticket.firstName} ${ticket.lastName}`,
            short: true
          }
        ],
        ts: Date.now()
      }
    ]
  }).then((message) => {
    return message.ts;
  });
}

export async function findConversation(name) {
  try {
    // Call the conversations.list method using the built-in WebClient
    const result = await client.conversations.list({
      // The token you used to initialize your app
      token: process.env.SLACK_OAUTH_TOKEN
    });

    for (const channel of result.channels) {
      if (channel.name === name) {
        let conversationId = channel.id;

        // Print result
        console.log("Found conversation ID: " + conversationId);
        // Store conversation history
        let conversationHistory;
        // ID of channel you watch to fetch the history for
        let channelId = conversationId;

        try {
          // Call the conversations.history method using WebClient
          const result = await client.conversations.history({
            token: process.env.SLACK_OAUTH_TOKEN,
            channel: channelId
          });

          conversationHistory = result.messages;

          // Print results
          console.log(conversationHistory);
        }
        catch (error) {
          console.error(error);
        }
        // Break from for loop
        break;
      }
    }
  }
  catch (error) {
    console.error(error);
  }
}

// Find conversation with a specified channel `name`
findConversation("tester-channel");
