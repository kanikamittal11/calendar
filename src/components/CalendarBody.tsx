import dayjs, { Dayjs } from 'dayjs';
import React, { Component } from 'react';
import styled from 'styled-components';
import { getDayIntervals, Interval } from '../utils/IntervalHelpers';
import DayColumn from './DayColumn';

export interface ContentProps {
    firstDay: Dayjs;
    numberOfDays: number;
    scaleUnit: number;
    scaleIntervals: Interval[];
    cellHeight: number;
}

const ContainerStyled = styled.div`
    position: relative;
`;

class CalendarBody extends Component<ContentProps> {
    shouldComponentUpdate(nextProps: ContentProps) {
        return (
            nextProps.scaleUnit !== this.props.scaleUnit ||
            nextProps.cellHeight !== this.props.cellHeight ||
            nextProps.numberOfDays !== this.props.numberOfDays ||
            !nextProps.firstDay.isSame(this.props.firstDay, 'day')
        );
    }

    render() {
        const { firstDay, numberOfDays, scaleIntervals, cellHeight } = this.props;

        const weekdayColumns = [];
        for (let i = 0; i < numberOfDays; i += 1) {
            const day = dayjs(firstDay).add(i, 'd');
            const intervals = getDayIntervals(day, scaleIntervals);
            weekdayColumns.push(
                <DayColumn cellHeight={cellHeight} colPos={i} dayIntervals={intervals} key={i} />,
            );
        }

        return (
            <ContainerStyled>
                <div style={{ display: 'flex' }}>{weekdayColumns}</div>
            </ContainerStyled>
        );
    }
}

export default CalendarBody;
