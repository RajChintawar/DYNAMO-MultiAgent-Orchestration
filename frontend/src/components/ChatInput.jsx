import { Send } from "lucide-react";

const ChatInput = () => {
  return (
    <div className="chatInputContainer">

      <input
        type="text"
        placeholder="Describe your task..."
      />

      <button>
        <Send size={18}/>
      </button>

    </div>
  );
};

export default ChatInput;