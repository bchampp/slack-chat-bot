// import { publishMessage } from './util/slack';
// import {  getIssue } from './util/jira';
import { addTicketToDynamo } from './util/dynamo';

// Endpoint to create a new ticket and post a slack message
export function create(event, context, callback) {
  const data = JSON.parse(event.body);

  // publishMessage("general", data); // Return convo id somehow?
  // getIssue(data);
  // createIssue(data); // Return updated data
  addTicketToDynamo(data);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Creating a ticket',
        input: event,
      },
      null,
      2
    ),
  };
}

// Endpoint to get all tickets for a specific firm
export function get(event, context, callback) {
  const fakeTickets = [];
  for (var i = 0; i < 10; i++) {
    const ticket = {
      "name": "Can't set up SSO",
      "link": "youtube.com",
      "date": "12-05-2020",
      "status": "In Progress"
    };
    fakeTickets.push(ticket);
  }
  return {
    body: JSON.stringify(
      {
        message: 'Getting all firm tickets',
        tickets: fakeTickets
      },
      null,
      2
    )
  };
}