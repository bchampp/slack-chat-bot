/* JIRA Support Implementation */
import fetch from 'cross-fetch';
import { jiraIssueMapper } from './jira-issue-mapper';

const authHeader = {
  'Authorization': `Basic ${Buffer.from(
    `${process.env.JIRA_USERNAME}:${process.env.JIRA_PASSWORD}`
  ).toString('base64')}`,
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

const JIRA_CREATE_ISSUE_URL = `https://bugs.caseware.com/rest/api/2/issue/`;

// Create a JIRA Ticket
export async function createIssue(data) {
<<<<<<< HEAD
  const payload = JiraIssueFormatter(data);
  console.log(payload);
=======
  const payload = jiraIssueMapper(data);
>>>>>>> 8a65f44 (bless up)

  console.log(authHeader);
  return fetch(JIRA_CREATE_ISSUE_URL, {
    method: 'POST',
    headers: authHeader,
    body: JSON.stringify(payload)
  })
    .then(response => {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      );

      return response.text();
    })
    .catch(error => console.log(error));
}

// Get a JIRA Ticket
export function getIssue(ticket) {
  return fetch(`https://bugs.caseware.com/rest/api/2/issue/${ticket}`, {
    method: 'GET',
    headers: authHeader
  })
    .then(response => {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      );
      return response;
    })
    .catch(error => console.log(error));
}