import React, { Component } from 'react';
import styled from 'styled-components';
import { Interval } from '../utils/IntervalHelpers';
import DayCell from './DayCell';

export interface DayColumnProps {
    colPos: number;
    dayIntervals: Interval[];
    cellHeight: number;
}

const DayColumnWrapper = styled.div`
    flex: 1 1 0%;
    border-right: 1px solid rgb(218, 220, 224);
    min-width: 81px;
`;

const DayCellWrapper = styled.div<{ height: number }>`
    border-top: 1px solid #dadce0;
    height: ${(props) => props.height}px;
`;

class DayColumn extends Component<DayColumnProps> {
    render() {
        const { cellHeight, colPos, dayIntervals } = this.props;

        const dayCells = dayIntervals.map((_, rowPos) => (
            <DayCellWrapper height={cellHeight} key={rowPos}>
                <DayCell />
            </DayCellWrapper>
        ));

        return <DayColumnWrapper data-colpos={colPos}>{dayCells}</DayColumnWrapper>;
    }
}

export default DayColumn;
