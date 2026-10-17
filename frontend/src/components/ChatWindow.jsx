
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ChatInput from "./ChatInput";

const ChatWindow = ({ messages, handleSendMessage }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // Remove unwanted backslashes before Markdown formatting symbols.
  const formatMarkdown = (text = "") =>
    text.replace(/\\(?=[#*_])/g, "");

  return (
    <div className="chatContainer">
      <div className="chatHeader">
        <h2>DYNAMO Orchestrator</h2>
      </div>

      <div className="chatMessages">
        {messages.length === 0 ? (
          <div className="emptyState">
            <h1>⚡ DYNAMO</h1>

            <p>What would you like to accomplish today?</p>

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
                <span>🛠️</span>
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
              
{message.sender === "user" ? (
  message.text
) : (
  <>
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {formatMarkdown(message.text)}
    </ReactMarkdown>

    {message.metrics && (
      <div className="responseMetrics">
        <span>Tokens: {message.metrics.totalTokens ?? 0}</span>
        <span>
          Latency: {Number(message.metrics.latencyMs ?? 0).toFixed(0)} ms
        </span>
        <span>
          Confidence: {Number(message.metrics.confidence ?? 0).toFixed(2)}
        </span>
        <span>Policy: {message.metrics.policy || "N/A"}</span>
        <span>
          Agents: {message.metrics.agents?.length ?? 0}
        </span>
      </div>
    )}
  </>
)}

            </div>
          ))
        )}

        <div ref={messagesEndRef} />
      </div>

      <ChatInput handleSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
