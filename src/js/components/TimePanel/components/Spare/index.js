import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const Wrapper = styled.div`
    margin-left: auto;
`

const Title = styled.span`
    display: block;
    font-weight: bold;
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