import { useState } from "react";
import "../styles/dashboard.css";

import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import Pipeline from "../components/Pipeline";
import EventLog from "../components/EventLog";
import {
  createConversation,
  sendChatMessage,
  getExecutionStatus,
  getExecutionEvents,
} from "../services/api";
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

const [selectedConversationId, setSelectedConversationId] = useState(null);
  const selectedConversation =
    conversations.find(
      (conversation) => conversation.id === selectedConversationId
    ) || null;


  // =========================================================
  // MOCK EXECUTION
  // =========================================================

  // const startMockExecution = (conversationId) => {
  //   const stages = [
  //     {
  //       id: "supervisor",
  //       title: "Supervisor",
  //       subtitle: "Processing task",
  //       status: "running",
  //     },
  //     {
  //       id: "planner",
  //       title: "Planner",
  //       subtitle: "Waiting to execute",
  //       status: "waiting",
  //     },
  //     {
  //       id: "research",
  //       title: "Research Agent",
  //       subtitle: "Waiting to execute",
  //       status: "waiting",
  //     },
  //     {
  //       id: "evaluator",
  //       title: "Evaluator",
  //       subtitle: "Waiting to execute",
  //       status: "waiting",
  //     },
  //     {
  //       id: "synthesizer",
  //       title: "Synthesizer",
  //       subtitle: "Waiting to execute",
  //       status: "waiting",
  //     },
  //   ];

  //   // One execution start time.
  //   // All event timestamps are calculated from this.
  //   const executionStart = Date.now();

  //   const createEvent = (event, offset) => ({
  //     id: crypto.randomUUID(),
  //     time: new Date(executionStart + offset).toLocaleTimeString(),
  //     event,
  //   });


  //   // =========================================================
  //   // START EXECUTION
  //   // =========================================================

  //   setConversations((prev) =>
  //     prev.map((conversation) =>
  //       conversation.id === conversationId
  //         ? {
  //             ...conversation,

  //             isExecuting: true,

  //             pipeline: stages,

  //             eventLogs: [
  //               createEvent("Supervisor started", 0),
  //             ],
  //           }
  //         : conversation
  //     )
  //   );


  //   // =========================================================
  //   // SUPERVISOR → PLANNER
  //   // =========================================================

  //   setTimeout(() => {
  //     setConversations((prev) =>
  //       prev.map((conversation) => {
  //         if (conversation.id !== conversationId)
  //           return conversation;

  //         return {
  //           ...conversation,

  //           pipeline: conversation.pipeline.map((stage) => {
  //             if (stage.id === "supervisor") {
  //               return {
  //                 ...stage,
  //                 subtitle: "Task analyzed",
  //                 status: "completed",
  //               };
  //             }

  //             if (stage.id === "planner") {
  //               return {
  //                 ...stage,
  //                 subtitle: "Creating execution plan",
  //                 status: "running",
  //               };
  //             }

  //             return stage;
  //           }),

  //           eventLogs: [
  //             ...conversation.eventLogs,

  //             createEvent("Supervisor completed", 1500),
  //             createEvent("Planner started", 1500),
  //           ],
  //         };
  //       })
  //     );
  //   }, 1500);


  //   // =========================================================
  //   // PLANNER → RESEARCH
  //   // =========================================================

  //   setTimeout(() => {
  //     setConversations((prev) =>
  //       prev.map((conversation) => {
  //         if (conversation.id !== conversationId)
  //           return conversation;

  //         return {
  //           ...conversation,

  //           pipeline: conversation.pipeline.map((stage) => {
  //             if (stage.id === "planner") {
  //               return {
  //                 ...stage,
  //                 subtitle: "Execution plan created",
  //                 status: "completed",
  //               };
  //             }

  //             if (stage.id === "research") {
  //               return {
  //                 ...stage,
  //                 subtitle: "Searching relevant sources",
  //                 status: "running",
  //               };
  //             }

  //             return stage;
  //           }),

  //           eventLogs: [
  //             ...conversation.eventLogs,

  //             createEvent("Planner completed", 3000),
  //             createEvent("Research Agent started", 3000),
  //           ],
  //         };
  //       })
  //     );
  //   }, 3000);


  //   // =========================================================
  //   // RESEARCH → EVALUATOR
  //   // =========================================================

  //   setTimeout(() => {
  //     setConversations((prev) =>
  //       prev.map((conversation) => {
  //         if (conversation.id !== conversationId)
  //           return conversation;

  //         return {
  //           ...conversation,

  //           pipeline: conversation.pipeline.map((stage) => {
  //             if (stage.id === "research") {
  //               return {
  //                 ...stage,
  //                 subtitle: "Research completed",
  //                 status: "completed",
  //               };
  //             }

  //             if (stage.id === "evaluator") {
  //               return {
  //                 ...stage,
  //                 subtitle: "Evaluating results",
  //                 status: "running",
  //               };
  //             }

  //             return stage;
  //           }),

  //           eventLogs: [
  //             ...conversation.eventLogs,

  //             createEvent("Research Agent completed", 5000),
  //             createEvent("Evaluator started", 5000),
  //           ],
  //         };
  //       })
  //     );
  //   }, 5000);


  //   // =========================================================
  //   // EVALUATOR → SYNTHESIZER
  //   // =========================================================

  //   setTimeout(() => {
  //     setConversations((prev) =>
  //       prev.map((conversation) => {
  //         if (conversation.id !== conversationId)
  //           return conversation;

  //         return {
  //           ...conversation,

  //           pipeline: conversation.pipeline.map((stage) => {
  //             if (stage.id === "evaluator") {
  //               return {
  //                 ...stage,
  //                 subtitle: "Evaluation completed",
  //                 status: "completed",
  //               };
  //             }

  //             if (stage.id === "synthesizer") {
  //               return {
  //                 ...stage,
  //                 subtitle: "Generating final response",
  //                 status: "running",
  //               };
  //             }

  //             return stage;
  //           }),

  //           eventLogs: [
  //             ...conversation.eventLogs,

  //             createEvent("Evaluator completed", 7000),
  //             createEvent("Synthesizer started", 7000),
  //           ],
  //         };
  //       })
  //     );
  //   }, 7000);


  //   // =========================================================
  //   // EXECUTION COMPLETE
  //   // =========================================================

  //   setTimeout(() => {
  //     setConversations((prev) =>
  //       prev.map((conversation) => {
  //         if (conversation.id !== conversationId)
  //           return conversation;

  //         return {
  //           ...conversation,

  //           isExecuting: false,

  //           pipeline: conversation.pipeline.map((stage) => {
  //             if (stage.id === "synthesizer") {
  //               return {
  //                 ...stage,
  //                 subtitle: "Final response ready",
  //                 status: "completed",
  //               };
  //             }

  //             return stage;
  //           }),

  //           eventLogs: [
  //             ...conversation.eventLogs,

  //             createEvent("Synthesizer completed", 9000),
  //             createEvent("Execution completed", 9000),
  //           ],
  //         };
  //       })
  //     );
  //   }, 9000);
  // };


  // =========================================================
  // SEND MESSAGE
  // =========================================================
