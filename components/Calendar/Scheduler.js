import * as React from "react";
import { Scheduler } from "@aldabil/react-scheduler";

const Schedulers = () => {
  return (
    <div className='h-full'>
      <Scheduler
        view='month'
        events={[
          {
            event_id: 1,
            title: "Event 1",
            start: new Date("2023/12/2 09:30"),
            end: new Date("2023/12/2 09:30"),
          },
          {
            event_id: 2,
            title: "Event 2",
            start: new Date("2023/12/15 10:00"),
            end: new Date("2023/12/15 11:00"),
          },
        ]}
      />
    </div>
  );
};

export default Schedulers;
