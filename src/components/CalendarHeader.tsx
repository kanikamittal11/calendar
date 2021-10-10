import React, { Component } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import HeaderCell from './HeaderCell';

export interface HeaderProps {
    firstDay: Dayjs;
    numberOfDays: number;
}

export interface ColumnsDimension {
    left: number;
    width: number;
}

export class CalendarHeader extends Component<HeaderProps> {
    shouldComponentUpdate(nextProps: HeaderProps) {
        return (
            nextProps.numberOfDays !== this.props.numberOfDays ||
            !nextProps.firstDay.isSame(this.props.firstDay, 'day')
        );
    }

    render() {
        const { firstDay, numberOfDays } = this.props;

        const weekdayColumns = [];

        for (let i = 0; i < numberOfDays; i += 1) {
            const date = dayjs(firstDay).add(i, 'd');
            const newCell = (
                <div key={i} style={{ minWidth: '81px', flex: 1 }}>
                    <HeaderCell date={date} />
                </div>
            );
            weekdayColumns.push(newCell);
        }

        return <div style={{ textAlign: 'center', display: 'flex' }}>{weekdayColumns}</div>;
    }
}

export default CalendarHeader;
