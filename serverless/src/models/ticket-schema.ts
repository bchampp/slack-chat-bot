import * as DynamoDB from "dynamoose";

export const TicketSchema = new DynamoDB.Schema({
    id: { //Jira Ticket Number
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    firmId: {
        type: String,
        required: true
    },
    slackThreadId: {
        type: String,
        required: true
    },
    ticket: {
        type: Object,
        schema: {
            firstName: {
                type: String,
                required: true
            },
            lastName: {
                type: String,
                required: true
            },
            project: {
                type: String,
                required: true
            },
            issueType: {
                type: String,
                required: true
            },
            summary: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            affectedFirm: {
                type: String,
                required: true
            },
            link: {
                type: String,
                required: true
            },
            status: {
                type: String,
                required: true
            },
            priority: {
                type: String,
                required: true
            },
            component: {
                type: Object,
                schema: {
                    value: {
                        type: String,
                        required: true
                    },
                    child: {
                        type: Object,
                        schema: {
                            value: {
                                type: String,
                                required: true
                            }
                        }
                    }
                }
            },
            usersIdentified: {
                type: Number,
                required: true
            },
            expectedBehavior: {
                type: String,
                required: true,
            },
            actualBehavior: {
                type: String,
                required: true
            },
            recreationSteps: {
                type: String,
                required: true
            },
            date: {
                type: String,
                required: true
            }
        }
    }
});
