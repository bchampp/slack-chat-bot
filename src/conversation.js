import { getQueryTicket } from './util/dynamo';
import { getMessages, publishClientMessage } from './util/slack';

const channel = "general";
const responseHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Headers': '*',
  'Acces-Control-Allow-Methods': '*'
};

// Endpoint called from client to post a message on behalf of the client to a given thread
export async function post(event, context, callback) {
  if (!event.body) {
    console.log("Please provide a body with thread and message");
    const response = {
      statusCode: 400,
      headers: responseHeaders,
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

  publishClientMessage(data.message, data.id);

  const response = {
    statusCode: 200,
    headers: responseHeaders,
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
      headers: responseHeaders,
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
