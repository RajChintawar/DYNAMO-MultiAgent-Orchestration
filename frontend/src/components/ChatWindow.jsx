import { useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
const ChatWindow = ({
  messages,
  handleSendMessage,
}) => {

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="chatContainer">

      <div className="chatHeader">
        <h2>DYNAMO Orchestrator</h2>
      </div>

      <div className="chatMessages">

  {messages.length === 0 ? (

    <div className="emptyState">

      <h1>⚡ DYNAMO</h1>

      <p>
        What would you like to accomplish today?
      </p>

      <div className="exampleContainer">

  <button
    className="exampleCard"
    onClick={() => handleSendMessage("Research a topic")}
  >
    <span>📚</span>
    <span>Research a topic</span>
  </button>

  <button
    className="exampleCard"
    onClick={() => handleSendMessage("Build a REST API")}
  >
    <span>💻</span>
    <span>Build a REST API</span>
  </button>

  <button
    className="exampleCard"
    onClick={() => handleSendMessage("Analyze a PDF")}
  >
    <span>📄</span>
    <span>Analyze a PDF</span>
  </button>

  <button
    className="exampleCard"
    onClick={() => handleSendMessage("Generate documentation")}
  >
    <span>📝</span>
    <span>Generate documentation</span>
  </button>

</div>

    </div>

  ) : (

    messages.map((message) => (

      <div
        key={message.id}
        className={
          message.sender === "user"
            ? "userMessage"
            : "assistantMessage"
        }
      >

        {message.text}

      </div>

    ))

  )}

<div ref={messagesEndRef} />
</div>


<ChatInput
    handleSendMessage={handleSendMessage}
/>
    </div>
  );
};

export default ChatWindow;