import dayjs, { Dayjs } from 'dayjs';
import React, { Component } from 'react';
import { getIntervalsByDuration, getNumberOfCells, Interval } from '../utils/IntervalHelpers';
import CalendarHeader, { ColumnsDimension } from '../components/CalendarHeader';
import EventChip, { EventChipProps } from '../components/EventChip';
import ScaleColumn from '../components/ScaleColumn';
import CalendarBody from '../components/CalendarBody';

interface WeekViewProps {
    firstDay: Dayjs;
    numberOfDays: number;
    scaleHeaderTitle: string;
    startTime: Dayjs;
    endTime: Dayjs;
    scaleUnit: number;
    scaleFormat: string;
    cellHeight: number;
    selectedIntervals: EventChipProps[];
    eventSpacing: number;
}

interface WeekViewState {
    columnDimensions: Array<ColumnsDimension>;
    startTime: Dayjs;
    endTime: Dayjs;
    scaleUnit: number;
    scaleIntervals: Interval[];
}

const defaultProps: WeekViewProps = {
    firstDay: dayjs().startOf('week'),
    numberOfDays: 7,
    scaleHeaderTitle: '',
    startTime: dayjs().startOf('day'),
    endTime: dayjs().endOf('day'),
    scaleUnit: 60,
    scaleFormat: 'h A',
    cellHeight: 49,
    selectedIntervals: [],
    eventSpacing: 15,
};

class WeekView extends Component<WeekViewProps, WeekViewState> {
    static defaultProps = defaultProps;
    constructor(props: WeekViewProps) {
        super(props);
        const { scaleUnit, startTime, endTime } = props;
        const scaleIntervals = getIntervalsByDuration(scaleUnit, startTime, endTime);

        this.state = {
            scaleIntervals,
            startTime,
            endTime,
            scaleUnit,
            columnDimensions: [],
        };
    }

    componentDidMount() {
        this.calculateColumnDimension();
        window.addEventListener('resize', this.calculateColumnDimension);
    }

    static getDerivedStateFromProps(nextProps: WeekViewProps, prevState: WeekViewState) {
        if (
            nextProps.scaleUnit !== prevState.scaleUnit ||
            nextProps.startTime !== prevState.startTime ||
            nextProps.endTime !== prevState.endTime
        ) {
            const scaleIntervals = getIntervalsByDuration(
                nextProps.scaleUnit,
                nextProps.startTime,
                nextProps.endTime,
            );
            return {
                scaleUnit: nextProps.scaleUnit,
                startTime: nextProps.startTime,
                endTime: nextProps.endTime,
                scaleIntervals,
            };
        }
        return null;
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.calculateColumnDimension);
    }

    calculateColumnDimension = () => {
        const { numberOfDays } = this.props;
        const columnDimensions: Array<ColumnsDimension> = [];

        for (let i = 0; i < numberOfDays; i++) {
            const columnElement = document.querySelectorAll<HTMLElement>(`[data-colpos='${i}']`)[0];
            if (!columnElement) {
                return null;
            }
            const { offsetWidth, offsetLeft } = columnElement;
            columnDimensions.push({
                left: offsetLeft,
                width: offsetWidth,
            });
        }
        this.setState({ columnDimensions });
    };

    renderSelectedIntervals() {
        const { firstDay, numberOfDays, cellHeight, scaleUnit, selectedIntervals, eventSpacing } =
            this.props;
        const { columnDimensions, scaleIntervals } = this.state;
        const result: JSX.Element[] = [];
        if (columnDimensions.length === 0 || selectedIntervals.length === 0) {
            return result;
        }

        for (let dayIndex = 0; dayIndex < numberOfDays; dayIndex += 1) {
            const day = dayjs(firstDay).startOf('day').add(dayIndex, 'day');
            const intervals = selectedIntervals.filter(
                (interval) => interval.start.isSame(day, 'day') || interval.end.isSame(day, 'day'),
            );
            if (intervals.length > 0) {
                intervals.sort((i1, i2) => i1.start.diff(i2.start, 'minutes'));

                intervals.forEach((interval, index, array) => {
                    let startY = 0;
                    if (!interval.start.isBefore(day)) {
                        startY = getNumberOfCells(interval.start, scaleUnit);
                    }

                    if (startY > scaleIntervals.length) {
                        return;
                    }

                    const beforeIntersectionNumber = array.filter(
                        (i, i1) => i1 < index && interval.start.isBefore(i.end),
                    ).length;
                    const afterIntersectionNumber = array.filter(
                        (i, i1) => i1 > index && interval.end.isAfter(i.start),
                    ).length;
                    const groupIntersection =
                        beforeIntersectionNumber + afterIntersectionNumber + 1;

                    let endY = getNumberOfCells(interval.end, scaleUnit);
                    if (endY > scaleIntervals.length) {
                        endY = scaleIntervals.length;
                    }
                    const top = startY * (cellHeight + 1); // 1px border
                    const width =
                        (columnDimensions[dayIndex].width - eventSpacing) / groupIntersection;

                    const left =
                        columnDimensions[dayIndex].left +
                        (width + Math.floor(eventSpacing / groupIntersection)) *
                            beforeIntersectionNumber;
                    const height = (endY - startY) * (cellHeight + 1); // 1px border
                    const eventDimensions = {
                        top,
                        left,
                        width,
                        height,
                    };
                    const eventComponent = (
                        <EventChip
                            dimensions={eventDimensions}
                            key={dayIndex * 20000 + index}
                            {...interval}
                        />
                    );
                    result.push(eventComponent);
                });
            }
        }
        return result;
    }
    render() {
        const { firstDay, numberOfDays, scaleUnit, scaleFormat, cellHeight, scaleHeaderTitle } =
            this.props;

        return (
            <div className="weekCalendar">
                <div className="weekCalendar__scaleHeader">
                    <span>{scaleHeaderTitle}</span>
                </div>
                <div
                    className="weekCalendar__header"
                    style={{ paddingBottom: '16px', marginLeft: '38px' }}
                >
                    <CalendarHeader firstDay={firstDay} numberOfDays={numberOfDays} />
                </div>
                <div
                    className="weekCalendar__scaleColumn"
                    style={{
                        display: 'flex',
                        textAlign: 'right',
                        zIndex: 2,
                        position: 'absolute',
                        paddingRight: '8px',
                        backgroundColor: 'white',
                    }}
                >
                    <ScaleColumn
                        cellHeight={this.props.cellHeight}
                        scaleFormat={scaleFormat}
                        scaleIntervals={this.state.scaleIntervals}
                        scaleUnit={this.props.scaleUnit}
                    />
                </div>
                <div
                    className="weekCalendar__content"
                    style={{ position: 'relative', marginLeft: '38px' }}
                >
                    <CalendarBody
                        cellHeight={cellHeight}
                        firstDay={firstDay}
                        numberOfDays={numberOfDays}
                        scaleIntervals={this.state.scaleIntervals}
                        scaleUnit={scaleUnit}
                    />
                    {this.renderSelectedIntervals()}
                </div>
            </div>
        );
    }
}

export default WeekView;
