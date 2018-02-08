import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import colors from '../../../constants/colors';

import ValueIndicator from './Components/ValueIndicator';

const Wrapper = styled.div`
    transition: background-color ease-out .2s;
    transition: height ease-out .3s;
    margin-bottom: 15px;
    background-color: ${props => props.active ? colors.yellow : colors.lightestgrey};
    color: ${props => props.active ? colors.white : colors.darkgrey};
    display: flex;
`

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
    padding: 7.5px;
`

const Description = styled.div`
    flex-basis: 150px;
    text-align: center;
`
class Chunk extends Component {
    constructor(props) {
        super(props);
    }
 
    
    render() {
        const { name, comment, value, id, active } = this.props;
        let { from, to } = this.props;
        let isActive = id === active;
        from = from.format('h:mm A');
        to = to.format('h:mm A');
        return(
            <Wrapper 
                active={ isActive }>
                <Container>
                    <ValueIndicator
                        isActive={isActive}
                        value={value}>
                    </ValueIndicator>

                    <div>{name}</div>

                    <Description> 
                        { comment }
                    </Description>
                    <div>
                        <div>{from}</div>
                        <div>{to}</div>
                    </div>
                </Container>
            </Wrapper>
        )
    }
}

function mapStateToProps(state, ownProps) {
    let self = state.app.byid[ownProps.id];
    return {
        from: self.from,
        to: self.to,
        name: self.name,
        comment: self.comment,
        value: self.value,
        active: state.app.active
    }
}

Chunk.PropTypes = {
    id: PropTypes.number,
    from: PropTypes.object,
    to: PropTypes.object,
    comment: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string
};

export default connect(mapStateToProps, null)(Chunk);