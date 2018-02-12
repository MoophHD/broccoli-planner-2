import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearCurrent } from '../../actions/app.action';
import colors from '../../constants/colors'

const { lightestgrey, grey } = colors;

const Btn = styled.button`
    position: absolute;
    left: 0;
    top: 0;
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease-out;
    background-color: white;
    border: none;
    color: ${grey};
    &:hover {
        background-color: ${lightestgrey};
    }
`

const ClearButton = ({ onClear }) => (
    <Btn onClick={ onClear }>
        <i className="far fa-trash-alt"></i>
    </Btn>
)

function mapDispatchToProps(dispatch) {
    return {
        onClear: () => dispatch(clearCurrent())
    }
}

ClearButton.PropTypes = {
    onClear: PropTypes.func
}

export default connect(null, mapDispatchToProps)(ClearButton);
