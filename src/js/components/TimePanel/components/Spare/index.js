import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const Wrapper = styled.div`
    align-self: flex-end;
`
const Spare = ({ spare }) => (
    <Wrapper>{ spare }</Wrapper>
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