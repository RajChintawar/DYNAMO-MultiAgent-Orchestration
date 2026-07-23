from langchain_groq import ChatGroq
from langchain_core.messages import SystemMessage
import os
from dotenv import load_dotenv

load_dotenv()

# We use Llama 3 8B because it is lightning fast for parallel execution benchmarking
llm = ChatGroq(
    temperature=0, 
    model_name="llama3-8b-8192", 
    api_key=os.getenv("GROQ_API_KEY")
)

def quant_agent(state: dict):
    print("📈 [Running] Quant Agent...")
    prompt = f"Extract and analyze numerical/pricing data for this query: {state['user_query']}"
    response = llm.invoke([SystemMessage(content=prompt)])
    # We return the data in a dictionary format to append to 'agent_findings' in the state
    return {"agent_findings": [{"agent": "Quant", "data": response.content}]}

def sentiment_agent(state: dict):
    print("📰 [Running] Sentiment Agent...")
    prompt = f"Evaluate the news and public mood regarding this query: {state['user_query']}"
    response = llm.invoke([SystemMessage(content=prompt)])
    return {"agent_findings": [{"agent": "Sentiment", "data": response.content}]}

def sec_research_agent(state: dict):
    print("🏛️ [Running] Deep SEC Research Agent...")
    prompt = f"Perform deep fundamental research on corporate filings (10-K, 10-Q) for this query: {state['user_query']}"
    response = llm.invoke([SystemMessage(content=prompt)])
    return {"agent_findings": [{"agent": "SEC_Research", "data": response.content}]}

def macro_agent(state: dict):
    print("🌍 [Running] Macroeconomic Agent...")
    prompt = f"Identify macroeconomic and geopolitical factors for this query: {state['user_query']}"
    response = llm.invoke([SystemMessage(content=prompt)])
    return {"agent_findings": [{"agent": "Macro", "data": response.content}]}