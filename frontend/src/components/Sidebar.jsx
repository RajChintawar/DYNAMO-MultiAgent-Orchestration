import { Plus } from "lucide-react";

const Sidebar = ({
    conversations,
    selectedConversationId,
    setSelectedConversationId,
    handleNewConversation,
}) => {
  return (
    <div className="sidebarContainer">

      <div className="sidebarHeader">

        <h2>DYNAMO</h2>

        <button
    className="newChatBtn"
    onClick={handleNewConversation}
>
          <Plus size={18} />
          New Conversation
        </button>

      </div>

      <div className="conversationList">

        {conversations.map((conversation) => (

          <div
            key={conversation.id}
            className={`conversationItem ${
              selectedConversationId === conversation.id ? "active" : ""
            }`}
            onClick={() => setSelectedConversationId(conversation.id)}
          >

            {conversation.title}

          </div>

        ))}

      </div>

    </div>
  );
};

export default Sidebar;