import {Handler} from "aws-lambda";
import * as uuid from "uuid";

import {
    createSessionChannel,
    getSessionMessages,
    postInSupportChannel,
    publishMessage
} from "../utils/slack-processor";
import MessageUtil from "../utils/response-message";
import {PostMessage} from "../models/post-message";

/**
 * Initializes Session
 */
export const createSession: Handler = async (event) => {
    const data = JSON.parse(event.body);

    /* Validate the request */
    if (!data) {
        return MessageUtil.error(400, 'Body not passed in the request');
    }

    if (!data.message) {
        return MessageUtil.error(400, 'Field message missing in the request body!');
    }
    
    const sessionName = uuid.v4()
    const sessionId: string = await createSessionChannel(data.message, sessionName); // Create a new channel for the chat session
    await postInSupportChannel(sessionName, data.message); // Post in the general support channel that a new session has been created
    const result = MessageUtil.success(200, 'Succesfully created new chat session!', { sessionId });
    console.log(result);
    return result;
}

/**
 * Posts a message to the slack session channel on behalf of the client. 
 */
export const postMessage: Handler = async (event) => {
    try {
        const data: PostMessage = JSON.parse(event.body);

        await publishMessage(data.sessionId, data.message);

        return MessageUtil.success(200, 'Posting message in channel');
    } catch (Exception) {
        console.log("Please provide a body with the session id and message");
        return MessageUtil.error(400, 'Session id or message not provided in request');
    }
}

/**
 * Gets all messages from session on slack
 */
export const getMessages: Handler = async (event) => {
    const sessionId = event.pathParameters.id; 

    if (!sessionId) {
        return MessageUtil.error(400, 'sessionId missing in the request body!');
    }

    const messages: any = await getSessionMessages(sessionId);
    return MessageUtil.success(200, 'Messages retrieved from the session', { messages });
}
