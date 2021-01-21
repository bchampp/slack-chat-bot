import * as uuid from "uuid";
import {WebClient} from '@slack/web-api';

// Configure client
const client = new WebClient(process.env.SLACK_OAUTH_TOKEN);
const supportChannel: string = process.env.SUPPORT_CHANNEL;

/**
 * Create session chat with generated UUID
 */
export async function createSessionChannel(message: string): Promise<string> {
    const id: string = uuid.v4();

    await client.conversations.create({
        token: process.env.SLACK_OAUTH_TOKEN,
        name: uuid.v4(),
        is_private: false
    })

    await publishMessage(id, message);

    return id;
}

/**
 * Posts to session channel
 */
export async function publishMessage(sessionId: string, message: string) {
    await client.chat.postMessage({
        token: process.env.SLACK_OAUTH_TOKEN,
        channel: sessionId,
        text: "",
        attachments: [
            {
                color: "#F8E419",
                pretext: "Client Message",
                title: `Conversation ID: [${sessionId}]`,
                fields: [
                    {
                        title: "Message",
                        value: message,
                        short: false
                    }
                ],
                ts: Date.now().toString()
            }
        ]
    });
}

/**
 * Posts session created in Support channel
 */
export async function postInSupportChannel(sessionId: string, message: string): Promise<void> {
    await client.chat.postMessage({
        token: process.env.SLACK_OAUTH_TOKEN,
        channel: supportChannel,
        text: "",
        attachments: [
            {
                color: "#F8E419",
                pretext: "Client Created Chat Support Session",
                title: `Conversation ID: [${sessionId}]`,
                fields: [
                    {
                        title: "Initial Message",
                        value: message,
                        short: false
                    }
                ],
                ts: Date.now().toString()
            }
        ]
    });
}

/**
 * Retrieves all messages from session channel
 */
export function getSessionMessages(sessionId: string) {
    return client.conversations.history({
        channel: sessionId
    })
}
