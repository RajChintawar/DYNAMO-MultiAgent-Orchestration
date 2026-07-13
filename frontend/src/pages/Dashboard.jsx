import "../styles/dashboard.css";

import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import Pipeline from "../components/Pipeline";
import EventLog from "../components/EventLog";

const Dashboard = () => {
  return (
    <div className="dashboard">

      <aside className="sidebar">
        <Sidebar />
      </aside>

      <main className="mainContent">
        <ChatWindow />
      </main>

      <aside className="rightPanel">
        <div className="pipelineContainer">
          <Pipeline />
        </div>

        <div className="eventContainer">
          <EventLog />
        </div>
      </aside>

    </div>
  );
};

export default Dashboard;