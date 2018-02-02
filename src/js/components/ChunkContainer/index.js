import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as s from './chunckContainer.scss';
import Chunck from './Chunck';
import moment from 'moment';
import actions from '../../actions/app.action';


const CHECK_DELTA = 1000; //ms

class ChunckContainer extends Component {
    constructor(props) {
        super(props);

        this.last = {
            from: props.from,
            to: props.to
        }
    }

    componentWillReceiveProps(newProps) {
        const { active, ids, byid } = newProps;
        let checkAround;

        // if the only or the last elem, check it
        //|| active == ids.slice(-1)[0]) 
        if ( active == -1) {
            //check the 1st
            checkAround = byid[ids[0]]
        } else if ( active == ids.slice(-1)[0] ) {
            //check the last
            checkAround = byid[active];
        } else {
            //check the next
            checkAround = byid[active + 1];
        }

        this.setInterval(() => check(checkAround), CHECK_DELTA)
    }

    check(chunck) {
        //checks if now is between the from-to of the given chunck

        // const { from, to } = this.last;
        let now = moment();

        if (now.isBetween(chunck.from, chunck.to)) { // set active
            // if (this.last.active != )
            // this.setActive(id);
        }
    }

    // setActive(id) {

    // }



    render() {
        const { ids } = this.props;
        return(
            <div className={s.container}>
                { ids.map((id, i) => (<Chunck id={id} key={`_chunck${id}${i}`}/>)) }
            </div>
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