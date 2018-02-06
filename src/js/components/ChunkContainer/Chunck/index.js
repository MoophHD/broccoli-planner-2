import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as s from './chunck.scss';
import styled from 'styled-components';
import colors from '../../../constants/colors';

const Wrapper = styled.div`
    transition: background-color ease-out .2s;
    transition: height ease-out .3s;
    margin-bottom: 15px;
    background-color: ${props => props.active ? colors.yellow : colors.lightestgrey};
    color: ${props => props.active ? colors.white : colors.darkgrey};
    display: flex;
    align-items: center;
`

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 7.5px;
    background-color: ${props => props.active ? 'crimson' : 'none'};
`

class Chunk extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false
        }
    }
    
    onHover() {
        this.setState(() => ({ hover: true }))
    }

    onUnhover() {
        this.setState(() => ({ hover: false }))
    }
    
    render() {
        const { hover } = this.state;
        const { name, comment, value, id, active } = this.props;
        let { from, to } = this.props;
        let amIActive = id === active;
        from = from.format('h:mm A');
        to = to.format('h:mm A');
        return(
            <Wrapper 
                onMouseOver={() => this.onHover()}
                onMouseLeave={() => this.onUnhover()}
                active={ amIActive }>
                <Container>
                    <div>{value}</div>
                    <div>{name}</div>
                    <div className={s.comment}> 
                        {/* hide comment */}
                        { hover || amIActive ? comment : '' }
                    </div>
                    <div className={s.fromTo}>
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