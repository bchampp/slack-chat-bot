/* JIRA Support Implementation */
import fetch from 'cross-fetch';
import {jiraIssueUtil} from './jira-issue-util';

const authHeader = {
    'Authorization': `Basic ${Buffer.from(
        `${process.env.JIRA_USERNAME}:${process.env.JIRA_PASSWORD}`
    ).toString('base64')}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

const JIRA_CREATE_ISSUE_URL = ``;

// Create a JIRA Ticket
export async function createIssue(data) {
    const payload = jiraIssueUtil(data);

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
