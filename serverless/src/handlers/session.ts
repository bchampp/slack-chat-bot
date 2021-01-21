import {Handler} from "aws-lambda";
import {addSessionToDynamo} from '../utils/session-processor-util';
import {
    createSessionChannel,
    getSessionMessages,
    postInSupportChannel,
    publishMessage
} from "../utils/slack-processor-util";
import MessageUtil from "../utils/response-message-util";
import {CreateSession} from "../models/create-session";
import {PostMessage} from "../models/post-message";
import {GetMessages} from "../models/get-messages";

/**
 * Initializes Session
 */
export const createSession: Handler = async (event) => {
    try {
        const data: CreateSession = JSON.parse(event.body);

        const sessionId: string = await createSessionChannel(data.message);

        await postInSupportChannel(sessionId, data.message);
        addSessionToDynamo(sessionId);

        return MessageUtil.success(200, 'Posting message in channel');
    } catch (Exception) {
        console.log("Please provide a body with the channel and message");
        return MessageUtil.error(400, 'Thread or message not provided in request');
    }
}

/**
 * Posts client's message
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
    try {
        const data: GetMessages = JSON.parse(event.body);

        const messages: any = getSessionMessages(data.sessionId);

        return MessageUtil.success(200, 'Messages retrieved from the session', {conversation: messages});
    } catch (Exception) {
        console.log("Please provide a body with the session id");
        return MessageUtil.error(400, 'Session id not found');
    }
}
