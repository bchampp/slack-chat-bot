import { findConversation } from './util/slack';

export function post(event, context, callback) {
    return {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: 'Posting a message',
            input: event,
          },
          null,
          2
        ),
      };
}

export function get(event, context, callback) {
  console.log("Test");
  findConversation("general");
  const response = {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: 'Getting recent messages',
            input: event,
          },
          null,
          2
        ),
      };
    callback(null, response);
}
