import dayjs, { Dayjs } from 'dayjs';
import React, { PureComponent } from 'react';
import styled from 'styled-components';

export interface HeaderCellProps {
    date: Dayjs;
}

const DayStyled = styled.div<{ active: boolean }>`
    line-height: 32px;
    position: relative;
    color: #70757a;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.8px;
    margin-left: 0;
    text-indent: 0.8px;
    ${({ active }) =>
        active &&
        `
color: #1a73e8;
`};
`;

const DateStyled = styled.div<{ active: boolean }>`
    color: #3c4043;
    font-size: 26px;
    height: 46px;
    margin-left: auto;
    margin-right: auto;
    margin-top: -8px;
    display: flex;
    width: 46px;
    border-radius: 100%;
    flex-direction: column;
    justify-content: center;
    ${({ active }) =>
        active &&
        `
background-color: #1a73e8;
color: white;
`};
`;

class HeaderCell extends PureComponent<HeaderCellProps> {
    render() {
        const { date } = this.props;
        const active = dayjs().isSame(date, 'date');
        return (
            <div>
                <DayStyled active={active}>{date.format('ddd').toUpperCase()}</DayStyled>
                <DateStyled active={active}>{date.format('D')}</DateStyled>
            </div>
        );
    }
}

export default HeaderCell;
