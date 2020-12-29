/* JIRA Support Implementation */
import fetch from 'cross-fetch';
// import JiraClient from "jira-connector";

// const jira = new JiraClient({
//     host: "bugs.caseware.com",
//     basic_auth: {
//         username: process.env.JIRA_USERNAME,
//         password: process.env.JIRA_PASSWORD, // Can use email & API token instead
//     },
//     strictSSL: false // One of optional parameters
// });

// Create a JIRA Ticket
export function createIssue(data) {
    // jira.issue.createIssue({
    //     fields: {
    //         project: {
    //             key: "CC",
    //         },
    //         summary: "Test Ticket",
    //         description: "This is a test ticket for Cloud Platform OnCall",
    //         issuetype: {
    //             name: "Bug"
    //         }
    //     },
    //     function(error, issue) {
    //         console.log(error);
    //         console.log(issue);
    //     }
    // });
}

// Get a JIRA Ticket
export function getIssue(data) {
    fetch('https://bugs.caseware.com/rest/api/2/issue/CC-3357', {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${Buffer.from(
            `michael.pereira:f7u7IViGwWi17QfVtkGAAF4B`
          ).toString('base64')}`,
          'Accept': 'application/json'
        }
      })
        .then(response => {
          console.log(
            `Response: ${response.status} ${response.statusText}`
          );
          return response.text();
        })
        .then(text => console.log(text));
    // jira.issue.getIssue(
    //     {
    //       issueKey: "CC-3357"
    //     },
    //     function(error, issue) {
    //       console.log(error);
    //       console.log(issue.fields.summary);
    //     }
    //   );
}