import { useState } from "react";
import "../styles/dashboard.css";

import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import Pipeline from "../components/Pipeline";
import EventLog from "../components/EventLog";

const Dashboard = () => {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      title: "Welcome to DYNAMO",

      messages: [],

      pipeline: [
        {
          id: "supervisor",
          title: "Supervisor",
          subtitle: "Task received",
          status: "completed",
        },
        {
          id: "planner",
          title: "Planner",
          subtitle: "Execution plan created",
          status: "completed",
        },
        {
          id: "research",
          title: "Research Agent",
          subtitle: "Waiting to execute",
          status: "waiting",
        },
        {
          id: "evaluator",
          title: "Evaluator",
          subtitle: "Waiting for agent results",
          status: "waiting",
        },
        {
          id: "synthesizer",
          title: "Synthesizer",
          subtitle: "Waiting for final results",
          status: "waiting",
        },
      ],

      eventLogs: [
        {
          id: "event-1",
          time: "14:32:11",
          event: "Supervisor started",
        },
        {
          id: "event-2",
          time: "14:32:13",
          event: "Goal classified",
        },
        {
          id: "event-3",
          time: "14:32:18",
          event: "Planner created execution plan",
        },
      ],

      isExecuting: false,
    },
  ]);

  const [selectedConversationId, setSelectedConversationId] = useState(1);

  const selectedConversation =
    conversations.find(
      (conversation) => conversation.id === selectedConversationId
    ) || null;


  // =========================================================
  // MOCK EXECUTION
  // =========================================================

  const startMockExecution = (conversationId) => {
    const stages = [
      {
        id: "supervisor",
        title: "Supervisor",
        subtitle: "Processing task",
        status: "running",
      },
      {
        id: "planner",
        title: "Planner",
        subtitle: "Waiting to execute",
        status: "waiting",
      },
      {
        id: "research",
        title: "Research Agent",
        subtitle: "Waiting to execute",
        status: "waiting",
      },
      {
        id: "evaluator",
        title: "Evaluator",
        subtitle: "Waiting to execute",
        status: "waiting",
      },
      {
        id: "synthesizer",
        title: "Synthesizer",
        subtitle: "Waiting to execute",
        status: "waiting",
      },
    ];

    // One execution start time.
    // All event timestamps are calculated from this.
    const executionStart = Date.now();

    const createEvent = (event, offset) => ({
      id: crypto.randomUUID(),
      time: new Date(executionStart + offset).toLocaleTimeString(),
      event,
    });


    // =========================================================
    // START EXECUTION
    // =========================================================

    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === conversationId
          ? {
              ...conversation,

              isExecuting: true,

              pipeline: stages,

              eventLogs: [
                createEvent("Supervisor started", 0),
              ],
            }
          : conversation
      )
    );


    // =========================================================
    // SUPERVISOR → PLANNER
    // =========================================================

    setTimeout(() => {
      setConversations((prev) =>
        prev.map((conversation) => {
          if (conversation.id !== conversationId)
            return conversation;

          return {
            ...conversation,

            pipeline: conversation.pipeline.map((stage) => {
              if (stage.id === "supervisor") {
                return {
                  ...stage,
                  subtitle: "Task analyzed",
                  status: "completed",
                };
              }

              if (stage.id === "planner") {
                return {
                  ...stage,
                  subtitle: "Creating execution plan",
                  status: "running",
                };
              }

              return stage;
            }),

            eventLogs: [
              ...conversation.eventLogs,

              createEvent("Supervisor completed", 1500),
              createEvent("Planner started", 1500),
            ],
          };
        })
      );
    }, 1500);


    // =========================================================
    // PLANNER → RESEARCH
    // =========================================================

    setTimeout(() => {
      setConversations((prev) =>
        prev.map((conversation) => {
          if (conversation.id !== conversationId)
            return conversation;

          return {
            ...conversation,

            pipeline: conversation.pipeline.map((stage) => {
              if (stage.id === "planner") {
                return {
                  ...stage,
                  subtitle: "Execution plan created",
                  status: "completed",
                };
              }

              if (stage.id === "research") {
                return {
                  ...stage,
                  subtitle: "Searching relevant sources",
                  status: "running",
                };
              }

              return stage;
            }),

            eventLogs: [
              ...conversation.eventLogs,

              createEvent("Planner completed", 3000),
              createEvent("Research Agent started", 3000),
            ],
          };
        })
      );
    }, 3000);


    // =========================================================
    // RESEARCH → EVALUATOR
    // =========================================================

    setTimeout(() => {
      setConversations((prev) =>
        prev.map((conversation) => {
          if (conversation.id !== conversationId)
            return conversation;

          return {
            ...conversation,

            pipeline: conversation.pipeline.map((stage) => {
              if (stage.id === "research") {
                return {
                  ...stage,
                  subtitle: "Research completed",
                  status: "completed",
                };
              }

              if (stage.id === "evaluator") {
                return {
                  ...stage,
                  subtitle: "Evaluating results",
                  status: "running",
                };
              }

              return stage;
            }),

            eventLogs: [
              ...conversation.eventLogs,

              createEvent("Research Agent completed", 5000),
              createEvent("Evaluator started", 5000),
            ],
          };
        })
      );
    }, 5000);


    // =========================================================
    // EVALUATOR → SYNTHESIZER
    // =========================================================

    setTimeout(() => {
      setConversations((prev) =>
        prev.map((conversation) => {
          if (conversation.id !== conversationId)
            return conversation;

          return {
            ...conversation,

            pipeline: conversation.pipeline.map((stage) => {
              if (stage.id === "evaluator") {
                return {
                  ...stage,
                  subtitle: "Evaluation completed",
                  status: "completed",
                };
              }

              if (stage.id === "synthesizer") {
                return {
                  ...stage,
                  subtitle: "Generating final response",
                  status: "running",
                };
              }

              return stage;
            }),

            eventLogs: [
              ...conversation.eventLogs,

              createEvent("Evaluator completed", 7000),
              createEvent("Synthesizer started", 7000),
            ],
          };
        })
      );
    }, 7000);


    // =========================================================
    // EXECUTION COMPLETE
    // =========================================================

    setTimeout(() => {
      setConversations((prev) =>
        prev.map((conversation) => {
          if (conversation.id !== conversationId)
            return conversation;

          return {
            ...conversation,

            isExecuting: false,

            pipeline: conversation.pipeline.map((stage) => {
              if (stage.id === "synthesizer") {
                return {
                  ...stage,
                  subtitle: "Final response ready",
                  status: "completed",
                };
              }

              return stage;
            }),

            eventLogs: [
              ...conversation.eventLogs,

              createEvent("Synthesizer completed", 9000),
              createEvent("Execution completed", 9000),
            ],
          };
        })
      );
    }, 9000);
  };


  // =========================================================
  // SEND MESSAGE
  // =========================================================
