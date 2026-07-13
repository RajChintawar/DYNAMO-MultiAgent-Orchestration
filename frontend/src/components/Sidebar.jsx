import { Plus } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="sidebarContainer">

      <div className="sidebarHeader">
        <h2>DYNAMO</h2>

        <button className="newChatBtn">
          <Plus size={18}/>
          New Conversation
        </button>
      </div>

      <div className="conversationList">

        <div className="conversationItem active">
          Compare AWS vs Azure
        </div>

        <div className="conversationItem">
          Build AI Resume Analyzer
        </div>

        <div className="conversationItem">
          Market Research Agent
        </div>

      </div>

    </div>
  );
};

export default Sidebar;