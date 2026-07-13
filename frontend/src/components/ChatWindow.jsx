import ChatInput from "./ChatInput";

const ChatWindow = () => {
  return (
    <div className="chatContainer">

      <div className="chatHeader">
        <h2>DYNAMO Orchestrator</h2>
      </div>

      <div className="chatMessages">

        <div className="userMessage">
          Compare AWS vs Azure for a scalable AI platform.
        </div>

        <div className="assistantMessage">
          Hello! I'm ready to orchestrate your request.
          Enter a goal below to begin.
        </div>

      </div>

      <ChatInput />

    </div>
  );
};

export default ChatWindow;