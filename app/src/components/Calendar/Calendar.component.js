import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import events from './events'
import Wrapper from './Calendar.wrapper'

const localizer = momentLocalizer(moment)
Date.prototype.addDays = function(days) {
  this.setDate(this.getDate() + parseInt(days));
  return this;
};

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'red',
    },
  })

export default class MyCalendar extends React.Component<MainPageProps, MainPageState> {
render(){
  const { events } = this.props;

  console.log(this.props.events);
  
  return(
  <Wrapper>
    <Calendar
      localizer={localizer}
      events={this.props.events}
      views={['month']}
      startAccessor="start"
      endAccessor="end"
      // defaultDate={new Date().addDays(5)}
      components={{
        timeSlotWrapper: ColoredDateCellWrapper,
      }}
    />
  </Wrapper>
  );
}

}