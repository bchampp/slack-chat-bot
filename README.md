# Slack integrated chat system

This project implements a serverless api template to create a slack-integrated chatbot. 
A sample client has been provided to demonstrate example integration with the api. 

# API
|Name | Method | Request | Response|
|-------- | -------- | -------- | -----|
|messages | GET | {} | {}|
|messages | POST | {} | {}|


# Getting Started

## Create a slack bot
On <a href="https://api.slack.com">Slack</a>, create a slack bot and give it the following permissions: 
- channel:read, channel:write
- conversations:history, channel:history
- im:read, im:write

After installing the bot to your workspace, copy the Slack bot OAuth token given. 

## Create a `.env` file
Create a `.env` file in the api repository with the following fields.
|Key | Value|
|-------- | -----|
|SLACK_TOKEN | `<your slack bot oauth token`|
|SLACK_CHANNEL | `<your desired slack channel`|

## Install the dependencies
Run `npm install`. You may need to run `npm install -g serverless` to install serverless

## Deploy the stack 
Ensure that your AWS credentials are configured. There are different ways to do this, see <a href="https://www.serverless.com/framework/docs/providers/aws/guide/credentials/">here!</a>. 


Run `sls deploy`. This will deploy the stack to the AWS profile configured in the `.env file`. The output of the deployment should include the REST endpoints for your API. 

## Integrate with your client!
Using the REST Api endpoints that were created by deploying your stack, integrate them with your front end code to begin using the slack bot! Check out our example client code <a>here!</a>.
<!-- TODO: Link live deployment -->