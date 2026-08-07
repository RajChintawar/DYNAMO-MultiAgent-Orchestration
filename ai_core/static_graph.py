from langgraph.graph import StateGraph, START, END
from state import DynamoState
from agents import quant_agent, sentiment_agent, sec_research_agent, macro_agent
from langchain_groq import ChatGroq
from langchain_core.messages import SystemMessage
import os
from dotenv import load_dotenv

load_dotenv()

# Initialize the LLM for the Synthesizer node
llm = ChatGroq(
    temperature=0, 
    model_name="llama3-8b-8192", 
    api_key=os.getenv("GROQ_API_KEY")
)

def synthesizer_node(state: dict):
    print("📝 [Running] Synthesis Node: Compiling Final Report...")
    findings = state.get("agent_findings", [])
    query = state.get("user_query", "")
    
    # Format the findings nicely for the LLM to read
    formatted_findings = "\n".join([f"- {f['agent']}: {f['data']}" for f in findings])
    
    prompt = (
        f"You are a Lead Financial Analyst. The user asked: '{query}'.\n"
        f"Your team of specialist agents found the following data:\n{formatted_findings}\n"
        f"Synthesize this into a cohesive, professional 2-3 paragraph financial summary."
    )
    
    response = llm.invoke([SystemMessage(content=prompt)])
    return {"final_report": response.content}

# 1. Initialize the StateGraph with our shared memory structure
workflow = StateGraph(DynamoState)

# 2. Add all the worker nodes (from agents.py) + our new synthesizer
workflow.add_node("quant_agent", quant_agent)
workflow.add_node("sentiment_agent", sentiment_agent)
workflow.add_node("sec_research_agent", sec_research_agent)
workflow.add_node("macro_agent", macro_agent)
workflow.add_node("synthesizer", synthesizer_node)

# 3. Build the STATIC sequential pipeline (Linear Flow)
workflow.add_edge(START, "quant_agent")
workflow.add_edge("quant_agent", "sentiment_agent")
workflow.add_edge("sentiment_agent", "sec_research_agent")
workflow.add_edge("sec_research_agent", "macro_agent")
workflow.add_edge("macro_agent", "synthesizer")
workflow.add_edge("synthesizer", END)

# 4. Compile the graph into an executable application
static_app = workflow.compile()