const sendMessageToBackend = async (conversationId, message) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/chat/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversation_id: String(conversationId),
        message: message,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();

      console.error(
        "BACKEND VALIDATION ERROR:",
        JSON.stringify(errorData, null, 2)
      );

      return null;
    }

    const data = await response.json();

    console.log("BACKEND RESPONSE:", data);

    return data;

  } catch (error) {
    console.error("BACKEND CONNECTION ERROR:", error);
    return null;
  }
};





const handleSendMessage = async (message) => {
      if (!message.trim()) return;


    // =======================================================
    // NEW CHAT
    // =======================================================

    if (selectedConversationId === null) {
      const newConversation = {
        id: crypto.randomUUID(),

        title: message
          .split(" ")
          .slice(0, 5)
          .join(" "),

        messages: [
          {
            id: crypto.randomUUID(),
            sender: "user",
            text: message,
          },
        ],

        pipeline: [],

        eventLogs: [],

        isExecuting: true,
      };

     setConversations((prev) => [
  newConversation,
  ...prev,
]);

setSelectedConversationId(newConversation.id);

const backendResponse = await sendMessageToBackend(
  newConversation.id,
  message
);

if (backendResponse) {
  startMockExecution(newConversation.id);
}

return;
    }


    // =======================================================
    // EXISTING CHAT
    // =======================================================

    setConversations((prev) =>
      prev.map((conversation) => {
        if (conversation.id !== selectedConversationId)
          return conversation;

        return {
          ...conversation,

          messages: [
            ...conversation.messages,

            {
              id: crypto.randomUUID(),
              sender: "user",
              text: message,
            },
          ],
        };
      })
    );

const backendResponse = await sendMessageToBackend(
  selectedConversationId,
  message
);

if (backendResponse) {
  startMockExecution(selectedConversationId);
}  };


  // =========================================================
  // NEW CHAT
  // =========================================================

  const handleStartNewChat = () => {
    setSelectedConversationId(null);
  };


  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="dashboard">

      <aside className="sidebar">
        <Sidebar
          conversations={conversations}
          selectedConversationId={selectedConversationId}
          setSelectedConversationId={setSelectedConversationId}
          handleStartNewChat={handleStartNewChat}
        />
      </aside>


      <main className="mainContent">
        <ChatWindow
          messages={selectedConversation?.messages || []}
          handleSendMessage={handleSendMessage}
        />
      </main>


      <aside className="rightPanel">

        <div className="pipelineContainer">
          <Pipeline
            pipeline={selectedConversation?.pipeline || []}
          />
        </div>

        <div className="eventContainer">
          <EventLog
  eventLogs={selectedConversation?.eventLogs || []}
  conversationId={selectedConversationId}
  isExecuting={selectedConversation?.isExecuting || false}
/>
        </div>

      </aside>

    </div>
  );
};

export default Dashboard;