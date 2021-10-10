import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useParams } from 'react-router';
import WeekView from './WeekView';
import { EventChipProps } from '../components/EventChip';
import { connect } from '../storage/schema';

function Dashboard() {
    const [events, setEvents] = useState<EventChipProps[]>();
    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) {
            calendarEvents();
        }
        return () => {
            isSubscribed = false;
        };
    }, []);

    const calendarEvents = async () => {
        const table = await connect();
        const mappedEvents: EventChipProps[] = table.map((obj) => {
            const { title, start, end } = obj as EventChipProps;
            return { title, start: dayjs(start), end: dayjs(end) };
        });
        setEvents(mappedEvents);
    };
    const { firstDay } = useParams();
    return <WeekView firstDay={dayjs(firstDay)} selectedIntervals={events} />;
}

export default Dashboard;
