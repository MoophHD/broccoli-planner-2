import React, { Component } from 'react';
import { bindActionCreators } from 'redux' 
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Chunck from './Chunck';
import moment from 'moment';
import * as actions from '../../actions/app.action';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 15px;
`

const CHECK_DELTA = 1000; //ms

class ChunckContainer extends Component {
    constructor(props) {
        super(props);

        this.lastCheckAroundId;
        this.interval;
    }

    componentWillReceiveProps(newProps) {
        const { active, ids, byid } = newProps;
        let checkAround;

        // has more than one elem
        if ( ids.length > 1 ) {
            //check everything on new props
            let id;
            for (let i = 0; i < ids.length; i++) {
                id = ids[i];
                // if finds one that will suffice : 
                this.check(byid[id]).then((id) => {
                    //if the same as current active
                    if ( id == active ) return;
                    
                    this.setActive(id);
                },
                () => {}
            )
            }
        }

        /* 
            if the only or 
            active id is missing being not undefined
        */
        if ( ids.length == 1 || (ids.indexOf(active) == -1 && active != -1) ) {
            //check the 1st
            checkAround = byid[ids[0]];
        } else if ( active === ids.slice(-1)[0] ) {
            // if last check last
            checkAround = byid[active];
        } else if ( active !== ids.slice(-1)[0] && active != -1 ) {
            //if not last nor first and not undefined => check the next
            checkAround = byid[active + 1];
        }

        if (!checkAround) return;


        //is undefined or the same as current checkaround
        if (!checkAround || this.lastCheckAroundId == checkAround._id) return;
        this.lastCheckAroundId = checkAround._id;

        if (this.interval) clearInterval(this.interval);
        this.interval = setInterval(
            () => this.check(checkAround)
            // on res > fire setActive
            // on rej  > set inactive
            // on pass > keep checking
            .then(
                (id) => { this.setActive(id); },
                () => { this.setActive(-1); }
            ),
            CHECK_DELTA)
    }

    check(chunck) {
        //checks if now is between the from-to of the given chunck

        // const { from, to } = this.last;
        let now = moment();

        return new Promise((res, rej) => {
            if (now.isBetween(chunck.from, chunck.to)) { 
                return res(chunck._id);
            } else if (now.isAfter(chunck.to)) {
                return rej();
            }
        })
    }

    setActive(id) {
        if ( id == this.props.active) return;

        this.props.actions.setCurrent(id);
    }

    render() {
        const { ids } = this.props;
        return(
            <Container>
                { ids.map((id, i) => (<Chunck id={id} key={`_chunck${id}${i}`}/>)) }
            </Container>
        )
    }
}

function mapStateToProps(state) {
    const app = state.app;
    return {
        ids: app.ids,
        active: app.active,
        byid: app.byid,
        from: app.from,
        to: app.to
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

ChunckContainer.PropTypes = {
    ids: PropTypes.arrayOf(PropTypes.number)

};


export default connect(mapStateToProps, mapDispatchToProps)(ChunckContainer);