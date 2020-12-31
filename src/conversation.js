import { getQueryTicket } from './util/dynamo';
import { getMessages, postInThread } from './util/slack';

const channel = "general";

// Endpoint called from client to post a message on behalf of the client to a given thread
export async function post(event, context, callback) {
  if (!event.body) {
    console.log("Please provide a body with thread and message");
    const response = {
      statusCode: 400,
      body: JSON.stringify(
        {
          message: 'Thread or message not provided in request',
        },
        null,
        2
      ),
    };
    callback(null, response);
  }
  const data = JSON.parse(event.body);
  postInThread(channel, data.thread, data.message);
  const response = {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Posting message in thread',
      },
      null,
      2
    ),
  };
  callback(null, response);
}

// Endpoint to get an array of all messages in a thread
export async function get(event, context, callback) {
  if (!event.body) {
    console.log("Please provide a body with ticketId");
    const response = {
      statusCode: 400,
      body: JSON.stringify(
        {
          message: 'Thread not provided in request',
        },
        null,
        2
      ),
    };
    callback(null, response);
}
