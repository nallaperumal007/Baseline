import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarEventHelper from "../../helper/pfmMgmt/pfCalendarEvents"

// Create a localizer for moment
const localizer = momentLocalizer(moment);

export default class MyCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tnnt_id: global.config.tnnt_id,
      username: global.config.username,
      role_id: global.config.user_role,
      events: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    const { tnnt_id, username } = this.state;

    const filter = {
      tnnt_id: tnnt_id,
      user_name: username
    };

    CalendarEventHelper.getPageDet(filter)
      .then((data) => {
        console.log(data)
        const transformedEvents = data.map(this.transformEventData);
        this.setState({ events: transformedEvents });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  transformEventData(event) {
    const startDateTime = moment(`${event.cl_date} ${event.start_time}`, "DD-MMM-YYYY HH:mm:ss").toDate();
    const endDateTime = moment(`${event.cl_date} ${event.end_time}`, "DD-MMM-YYYY HH:mm:ss").toDate();

    return {
      start: startDateTime,
      end: endDateTime,
      title: event.title,
      // 'allDay': true, // if the event is all day
    };
  }

  render() {
    const { events } = this.state;
    console.log(events)
    return (
      <div>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500,
            padding: "10px",
            borderRadius: "10px" 
            }}
        />
      </div>
    );
  }
}