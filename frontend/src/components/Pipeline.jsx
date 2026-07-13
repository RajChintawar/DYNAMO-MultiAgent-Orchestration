import { PIPELINE_STAGES } from "../utils/constants";
import StageNode from "./StageNode";

const Pipeline = () => {

    return (

        <div className="pipeline">

            <div className="pipelineHeader">

                <h2>Execution Pipeline</h2>

            </div>

            {
                PIPELINE_STAGES.map((stage,index)=>(

                    <StageNode

                        key={stage.id}

                        stage={stage}

                        isLast={index===PIPELINE_STAGES.length-1}

                    />

                ))
            }

        </div>

    );

};

export default Pipeline;