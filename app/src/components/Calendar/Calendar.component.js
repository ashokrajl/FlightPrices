import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import Wrapper from './Calendar.wrapper'

const localizer = momentLocalizer(moment)
Date.prototype.addDays = function(days) {
  this.setDate(this.getDate() + parseInt(days));
  return this;
};

export default class MyCalendar extends React.Component<CalendarProps, CalendarState> {
render(){
  const { events } = this.props;
  
  return(
  <Wrapper>
    <Calendar
      localizer={localizer}
      events={events}
      views={['month']}
      startAccessor="start"
      endAccessor="end"
      defaultDate={new Date().addDays(20)}
    />
  </Wrapper>
  );
}

}