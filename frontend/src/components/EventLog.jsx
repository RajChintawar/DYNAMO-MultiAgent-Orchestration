import { useEffect, useRef } from "react";

const EventLog = ({
  eventLogs,
  conversationId,
  isExecuting,
}) => {

  const eventBodyRef = useRef(null);
  const previousConversationId = useRef(conversationId);
  const previousLogCount = useRef(eventLogs.length);

  // -----------------------------------------
  // CONVERSATION SWITCH
  // -----------------------------------------

  useEffect(() => {

    if (previousConversationId.current !== conversationId) {

      // Wait until the new conversation's DOM
      // has actually been rendered.
      requestAnimationFrame(() => {

        if (eventBodyRef.current) {
          eventBodyRef.current.scrollTop = 0;
        }

      });

      previousConversationId.current = conversationId;
      previousLogCount.current = eventLogs.length;

      return;
    }

    // -----------------------------------------
    // NEW EXECUTION EVENT
    // -----------------------------------------

    if (
      isExecuting &&
      eventLogs.length > previousLogCount.current
    ) {

      requestAnimationFrame(() => {

        if (eventBodyRef.current) {
          eventBodyRef.current.scrollTop =
            eventBodyRef.current.scrollHeight;
        }

      });
    }

    previousLogCount.current = eventLogs.length;

  }, [conversationId, eventLogs, isExecuting]);


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