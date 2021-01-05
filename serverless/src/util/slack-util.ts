/* Slack Support Bot Implementation */

import {WebClient} from '@slack/web-api';

// Configure client
const client = new WebClient(process.env.SLACK_OAUTH_TOKEN);

// Publish initial ticket published message and return timestamp
export async function publishMessage(channel, data) {
    const ticket: any = data.ticket;

    return client.chat.postMessage({
        token: process.env.SLACK_OAUTH_TOKEN,
        channel: channel,
        text: "",
        attachments: [
            {
                color: "#F8E419",
                pretext: "Client Posted New Issue to JIRA",
                title: `JIRA Ticket [${data.id}]`,
                title_link: `${ticket.link}`,
                fields: [
                    {
                        title: "Summary",
                        value: ticket.summary,
                        short: false
                    },
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
                ts: Date.now().toString()
            }
        ]
    }).then((message) => {
        return message.ts;
    });
}

// Publish message in thread (this is users messages).
export async function postInThread(channel, thread, message) {
    if (!thread || !message) {
        console.log("Please provide a thread stamp and msg to send!");
    }
    return client.chat.postMessage({
        token: process.env.SLACK_OAUTH_TOKEN,
        channel: channel,
        text: message,
        thread_ts: thread
    });
}

// Return all messages from a given thread in a channel
export async function getMessages(channel, threadStamp) {
    return [];
}

export async function getChannelId(name) {
    const result: any = await client.conversations.list({
        token: process.env.SLACK_OAUTH_TOKEN
    });
    for (const channel of result.channels) {
        if (channel.name === name) {
            return channel.id;
        }
    }
}

export async function getMostRecentMessage(id) {
    // Call the conversations.history method using WebClient
    const result = await client.conversations.history({
        token: process.env.SLACK_OAUTH_TOKEN,
        channel: id,
        count: 1,
    });

    let conversationHistory = result.messages;

    // Print results
    console.log(conversationHistory);
}

export async function findConversation(name) {
    // Call the conversations.list method using the built-in WebClient
    const result = await client.conversations.list({
        // The token you used to initialize your app
        token: process.env.SLACK_OAUTH_TOKEN
    });

    // @ts-ignore
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
            } catch (error) {
                console.error(error);
            }
            // Break from for loop
            break;
        }
    }
}

// Find conversation with a specified channel `name`
findConversation("tester-channel");
