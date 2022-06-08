import moment from 'moment';

export const prepareEventsForMongo = (events = []) => {
    return events.map( e => (prepareEventForMongo(e)) );
};

export const prepareEventsForCalendar = (events = []) => {
    return events.map( e => ( prepareEventForCalendar(e)) );
};

export const prepareEventForMongo = (event = {}) => {
    return {
        ...event,
        start: moment(event.start).toDate().toISOString(),
        end: moment(event.end).toDate().toISOString(),
    }
};

export const prepareEventForCalendar = (event = {}) => {
    return {
        ...event,
        start: moment(event.start).toDate(),
        end: moment(event.end).toDate(),
    }
};