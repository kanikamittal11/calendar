import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import styled from 'styled-components';

export interface EventChipProps {
    start: Dayjs;
    end: Dayjs;
    title: string;
}

interface EventProps extends EventChipProps {
    dimensions: {
        top: number;
        left: number;
        width: number;
        height: number;
    };
}

const EventContainer = styled.div<{ inactive: boolean }>`
    position: absolute;
    z-index: 2;
    border-radius: 2px;
    background-color: rgb(99, 218, 56);
    border-color: rgb(51, 174, 6);
    ${({ inactive }) =>
        inactive &&
        `
        background-color: rgb(208, 244, 195);
        border-color: rgb(153, 215, 131);
`};
`;

const EventChipWrapper = styled.div<{ inactive: boolean }>`
    max-height: 100%;
    font-size: 12px;
    color: #3c4043;
    overflow: hidden;
    white-space: nowrap;
    padding-left: 4px;
    ${({ inactive }) =>
        inactive &&
        `
        color: rgba(32, 33, 36, 0.502);
        `};
`;

const EventTitle = styled.div`
    font-weight: 500;
`;

class EventChip extends React.PureComponent<EventProps> {
    render() {
        const { dimensions, start, end, title } = this.props;
        const eventCompleted = end.isBefore(dayjs());
        return (
            <EventContainer
                className="weekCalendar__overlay"
                inactive={eventCompleted}
                style={dimensions}
            >
                <EventChipWrapper className="event" inactive={eventCompleted}>
                    <EventTitle>{title}</EventTitle>
                    <div>{`${start.format('h:mma')} - ${end.format('h:mma')}`}</div>
                </EventChipWrapper>
            </EventContainer>
        );
    }
}

export default EventChip;
