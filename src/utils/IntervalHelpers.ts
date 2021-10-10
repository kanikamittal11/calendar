import dayjs, { Dayjs } from 'dayjs';

export interface Interval {
    start: Dayjs;
    end: Dayjs;
}

export const getNumberOfCells = (time: Dayjs, duration: number, offset = 0) => {
    const midnight = dayjs(time).startOf('day').add(offset, 'm');
    const result = time.diff(midnight, 'm') / duration;
    if (result < 0) {
        return 0;
    }
    return result;
};

export const getIntervalsByDuration = (
    duration: number,
    startTime: Dayjs,
    endTime: Dayjs,
): { start: Dayjs; end: Dayjs }[] => {
    const startIndex = Math.floor(getNumberOfCells(startTime, duration));
    const endIndex = Math.ceil(getNumberOfCells(endTime, duration));
    let start = dayjs()
        .startOf('day')
        .add(duration * startIndex, 'm');
    let end;
    const result = [];

    for (let i = startIndex; i < endIndex; i++) {
        end = start.add(duration, 'm');
        const interval = {
            start,
            end,
        };
        result.push(interval);
        start = end;
    }
    let lastElement = result.pop();
    if (!lastElement) {
        return result;
    }
    if (lastElement.end.format('HH:mm') === '00:00') {
        lastElement = {
            start: lastElement.start,
            end: dayjs().endOf('day'),
        };
    }
    result.push(lastElement);
    return result;
};

export const getDayIntervals = (day: Dayjs, scaleIntervals: Interval[]) => {
    return scaleIntervals.map((scaleInterval) => {
        const start = dayjs(day)
            .hour(scaleInterval.start.hour())
            .minute(scaleInterval.start.minute())
            .second(0);
        const end = dayjs(day)
            .hour(scaleInterval.end.hour())
            .minute(scaleInterval.end.minute())
            .second(0);
        return {
            start,
            end,
        };
    });
};

export const getIntervals = (start: Dayjs, end: Dayjs) => {
    const diffDays = end.diff(start, 'days');
    const result = [];

    for (let i = 0; i <= diffDays; i += 1) {
        const startInterval = dayjs(start).add(i, 'day');
        const endInterval = dayjs(start)
            .add(i, 'day')
            .hour(end.hour())
            .minute(end.minute())
            .second(0);
        result.push({
            start: startInterval,
            end: endInterval,
        });
    }

    return result;
};
