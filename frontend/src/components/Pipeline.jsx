import { PIPELINE_STAGES } from "../utils/constants";
import StageNode from "./StageNode";

const Pipeline = ({ pipeline }) => {

  return (
    <div className="pipeline">

      <h2>Execution Pipeline</h2>

      {pipeline.length === 0 ? (

        <div className="pipelineEmpty">
          Pipeline will appear when execution begins.
        </div>

      ) : (

        pipeline.map((stage, index) => (

          <StageNode
            key={stage.id}
            stage={stage}
            isLast={index === pipeline.length - 1}
          />

        ))

      )}

    </div>
  );
};

export default Pipeline;