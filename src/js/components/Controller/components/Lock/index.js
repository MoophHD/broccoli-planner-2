import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import lockIcon from './img/lock.png';
import colors from '../../../../constants/colors'

const { yellow, darkgrey } = colors;

const size = 1.5;
const LockWrapper = styled.div`
    position: absolute;
    right: 5px;
    top: 2px;
    font-size: ${size}em;
    color: ${ props => props.isLocked ? yellow : darkgrey};
`

const Lock = ({ isLocked, onClick }) => (
        <LockWrapper isLocked={isLocked} onClick={onClick}>
            <i className={`fas fa-${isLocked ? 'unlock' : 'lock'}`}></i>
        </LockWrapper>
)

export default Lock;