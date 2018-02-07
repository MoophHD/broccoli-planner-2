import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import baseColors from '../../../../../constants/colors';

const colors = {
    ...baseColors,
    green: "#A1FF84",
    red: "#FF84A1",
    yellow: "#FFF184",
    purple: "#E284FF",
}

function getBgColor(value) {
    value = parseInt(value);
    const { red, green, yellow, purple } = colors;
    switch (value) {
        case 3: {
            return red
        }
        case 2: {
            return yellow
        }
        case 1: {
            return green
        }
        default: {
            return purple;
        }
    }
}

const side = 20;
const fontSize = 1.15;

const Wrapper = styled.div`
    padding: 2.5px;
`

const Square = styled.div`
    height: ${side}px;
    width: ${side}px;
    background-color: ${props => props.active ? 'white' : getBgColor(props.value)};
    transform: rotate(45deg);
    display: flex;
    align-items: center;
    justify-content: center;
`

const TextValue = styled.span`
    color: ${props => props.active || props.value == 2  ? colors.darkgrey : colors.white };
    transform: rotate(-45deg);
    font-size: ${fontSize}em;
    font-weight: 300;
`

const ValueIndicator = ({ value, isActive }) => (
    <Wrapper>
        <Square active={isActive} value={value}>
            <TextValue active={isActive}  value={value}>{ value }</TextValue>
        </Square>
    </Wrapper>
)

ValueIndicator.PropTypes = {
    value: PropTypes.number,
    isActive: PropTypes.bool
}

export default ValueIndicator;