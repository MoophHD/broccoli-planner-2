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

        this.interval;
    }

    componentWillReceiveProps(newProps) {
        const { active, ids, byid } = newProps;
        let checkAround;
        
        //if no elems
        if(!ids.length) return;

        //check everything in new props
        let hasActiveFlag = false;
        let id;
        for (let i = 0; i < ids.length; i++) {
            id = ids[i];
            // if finds one that will suffice : 
            this.deepCheck(byid[id]).then((id) => {
                hasActiveFlag = true;
                this.setActive(id);
            })
            //if rejected chunck is currently active
            .catch((id) => { 
                if (id == active) this.setActive(-1);
            }
        )
        }
        //sync
        setTimeout(() => {
            //if hasn't found any active but reducer contains one
            if (!hasActiveFlag && active != -1) {
                this.setActive(-1);
                return;
            }
        }, 0);

        /* 
            if the only or 
            active id is missing being not undefined
        */
        //active is still undefined after global check
        let firstChunck = byid[ids[0]];
        let lastChunck = byid[ids[ids.length-1]];

        if (active == -1) {
            let now = moment();
            if (ids.length == 1 || now.isBefore(firstChunck.from)) {
                //check first
                checkAround = firstChunck;
            } else if (now.isAfter(lastChunck.to)) {
                //check last
                checkAround = firstChunck;
            } 
        } else {
            if (active === ids.slice(-1)[0]) {
                //check last
                checkAround = lastChunck;
            } else {
                //check next
                checkAround = byid[active + 1];
            }
        }

        if (!checkAround) return;
        if (this.interval) clearInterval(this.interval);

        this.interval = setInterval(
            () => this.check(checkAround)
            // on res > fire setActive
            // on pass > keep checking
            .then(
                ({id}) => {  this.setActive(id); }
            )
            .catch(() => { this.setActive(-1) }),
            CHECK_DELTA)
    }
    
    //interval check
    check(chunck) {
        //checks if now is between the from-to of the given chunck

        let now = moment();
        let id = chunck._id;
        return new Promise((res) => {
            if (now.isBetween(chunck.from, chunck.to)) { 
                return res({ id: id, now: now });
            } else if (now.isAfter(chunck.to)) {
                throw new Error(id.toString());
            }
        })
    }

    deepCheck(chunck) {
        return (this.check(chunck).then(
            ({id, now}) => { 
                //addictional checl
                if (!now.isBefore(chunck.from)) {
                    return id
                } else {
                    throw new Error(id.toString());
                }
            }
        ))
        // return check(chunck)
    }

    setActive(id) {
        if ( id == this.props.active) return;

        this.props.actions.setCurrent(id);
    }

    render() {
        let { ids, byid } = this.props;
        //filter commented
        let clearIds = ids.filter(id => !byid[id]._hidden )
        const toRender =  clearIds.map((id, i) => (<Chunck id={id} key={`_chunck${id}${i}`}/>));
        return(
            <Container>
                { toRender }
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