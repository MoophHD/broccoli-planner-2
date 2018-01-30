import React, { Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/app.action';
import * as memoryActions from '../../actions/memory.action';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as s from './timePanel.scss';

class TimePanel extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            fromVal: props.lastCookiesFrom,
            toVal: props.lastCookiesTo
        }

        this.last = {
            from: '',
            to: ''
        }

        this.handleFromSubmit = this.handleFromSubmit.bind(this);
        this.handleToSubmit = this.handleToSubmit.bind(this);
    }

    componentDidMount() {

        // update last cookies
        window.addEventListener('beforeunload', () => this.handleUnload());
 
            
        // build chuncks from cookies value
        this.handleFromSubmit();
        this.handleToSubmit();
    }

    handleUnload() {
        const actions = this.props.memoryActions;
        let from = this.state.fromVal;
        let to = this.state.toVal;

        if (from) actions.setFrom(from);
        if (to) actions.setTo(to);
    }

    buildMoment(buildFrom) {
        //contains no digit
        if (!/\d/.test(buildFrom)) return '';

        let now = moment();
        let period;
        
        if ((/(am|pm)/gi).test(buildFrom)) {
            peroid = str.match(/(am|pm)/gi)[0].toUpperCase();
        } else {
            period = (now.get("hours") < 12) ? "AM" : "PM";
        }
        let splitter = /(\.|,)/;
        
        // first digists
        let hr = buildFrom.match(/\d+/g)[0];

        // split with a regexp argument throws split elems for some reason
        // if contains a drop or comma split and get digits from the third element ( 1.15 => [1, (.|,), 15] => 15)
        let min = splitter.test(buildFrom) ? buildFrom.split(splitter)[2].match(/\d+/)[0] : 0;

        // decimal
        if (min.toString().length < 2) {
            // [0.]5 => [0.]30
            min = min * 6;
        }
      
        now.hour(hr);
        now.minute(min);
        now.seconds(0);

        return now;
    }

    handleFromSubmit() {
        const { setFromTime } = this.props.actions;

        let from = this.state.fromVal;
        
        if (from == this.last.from) return;
        this.last.from = from;

        setFromTime(this.buildMoment(from));
    }

    handleToSubmit() {
        const { setToTime } = this.props.actions;

        let to = this.state.toVal;

        if (to == this.last.to) return;
        this.last.to = to;
        
        setToTime(this.buildMoment(to));
    }

    handleFromChange(val) {
        this.setState(() => ({ fromVal: val }));
    }

    handleToChange(val) {
        this.setState(() => ({ toVal: val }));
    }

    render() {
        return(
            <div className={s.container}>
                <div className={s.timeBorder}>
                    <span>from</span>
                    <input 
                        className={s.input}
                        value={this.state.fromVal}
                        onFocus={(e) => e.target.select()}
                        onBlur={this.handleFromSubmit}
                        onChange={(e) => this.handleFromChange(e.target.value)}
                        onKeyPress={(e) => this.checkInputKeyDown(e)}
                        onKeyPress={(e) => { if (e.key == "Enter") this.handleFromSubmit()}}></input>
                </div>              
                <div className={s.timeBorder}>
                    <span>to</span>
                    <input 
                        className={s.input}
                        value={this.state.toVal}
                        onFocus={(e) => e.target.select()}
                        onBlur={this.handleToSubmit}
                        onChange={(e) => this.handleToChange(e.target.value)}
                        onKeyPress={(e) => { if (e.key == "Enter") this.handleToSubmit()}}></input>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        lastCookiesFrom: state.memory.lastFrom,
        lastCookiesTo: state.memory.lastTo
    }
}
  
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
        memoryActions: bindActionCreators(memoryActions, dispatch)
    }
}

TimePanel.PropTypes = {
    lastCookiesFrom: PropTypes.string,
    lastCookiesTo: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(TimePanel);