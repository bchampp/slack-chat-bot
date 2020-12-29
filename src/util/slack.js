/* Slack Support Bot Implementation */

import { WebClient, LogLevel } from '@slack/web-api';

// Configure client
const client = new WebClient({
  token: process.env.SLACK_OAUTH_TOKEN,
  logLevel: LogLevel.DEBUG
});

export async function publishMessage(id, data) {
  try {
    // Call the chat.postMessage method using the built-in WebClient
    const result = await client.chat.postMessage({
      token: process.env.SLACK_OAUTH_TOKEN,
      channel: id,
      attachments: [
        {
            color: "#F8E419",
            pretext: "Client Posted New Issue to JIRA",
            title: `JIRA Ticket [DIST-3357]`, //TODO: GET JIRA TICKET NUMBER
            title_link: "https://bugs.caseware.com/",
            text: data.summary,
            fields: [
                {
                    title: "Project",
                    value: data.project,
                    short: true
                },
                {
                    title: "Issue Type",
                    value: data.issueType,
                    short: true
                },
                {
                    title: "Affected Firm",
                    value: data.affectedFirm,
                    short: true
                },
                {
                  title: "Reported By",
                  value: `${data.firstName} ${data.lastName}`,
                  short: true
              }
            ],
            ts: Date.now()
        }
    ]
    });

    console.log(result);
  }
  catch (error) {
    console.error(error);
  }
}
