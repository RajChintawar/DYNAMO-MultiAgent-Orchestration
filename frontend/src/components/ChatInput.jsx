import { useState } from "react";
import { Send } from "lucide-react";

const ChatInput = ({ handleSendMessage }) => {

    const [input, setInput] = useState("");

    const send = () => {

        if (!input.trim()) return;

        handleSendMessage(input);

        setInput("");

    };

    return (

        <div className="chatInputContainer">

            <input

                value={input}

                onChange={(e)=>setInput(e.target.value)}

                onKeyDown={(e)=>{

                    if(e.key==="Enter"){

                        send();

                    }

                }}

                placeholder="Describe your goal..."

            />

            <button onClick={send}>

                <Send size={18}/>

            </button>

        </div>

    );

};

export default ChatInput;