const sendMessageToBackend = async (conversationId, message) => {
  try {
    return await sendChatMessage(conversationId, message);
  } catch (error) {
    console.error("BACKEND ERROR:", error);
    alert(error.message || "Failed to connect to DYNAMO backend.");
    return null;
  }
};


const trackExecution = async (conversationId, executionId) => {
  try {
    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === conversationId
          ? { ...conversation, isExecuting: true }
          : conversation
      )
    );

    let execution;

    // Poll the actual backend until it finishes.
    while (true) {
      execution = await getExecutionStatus(executionId);

      const events = await getExecutionEvents(executionId);
        
const realPipeline = [
  {
    id: "orchestrator",
    title: "Orchestrator",
    subtitle: "Coordinates the AI workflow",
    status: "completed",
  },
  ...[
    ...new Map(
      events
        .filter((event) => event.agent !== "orchestrator")
        .map((event) => [event.agent, event])
    ).values(),
  ].map((event) => ({
    id: event.agent,
    title: event.agent.replaceAll("_", " "),
    subtitle: event.event.replaceAll("_", " "),
    status: event.status,
  })),
];

      setConversations((prev) =>
        prev.map((conversation) =>
          conversation.id === conversationId
            ? {
                ...conversation,
                pipeline: realPipeline,
                eventLogs: events.map((event) => ({
                  id: event.id,
                  time: new Date(event.timestamp).toLocaleTimeString(),
                  event: `${event.agent}: ${event.event} (${event.status})`,
                })),
              }
            : conversation
        )
      );

      if (["completed", "failed"].includes(execution.status)) {
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    if (execution.status === "completed" && execution.final_response) {
      setConversations((prev) =>
        prev.map((conversation) =>
          conversation.id === conversationId
            ? {
                ...conversation,
                messages: [
                  ...conversation.messages,
                  {
                    id: crypto.randomUUID(),
                    sender: "assistant",
                    text: execution.final_response,
                  },
                ],
                isExecuting: false,
              }
            : conversation
        )
      );
    } else {
      throw new Error(
        execution.final_response || "AI execution failed."
      );
    }

    // Load the final event list once more.
    const finalEvents = await getExecutionEvents(executionId);

    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === conversationId
          ? {
              ...conversation,
              eventLogs: finalEvents.map((event) => ({
                id: event.id,
                time: new Date(event.timestamp).toLocaleTimeString(),
                event: `${event.agent}: ${event.event} (${event.status})`,
              })),
              isExecuting: false,
            }
          : conversation
      )
    );
  } catch (error) {
    console.error("EXECUTION TRACKING ERROR:", error);

    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === conversationId
          ? {
              ...conversation,
              isExecuting: false,
              eventLogs: [
                ...conversation.eventLogs,
                {
                  id: crypto.randomUUID(),
                  time: new Date().toLocaleTimeString(),
                  event: `Execution error: ${error.message}`,
                },
              ],
            }
          : conversation
      )
    );
  }
};





const handleSendMessage = async (message) => {
  if (!message.trim()) return;

  try {
    let conversationId = selectedConversationId;
    let isNewConversation = conversationId === null;

    // Create a real database conversation when starting a new chat.
    if (isNewConversation) {
      const created = await createConversation(
        message.split(" ").slice(0, 5).join(" ")
      );

      conversationId = created.id;

      const newConversation = {
        id: conversationId,
        title: created.title,
        messages: [],
        pipeline: [],
        eventLogs: [],
        isExecuting: false,
      };

      setConversations((prev) => [newConversation, ...prev]);
      setSelectedConversationId(conversationId);
    }

    // Add the user message to the UI.
    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === conversationId
          ? {
              ...conversation,
              messages: [
                ...conversation.messages,
                {
                  id: crypto.randomUUID(),
                  sender: "user",
                  text: message,
                },
              ],
            }
          : conversation
      )
    );

    // Send the message to the real backend.
    const response = await sendMessageToBackend(
      conversationId,
      message
    );

    if (response) {
  trackExecution(conversationId, response.execution_id);
}
  } catch (error) {
    console.error("CHAT ERROR:", error);
    alert(error.message || "Unable to start this conversation.");
  }
};





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