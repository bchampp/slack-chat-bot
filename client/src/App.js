import { API } from "aws-amplify";
import React, { useState, useEffect } from "react";
import {
  Widget,
  addUserMessage,
  addResponseMessage,
  deleteMessages,
} from "react-chat-widget";
import "react-chat-widget/lib/styles.css";

const WELCOME_TEXT =
  "Welcome to the Slack Integration App! By responding to this message, you will create a new channel in our teams slack workspace, where we can then interact with you.";

function App() {
  const [activeSession, setActiveSession] = useState(false);
  const [sessionId, setSessionId] = useState(
    window.localStorage.getItem("sessionId")
      ? window.localStorage.getItem("sessionId")
      : ""
  );

  /**
   * Only being used as a componentDidMount() call here.
   */
  useEffect(() => {
    let interval = setInterval(() => getMessages(), 20000);

    // Load the initial messages
    async function getMessages() {
      deleteMessages();
      await API.get("chat-bot", `/chat/${sessionId}`)
        .then((res) => {
          if (res.data.messages) {
            for (const msg of res.data.messages) {
              if (msg.reply === true) {
                addResponseMessage(msg.message);
              } else {
                addUserMessage(msg.message);
              }
            }
          }
        })
        .catch((err) => console.log(err));
    }

    if (sessionId !== "") {
      setActiveSession(true);
      getMessages();
    } else {
      addResponseMessage(WELCOME_TEXT);
    }

    return () => clearInterval(interval);
  }, [sessionId]);

  const handleNewUserMessage = async (response) => {
    console.log(`New user message incoming! ${response}`);

    if (activeSession === true) {
      await API.patch("chat-bot", "/chat", {
        body: {
          message: response,
          sessionId,
        },
        headers: {
          "Content-Type": "text/plain",
        },
      });
    } else {
      // First message from client triggers a new thread flow
      await API.post("chat-bot", "/chat", {
        body: {
          message: response,
        },
        headers: {
          "Content-Type": "text/plain",
        },
      }).then((res) => {
        window.localStorage.setItem("sessionId", res.data.sessionId);
        setSessionId(res.data.sessionId);
        setActiveSession(true);
      });
    }
  };

  return (
    <div className="App">
      <div className="banner-container">
        <img className="slack-img" src="/images/slack.png" alt="slack"></img>
        <img className="slack-img" src="/images/chat.png" alt="chat"></img>

        <h1>Slack Chat Bot</h1>
      </div>
      <div className="about-container">
        <h2 className="about-heading">
          Real time communication with customers
        </h2>
        <p className="about-text">
          Interact with potential leads or current customers from your website
          through slack. This plugin will redirect chat messages from your
          website to your slack workspace, reducing the complexity in
          communicating with clients.
        </p>
        <h2 className="about-heading">Free</h2>
        <p className="about-text">
          This plugin is hosted through AWS Serverless, which means that you are
          only charged on a per use basis. Rather than having a dedicated
          server, AWS will invoke the server functions only when the endpoints
          are called. Since the AWS free usage tier allows 1 million free
          requests per month, this plugin will most likely be free of use. If
          your application requires more than this, it scales at $0.20c per
          additional 1M requests.
        </p>
        <h2 className="about-heading">Customizable</h2>
        <p className="about-text">
          Since we've open sourced the API for people to deploy their own
          plugins, any developer would be able to add additional functionality
          to the plugin. Basically, anyone with experience in
          JavaScript/TypeScript will easily be able to develop on top of this
          base product. However, the base product is likely enough for most
          applications.
        </p>
        <h2 className="about-heading">Getting Started</h2>
        <p className="about-text">
          Instructions for getting started with the plugin can be found in the{" "}
          <a href="https://github.com/bchampp/slack-chat-bot/README.md">
            README.
          </a>
        </p>
      </div>
      <Widget
        title="Slack Integration Chat"
        subtitle="Demo"
        handleNewUserMessage={handleNewUserMessage}
      />
    </div>
  );
}

export default App;
