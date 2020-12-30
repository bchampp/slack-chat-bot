export function JiraIssueFormatter(data){
    const jiraIssue = {
        "fields":{
            "project":{
               "id":14261
            },
            "summary":"ticket.summary",
            "description":"ticket.description",
            "issuetype":{
               "id":32
            },
            "customfield_15151":"ticket.expectedBehavior",
            "customfield_15140":"ticket.actualBehavior",
            "customfield_15160":"ticket.recreationSteps",
            "customfield_15155": 5,
            "customfield_15175":"ticket.issueDate",
            "customfield_15255":{
               "self":"https://bugs.caseware.com/rest/api/2/customFieldOption/31785",
               "value":"Cloud 2.0",
               "id":"31785",
               "child":{
                  "self":"https://bugs.caseware.com/rest/api/2/customFieldOption/31795",
                  "value":"Firm Settings",
                  "id":"31795"
               }
            }
         }
    };
    return jiraIssue;
}
