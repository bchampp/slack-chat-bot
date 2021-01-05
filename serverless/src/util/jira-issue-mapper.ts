export function jiraIssueMapper(data) {
    const ticket = data.ticket;
    return {
        fields: {
            project: {
                "id": 14261
            },
            summary: ticket.summary,
            description: ticket.description,
            issuetype: {
                "id": ""
            },
            priority: {
                "id": ""
            }
        }
    };
}
