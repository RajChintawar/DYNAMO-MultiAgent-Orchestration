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
    messages: [
    ],
    pipeline: [],
    eventLogs: [],
  },
]);

const [selectedConversationId, setSelectedConversationId] = useState(1);
// const [input, setInput] = useState("");
const selectedConversation =
    conversations.find(
        c => c.id === selectedConversationId
    ) || null;



    const handleSendMessage = (message) => {

    if (!message.trim()) return;

    // NEW CHAT
    if (selectedConversationId === null) {

        const newConversation = {

            id: crypto.randomUUID(),

            title: message.split(" ").slice(0,5).join(" "),

            messages:[
                {
                    id: crypto.randomUUID(),
                    sender:"user",
                    text:message,
                }
            ],

            pipeline:[],

            eventLogs:[],

        };

        setConversations(prev=>[
            newConversation,
            ...prev,
        ]);

        setSelectedConversationId(newConversation.id);

        return;

    }

    // EXISTING CHAT

    setConversations(prev=>

        prev.map(conversation=>{

            if(conversation.id!==selectedConversationId)
                return conversation;

            return{

                ...conversation,

                messages:[
                    ...conversation.messages,

                    {
                        id:crypto.randomUUID(),
                        sender:"user",
                        text:message,
                    }
                ]

            };

        })

    );

};







const handleStartNewChat = () => {

    setSelectedConversationId(null);

};
 
 
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
/>
        </div>
      </aside>

    </div>
  );
};

export default Dashboard;