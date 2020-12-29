import dynamoDB from "dynamoose";
import { TicketSchema } from "../models/ticket-schema";

const ticketsTable = dynamoDB.model("support-bot-user-tickets", TicketSchema);
const mockData = false;

const fakeData = {
    id: "CC-TEST",
    userId: "djhdj-dsadasasd-asdsad-asds",
    firmId: "djhdj-dsadasasd-asdsad-asds",
    slackThreadId: "jkhfsds",
    ticket:{
        firstName: "Michael",
        lastName: "Pereira",
        project: "CC",
        issueType: "Bug",
        summary: "Something isnt working",
        description: "What is happening",
        affectedFirm: "AcmeCorp",
        priority: "High",
        component: "Comp",
        usersIdentified: "12",
        expectedBehavior: "this",
        actualBehavior: "that",
        recreationSteps: "that",
        link: "https://google.ca/",
        status: "Open",
        date: "3827498",
    }};

export function addTicketToDynamo(data){
    
    if (mockData) {
        data = fakeData;
    }

    const ticket = data.ticket;

    ticketsTable.create({
        id: data.id,
        userId: data.userId,
        firmId: data.firmId,
        slackThreadId: data.slackThreadId,
        ticket:{
            firstName: ticket.firstName,
            lastName: ticket.lastName,
            project: ticket.project,
            issueType: ticket.issueType,
            summary: ticket.summary,
            description: ticket.description,
            affectedFirm: ticket.affectedFirm,
            priority: ticket.priority,
            component: ticket.component,
            usersIdentified:ticket.usersIdentified,
            expectedBehavior: ticket.expectedBehavior,
            actualBehavior: ticket.actualBehavior,
            recreationSteps: ticket.recreationSteps,
            link: ticket.link,
            status: ticket.status,
            date: ticket.date,
        }
    })
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.log(error);
    });
}

export function getAllTickets(firmId) {
    const ticketsTable = dynamoDB.model("support-bot-user-tickets", TicketSchema);
    ticketsTable.get().then(result => {
        console.log(result);
    }).catch(error => {
        console.log(error);
    });
}