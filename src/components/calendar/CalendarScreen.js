import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';


moment.locale('es');

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {

  const dispatch = useDispatch();
  const { events } = useSelector(state => state.calendar);

  const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' );

  const onDoubleClick = () => {
    dispatch( uiOpenModal() );
  }

  const onSelect = (e) => {
    dispatch( eventSetActive(e));
  }

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  }

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    console.log(event, start, end, isSelected);
    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'
    }

    return {
      style
    }
  };

  return (
    <div className='calendar__screen'>
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={ messages }
        eventPropGetter={ eventStyleGetter }
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChange }
        view={ lastView }
        components={{
          event: CalendarEvent
        }}
      />

      <AddNewFab />

      <CalendarModal />
    </div>
  )
}
