export function JiraIssueFormatter(data){
    const jiraIssue = {
        "fields":{
            "project":{
               "id":14261
            },
            summary: ticket.summary,
            description: ticket.description,
            issuetype: {
                "id": 32
            },
            priority: {
                "id": 3
            },
            customfield_15151: ticket.expectedBehavior,
            customfield_15140: ticket.actualBehavior,
            customfield_15160: ticket.recreationSteps,
            customfield_15155: 10,
            customfield_15175: ticket.date,
            customfield_15255: {
                value: "Cloud 2.0",
                child: {
                    "value": "Firm Settings",
                }
            }
        }
    };
}
