
import sys
from pathlib import Path

# Make the copied AI package importable.
AI_ROOT = Path(__file__).resolve().parents[3] / "dynamo_ai"
if str(AI_ROOT) not in sys.path:
    sys.path.insert(0, str(AI_ROOT))

from backend.orchestrator.graph import dynamo_graph, get_empty_state


async def run_dynamo_ai(query: str, session_history: list | None = None) -> dict:
    """Run the DYNAMO multi-agent graph and return its results."""
    state = get_empty_state(query, session_history or [])
    result = await dynamo_graph.ainvoke(state)

    return {
        "report": result.get("final_report", ""),
        "policy": result.get("selected_policy", ""),
        "agents_used": result.get("spawn_manifest", {}).get("agents", []),
        "agent_outputs": result.get("agent_outputs", {}),
        "confidence": result.get("confidence_score", 0.0),
        "tokens": result.get("total_tokens", 0),
        "latency_ms": result.get("latency_ms", 0.0),
        "errors": result.get("errors", []),
    }
