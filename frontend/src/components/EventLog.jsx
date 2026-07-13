const logs = [

    {
        time:"14:32:11",
        event:"Supervisor started"
    },

    {
        time:"14:32:13",
        event:"Goal classified as Research"
    },

    {
        time:"14:32:18",
        event:"Planner created 5 tasks"
    },

    {
        time:"14:32:24",
        event:"Research Agent started"
    }

];

const EventLog = () => {

    return (

        <div className="eventLog">

            <div className="eventHeader">

                <h2>Execution Log</h2>

            </div>

            <div className="eventBody">

                {

                    logs.map((log,index)=>(

                        <div
                            className="eventItem"
                            key={index}
                        >

                            <span className="eventTime">

                                {log.time}

                            </span>

                            <span className="eventText">

                                {log.event}

                            </span>

                        </div>

                    ))

                }

            </div>

        </div>

    );

};

export default EventLog;