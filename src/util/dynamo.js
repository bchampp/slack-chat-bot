import dynamoDB from "dynamoose";
import { TicketSchema } from "../models/ticket-schema";

const ticketsTable = dynamoDB.model("support-bot-user-tickets", TicketSchema);

export function addTicketToDynamo(data){
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
            date: ticket.date
        }
    })
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.log(error);
    });
}

export function deleteTicketFromDynamo(id) {
    ticketsTable.delete({id: id}).catch(err => console.log(err));
}

export async function getAllTickets(firmId) {
    const allTickets = [];
    const unformattedTickets = await ticketsTable.scan().exec().catch(err => {
        console.log(err);
    });
    unformattedTickets.forEach(ticket => {
        const formattedTicket = ticket.toJSON();
        if (formattedTicket.firmId == firmId) {
            const ticketObj = {
                "id": ticket.id,
                "name": ticket.ticket.summary,
                "link": ticket.ticket.link,
                "postDate": ticket.ticket.date,
                "status": ticket.ticket.status,
            };
            allTickets.push(ticketObj);
        }
    });
    return allTickets;
}

export async function getQueryTicket(firmId, query) {
    const unformattedTickets = await ticketsTable.scan().exec().catch(err => {
        console.log(err);
    });
    for(var i = 0; i < unformattedTickets.length; i++){
        const formattedTicket = unformattedTickets[i].toJSON();
        if (formattedTicket.firmId === firmId && formattedTicket.id === query) {
            return formattedTicket;
        }
    }
    return {};
}
