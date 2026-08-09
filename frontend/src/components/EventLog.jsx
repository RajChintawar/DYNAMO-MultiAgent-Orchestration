import { useEffect, useRef } from "react";

const EventLog = ({ eventLogs }) => {

  const eventBodyRef = useRef(null);

  useEffect(() => {

    const container = eventBodyRef.current;

    if (!container) return;

    container.scrollTop = container.scrollHeight;

  }, [eventLogs]);

  return (

    <div className="eventLog">

      <div className="eventHeader">
        <h2>Execution Log</h2>
      </div>

      <div
        className="eventBody"
        ref={eventBodyRef}
      >

        {eventLogs.length === 0 ? (

          <div className="eventEmpty">
            Execution events will appear here.
          </div>

        ) : (

          eventLogs.map((log) => (

            <div
              className="eventItem"
              key={log.id}
            >

              <span className="eventTime">
                {log.time}
              </span>

              <span className="eventText">
                {log.event}
              </span>

            </div>

          ))

        )}

      </div>

    </div>

  );

};

export default EventLog;