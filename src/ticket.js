import { publishMessage } from './util/slack';
// import {  getIssue } from './util/jira';
import { addTicketToDynamo, getAllTickets, getTicket } from './util/dynamo';

const oncallChannel = "general";

// Endpoint to create a new ticket and post a slack message
export function create(event, context, callback) {
  const data = JSON.parse(event.body);

  publishMessage(oncallChannel, data); // Return convo id somehow?
  // getIssue(data);
  // createIssue(data); // Return updated data
  addTicketToDynamo(data);

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  };

  // Return status code 200 and the newly created item
  const response = {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify(
      {
        message: 'Creating a ticket',
      },
      null,
      2
    ),
  };
  callback(null, response);
}

// Endpoint to get all tickets for a specific firm
export async function get(event, context, callback) {
  const data = JSON.parse(event.body);
  if (!data.firmId) {
    const response = {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': '*',
        'Acces-Control-Allow-Methods': '*'
      },
      body: JSON.stringify(
        {
          message: "Please provide a firmId"
        }
      )
    };
    callback(null, response);
  }
  if (data.ticketId) {
    const response = await getTicket(data.firmId, data.ticketId).then(ticket => {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Headers': '*',
          'Acces-Control-Allow-Methods': '*'
        },
        body: JSON.stringify(
          {
            message: "Getting specific firm ticket",
            ticket: ticket
          }
        )
      };
    });
    callback(null, response);
  } else {
    await getAllTickets(data.firmId).then(tickets => {
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Headers': '*',
          'Acces-Control-Allow-Methods': '*'
        },
        body: JSON.stringify(
          {
            message: 'Getting all firm tickets',
            tickets: tickets
          },
          null,
          2
        )
      };
    callback(null, response);
    });
  }
}