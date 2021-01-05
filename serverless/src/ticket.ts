import { publishMessage } from './util/slack';
import { createIssue } from './util/jira';
import { addTicketToDynamo, deleteTicketFromDynamo, getAllTickets, getQueryTicket } from './util/dynamo';

const responseHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': '*'
};
let successful_response: any = {
  statusCode: 200,
  headers: responseHeaders,
};
let failed_response: any = {
  statusCode: 400,
  headers: responseHeaders,
};

// Endpoint to create a new ticket and post a slack message
export function createTicket(event, context, callback) {
  let data = JSON.parse(event.body);

  // Creates Issue on JIRA
  createIssue(data).then((response: any) => {
    const jiraData = JSON.parse(response);

    // Sets ticket Id and link to JIRA ticket
    data.id = jiraData.key;
    data.ticket.link = `https://bugs.caseware.com/browse/${jiraData.key}`;

    // OnCall Bot Messages the Slack Channel
    publishMessage("channel", data).then((slackThread) => {

      // Sets the slack thread Id
      data.slackThreadId = slackThread;
      data.ticket.status = "Open";

      // Adds Ticket to DynamoDB
      addTicketToDynamo(data);

      // Return status code 200 and the newly created item
      successful_response.body = JSON.stringify({ message: 'Creating a ticket', }, null, 2);

      callback(null, successful_response);
    });
  });
}

// Endpoint to get all tickets for a specific firm
export async function getTicket(event, context, callback) {
  const data = JSON.parse(event.body);
  if (!data.firmId) {
    failed_response.body = JSON.stringify({ message: "Please provide a firmId" });
    callback(null, failed_response);
  }
  if (data.ticketId) {
    const response = await getQueryTicket(data.ticketId, data.firmId).then(ticket => {
      successful_response.body = JSON.stringify({ message: "Getting specific firm ticket", ticket: ticket });
      return successful_response;
    });
    callback(null, response);
  } else {
    await getAllTickets(data.firmId).then(tickets => {
      successful_response.body = JSON.stringify({ message: 'Getting all firm tickets', tickets: tickets }, null, 2);
      callback(null, successful_response);
    });
  }
}

export async function deleteTicket(event, context, callback) {
  const data = JSON.parse(event.body);
  if (data.ticketId) {
    deleteTicketFromDynamo(data.ticketId);
  } else {
    failed_response.body = JSON.stringify({ message: "Please provide a ticketId" });
    callback(null, failed_response);
  }
}
