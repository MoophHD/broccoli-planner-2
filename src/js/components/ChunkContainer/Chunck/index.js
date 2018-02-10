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
    justify-content: stretch;
    align-items: center;
    flex-direction: row;
    padding: 5px;
    
    > div:not(:last-child) {
        border-right: 1px solid ${prosp => prosp.active ? colors.white : colors.green};
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`

const IndicatorContainer = styled.div`
    padding-right: 5px;
    width: 50px;
`

const Name = styled.div`
    width: 75px;
    font-size: 1.25em;
`

const Description = styled.div`
    flex: 1;
    flex-basis: 150px;
    text-align: left;
    white-space: pre-wrap;      /* CSS3 */   
    white-space: -moz-pre-wrap; /* Firefox */    
    white-space: -pre-wrap;     /* Opera <7 */   
    white-space: -o-pre-wrap;   /* Opera 7 */    
`

const TimeBorders = styled.div`
    width: 75px;
    font-size: 0.85em;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
                <Container active={isActive}>
                    <IndicatorContainer >
                        <ValueIndicator
                            isActive={isActive}
                            value={value} />
                    </IndicatorContainer>
                    

                    <Name>
                        {name}
                    </Name>

                    <Description> 
                        { comment }
                    </Description>

                    <TimeBorders>
                        <div>{from}</div>
                        <div>{to}</div>
                    </TimeBorders>
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