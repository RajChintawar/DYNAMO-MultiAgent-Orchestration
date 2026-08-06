import ChatInput from "./ChatInput";

const ChatWindow = ({
    messages,
    handleSendMessage,
}) => {
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

        <div className="exampleCard">
          Research a topic
        </div>

        <div className="exampleCard">
          Build a REST API
        </div>

        <div className="exampleCard">
          Analyze a PDF
        </div>

        <div className="exampleCard">
          Generate documentation
        </div>

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

</div>

<ChatInput
    handleSendMessage={handleSendMessage}
/>
    </div>
  );
};

export default ChatWindow;