from pydantic import BaseModel, Field
from typing import List

class SpawnManifest(BaseModel):
    selected_agents: List[str] = Field(
        description="A list of specialized agents required to solve the user_query. "
                    "Allowed values are: "
                    "'quant_agent' (for numbers, pricing, margins), "
                    "'sentiment_agent' (for news, public mood, social media), "
                    "'sec_research_agent' (for deep fundamental SEC filing research like 10-K/10-Q), "
                    "'macro_agent' (for global economic/geopolitical events). "
                    "Only select the agents strictly necessary for this specific query."
    )
    reasoning: str = Field(
        description="A brief, one-sentence explanation of why these specific agents were chosen based on the user_query."
    )