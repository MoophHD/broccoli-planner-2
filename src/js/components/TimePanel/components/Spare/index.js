import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import colors from '../../../../constants/colors';

const Wrapper = styled.div`
    background-color: ${colors.lightestgrey};
    margin-left: auto;
    width: 80px;
    height: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 0 5px;
`

const Title = styled.span`
    display: block;
    font-weight: bold;
    margin-right: auto;
`

const SpareValue = styled.span`
    display: block;
`

const Spare = ({ spare }) => (
    <Wrapper>
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