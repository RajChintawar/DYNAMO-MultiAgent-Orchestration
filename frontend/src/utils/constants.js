import {
    Brain,
    ListChecks,
    Search,
    BarChart3,
    ShieldCheck,
    Sparkles,
} from "lucide-react";

export const PIPELINE_STAGES = [

    {
        id: "supervisor",
        title: "Supervisor",
        subtitle: "Analyze Goal",
        icon: Brain,
        status: "completed",
    },

    {
        id: "planner",
        title: "Planner",
        subtitle: "Create Execution Plan",
        icon: ListChecks,
        status: "completed",
    },

    {
        id: "research",
        title: "Research Agent",
        subtitle: "Waiting...",
        icon: Search,
        status: "running",
    },

    {
        id: "analysis",
        title: "Analysis Agent",
        subtitle: "Waiting...",
        icon: BarChart3,
        status: "waiting",
    },

    {
        id: "evaluation",
        title: "Evaluator",
        subtitle: "Waiting...",
        icon: ShieldCheck,
        status: "waiting",
    },

    {
        id: "synthesis",
        title: "Synthesizer",
        subtitle: "Waiting...",
        icon: Sparkles,
        status: "waiting",
    }

];