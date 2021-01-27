# Slack integrated chat system

This project implements an AWS Lambda Serverless API template to create a slack-integrated chatbot. A sample client has been provided to demonstrate example integration with the API.
We've connected the demo to our own sample slack workspace to interact with chat users. 

## How it works
The implementation of this bot is very simple. We've created 3 endpoints, `create-chat, get-chat` and `post-chat`. When a user posts their first message in the chat widget, this will call create-chat, which will then do the following: 
- Create a new slack channel for this conversation
- Post a message in your desired channel to alert team members that a new conversation has started
- Invite you to join said conversation to initiate a conversation. 

From here, the API will alternate between get-chat and post-chat to continually refresh the chat widget. From the end users perspective, they are receiving support through a chat widget on your website. From your side, you are just interacting in a slack channel with them. 

## Usage 
We invite anyway who would get value out of this project to use it and integrate it into their own applications. Moreover, if you find bugs or have areas of improvement to be made, feel free to open an Issue, a Pull Request or just message one of us directly. 
# API
|Endpoint | Method | Request | Response|
|-------- | -------- | -------- | -----|
| `chat` | POST | `{ 'message': 'Hello World!'}` | `{ sessionId: 'The slack channel ID for the conversation'} `|
| `chat` | GET | `{ sessionId: 'The slack channel ID for the conversation'}` | `{ messages: [{'reply': 'true', 'message:' 'hello' }, ...]`
| `chat` | PATCH | `{ sessionId: 'The slack channel ID for the conversation', 'message': 'The users message' }` | `{ message: 'success!' }`

# Getting Started

## Create a slack bot
On <a href="https://api.slack.com">Slack</a>, create a slack bot and give it the following permissions: 
- channel:read, channels:history, channels:manage
- chat:write

After installing the bot to your workspace, copy the Slack bot OAuth token given. 

## Create a `.env` file
Create a `.env` file in the api repository with the following fields.
|Key | Value|
|-------- | -----|
|SLACK_OAUTH_TOKEN | `your slack bot oauth token`|
|SLACK_CHAT_CHANNEL | `A channel for the bot to post when new messages come, and link you to the chat specific slack channel!`|

## Install the dependencies
Run `npm install`. You may need to run `npm install -g serverless` to install serverless

## Deploy the stack 
Ensure that your AWS credentials are configured. There are different ways to do this, see <a href="https://www.serverless.com/framework/docs/providers/aws/guide/credentials/">here!</a>. 


Run `sls deploy`. This will deploy the stack to the AWS profile configured in the `.env file`. The output of the deployment should include the REST endpoints for your API. 

## Integrate with your client!
Using the REST Api endpoints that were created by deploying your stack, integrate them with your front end code to begin using the slack bot! Check out our example client code <a href="slackchatbot.netlify.app">here!</a>.

## Authors
- [Brent Champion](https://github.com/bchampp)
- [Michael Pereira](https://github.com/mwpereira)

## Contributing 
We'd love to continue building this platform, and invite other developers to contribute where they'd like to. Please see the [Contributing](./CONTRIBUTING.md) file for details. 

## License
This project is licensed under the MIT license. See the [License](./LICENSE) file for details. 