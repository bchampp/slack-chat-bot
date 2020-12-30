export function JiraIssueFormatter(data){
    const ticket = data.ticket;

    console.log(ticket);

    const jiraIssue = {
        fields: {
            project: {id: '14261'},//{name: ticket.project},
            summary: ticket.summary,
            description: ticket.description,
            issuetype: {id: '32'},//{name: ticket.issueType},
            priority: {id: '4'}, //{name: ticket.priority},
            customfield_15140: ticket.actualBehavior, //Actual Behavior
            customfield_15151: ticket.expectedBehavior, //Expected Behavior
            customfield_15160: ticket.recreationSteps, //Steps
            customfield_15175: ticket.issueDate, //Date
            customfield_15255: ticket.component, //Components
            customfield_15155: ticket.usersIdentified, //Number of Users Identified
            reporter: {name: 'michael.pereira'}
        }
    };

    console.log(jiraIssue);

    return jiraIssue;
}