from typing import TypedDict, Annotated, List
import operator

class DynamoState(TypedDict):
    # The original financial/research query from the user
    user_query: str
    
    # Deep Research Context (e.g., uploaded PDFs, long text constraints)
    research_context: str
    
    # The dynamic list of agents the Orchestrator decides to spawn
    # Example: ["quant_agent", "sec_research_agent"]
    spawn_manifest: List[str]
    
    # Annotated + operator.add ensures that when parallel agents finish concurrently, 
    # they append their findings safely without overwriting each other.
    agent_findings: Annotated[List[dict], operator.add]
    
    # The final consolidated deep research report
    final_report: str
    
    # Token Tracking (CRUCIAL FOR YOUR IEEE BENCHMARKING)
    total_tokens_used: int