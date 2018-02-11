import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import colors from '../../../../constants/colors';

const Wrapper = styled.div`
    transition: all .2s ease-out;
    margin-left: auto;
    width: 76px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 0 5px;
    border-bottom: 2px solid ${props => props.hasValue ? 'transparent' : colors.grey};
    };
`

const Title = styled.span`
    display: block;
    font-weight: bold;
`

const SpareValue = styled.span`
    display: block;
`

const Spare = ({ spare }) => (
    <Wrapper 
        hasValue={ spare }>
        <Title>Spare</Title>
        <SpareValue>{ spare ? spare : '~'}</SpareValue>
    </Wrapper>
)

function mapStateToProps(state) {
    return {
        spare: state.app.spare
    }
}

Spare.PropTypes = {
    spare: PropTypes.string
}

export default connect(mapStateToProps, null)(Spare);