import React, { Component } from 'react';
import styled from 'styled-components';
import { Interval } from '../utils/IntervalHelpers';

export interface ScaleColumnProps {
    scaleUnit: number;
    scaleFormat: string;
    scaleIntervals: Interval[];
    cellHeight: number;
}

const ScaleCellWrapper = styled.div<{ cellHeight: number }>`
    height: ${(props) => props.cellHeight + 1 /** for border-bottom */}px;
`;

const ScaleCell = styled.div`
    color: #70757a;
    font-size: 10px;
    position: relative;
    top: -7px;
`;

class ScaleColumn extends Component<ScaleColumnProps> {
    shouldComponentUpdate(nextProps: ScaleColumnProps) {
        return (
            nextProps.scaleUnit !== this.props.scaleUnit ||
            nextProps.cellHeight !== this.props.cellHeight
        );
    }

    renderScaleCell(scaleInterval: Interval, index: number) {
        const { cellHeight, scaleFormat } = this.props;
        return (
            <ScaleCellWrapper cellHeight={cellHeight} key={index}>
                <ScaleCell>{scaleInterval.start.format(scaleFormat)}</ScaleCell>
            </ScaleCellWrapper>
        );
    }

    render() {
        const { scaleIntervals } = this.props;
        return (
            <div>
                {scaleIntervals.map((scaleInterval, index) =>
                    this.renderScaleCell(scaleInterval, index),
                )}
            </div>
        );
    }
}

export default ScaleColumn;
