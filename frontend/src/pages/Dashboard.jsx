import "../styles/dashboard.css";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import Pipeline from "../components/Pipeline";
import EventLog from "../components/EventLog";

const Dashboard = () => {
  return (
    <div className="dashboard">

      <div className="sidebar">
        <Sidebar />
      </div>

      <div className="chat">
        <ChatWindow />
      </div>

      <div className="rightPanel">
        <Pipeline />
        <EventLog />
      </div>

    </div>
  );
};

export default Dashboard;