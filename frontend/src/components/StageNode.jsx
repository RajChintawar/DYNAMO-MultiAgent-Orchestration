const StageNode = ({ stage, isLast }) => {

    const Icon = stage.icon;

    return (

        <div className="stageNode">

            <div className="timeline">

                <div className={`circle ${stage.status}`}>

                    <Icon size={16}/>

                </div>

                {!isLast &&
                    <div className={`verticalLine ${stage.status}`}></div>
                }

            </div>

<div className={`stageContent ${stage.status}`}>
                <h4>{stage.title}</h4>

                <p>{stage.subtitle}</p>

            </div>

        </div>

    );

};

export default StageNode;