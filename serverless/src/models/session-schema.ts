import * as DynamoDB from "dynamoose";

export const SessionSchema = new DynamoDB.Schema({
    id: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
});
