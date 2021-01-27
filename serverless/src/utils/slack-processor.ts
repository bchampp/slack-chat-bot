import {WebClient} from '@slack/web-api';

// Configure client
const client = new WebClient(process.env.SLACK_OAUTH_TOKEN);
const supportChannel: string = process.env.SLACK_CHAT_CHANNEL

/**
 * Create session chat with generated UUID
 */
export async function createSessionChannel(message: string, name: string): Promise<string> {

    /** 
     * Create and join a new channel for the chat to take place in. Name is currently an uuid.v4() guid string. 
     * 
    */
    const res: any = await client.conversations.create({
        token: process.env.SLACK_OAUTH_TOKEN,
        name,
        is_private: false
    }).catch(err => {
        console.log(err);
    });

    const chatId = res.channel.id;

    await publishMessage(name, message);
    return chatId
}

/**
 * Posts to session channel
 */
export async function publishMessage(channel: string, message: string) {

    await client.chat.postMessage({
        token: process.env.SLACK_OAUTH_TOKEN,
        channel: channel,
        text: "",
        attachments: [
            {
                color: "#F8E419",
                pretext: "Client Message",
                title: `Conversation ID: [${channel}]`,
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
export async function getSessionMessages(channelId: string) {
    const res: any = await client.conversations.history({
        channel: channelId
    }).catch(err => {
        console.log(err);
    })

    const rawMessages = res.messages;
    const cleanMessages = [];

    for (const msg of rawMessages) {
        if (msg.type === 'message') {
            if (msg.subtype === 'channel_join') {
            } else {
                if (msg.bot_id) { // From the client!
                    cleanMessages.push({ reply: false, message: msg.attachments[0].fields[0].value})
                } else if (msg.client_msg_id) {
                    cleanMessages.push({ reply: true, message: msg.text});
                }
            }
        }
    }
    cleanMessages.reverse();
    return cleanMessages;
}
