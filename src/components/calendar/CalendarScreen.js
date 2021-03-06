import React, { useEffect, useState } from 'react';
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
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';
import { prepareEventForRedux, prepareEventsForCalendar } from '../../helpers/prepareEvents';


moment.locale('es');

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {

  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(state => state.calendar);
  const { uid } = useSelector(state => state.auth);

  const eventos = prepareEventsForCalendar(events);

  const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' );

  useEffect(() => {
    dispatch( eventStartLoading() )
  }, [dispatch])

  const onDoubleClick = () => {
    dispatch( uiOpenModal() );
  }

  const onSelect = (e) => {
    const event = prepareEventForRedux( e );
    dispatch( eventSetActive(event));
  }

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  }

  const onSelectSlot = () => {
    dispatch( eventClearActiveEvent())
  }

  const eventStyleGetter = ( event ) => {
    const style = {
      backgroundColor: (uid === event.user._id) ? '#367CF7' : '#465660',
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
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        messages={ messages }
        eventPropGetter={ eventStyleGetter }
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChange }
        onSelectSlot={ onSelectSlot }
        selectable={ true }
        view={ lastView }
        components={{
          event: CalendarEvent
        }}
      />

      <AddNewFab />
      {
        activeEvent && <DeleteEventFab />
      }

      <CalendarModal />
    </div>
  )
}
