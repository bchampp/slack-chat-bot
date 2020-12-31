import { publishCreateIssueMessage } from './util/slack';
import {  createIssue } from './util/jira';
import { addTicketToDynamo, deleteTicketFromDynamo, getAllTickets, getQueryTicket } from './util/dynamo';

// Endpoint to create a new ticket and post a slack message
export function createTicket(event, context, callback) {
  let data = JSON.parse(event.body);

  // Creates Issue on JIRA
  createIssue(data).then((response) => {
    const jiraData = JSON.parse(response);

    // Sets ticket Id and link to JIRA ticket
    data.id = jiraData.key;
    data.ticket.link = `https://bugs.caseware.com/browse/${jiraData.key}`;

    // OnCall Bot Messages the Slack Channel
    publishCreateIssueMessage(data).then((slackThread) => {

      // Sets the slack thread Id
      data.slackThreadId = slackThread;
      data.ticket.status = "Open";

      // Adds Ticket to DynamoDB
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
    });
  });
}

// Endpoint to get all tickets for a specific firm
export async function getTicket(event, context, callback) {
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
    const response = await getQueryTicket(data.firmId, data.ticketId).then(ticket => {
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

export async function deleteTicket(event, context, callback) {
  const data = JSON.parse(event.body);
  if (data.ticketId) {
    deleteTicketFromDynamo(data.ticketId);
  } else {
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
          message: "Please provide a ticketId"
        }
      )
    };
    callback(null, response);
  }
}