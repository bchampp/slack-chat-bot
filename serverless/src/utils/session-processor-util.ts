import * as DynamoDB from "dynamoose";
import {SessionSchema} from "../models/session-schema";

const sessionTable = DynamoDB.model("support-bot-user-tickets", SessionSchema);

/**
 * Adds Session to Dynamo
 */
export function addSessionToDynamo(id: string) {
    sessionTable.create({
        id: id,
        date: Date.now()
    })
        .catch(error => {
            console.log(error);
        });
}
