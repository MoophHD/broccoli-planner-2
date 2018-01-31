import React, { Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/app.action';
import * as memoryActions from '../../actions/memory.action';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as s from './timePanel.scss';
import TimeInput from './components/TimeInput';

const format = 'h : mm A';

class TimePanel extends Component {
    constructor(props) {
        super(props);
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

        // this.setState(() => ({ fromVal: this.setState.fr.format(format) }))
        // this.setState(() => ({ fromVal: momentObj.format(format) }))
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
            period = buildFrom.match(/(am|pm)/gi)[0].toUpperCase();
        } else {
            period = (now.get("hours") < 12) ? "AM" : "PM";
        }

        let splitters = /(\.|,|(\ :\ ))/g;
        let splitter = splitters.test(buildFrom) ? buildFrom.match(splitters)[0] : null;
        
        // first digists
        let hr = buildFrom.match(/\d+/g)[0];
        // split with a regexp argument throws split elems for some reason
        // if contains a drop or comma split and get digits from the second element ( 1.15 => [1, 15] => 15)
        let min = splitter ? buildFrom.split(splitter)[1].match(/\d+/)[0] : 0;

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

        let momentObj = this.buildMoment(from);

        //format current time
        this.setState(() => ({ fromVal: momentObj.format(format) }))

        setFromTime(momentObj);
    }

    handleToSubmit() {
        const { setToTime } = this.props.actions;

        let to = this.state.toVal;

        if (to == this.last.to) return;
        this.last.to = to;

        let momentObj = this.buildMoment(to);

        //format current time
        this.setState(() => ({ toVal: momentObj.format(format) }))
        
        setToTime(momentObj);
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
                <TimeInput 
                    title={'from'}
                    value={this.state.fromVal}
                    onBlur={() => this.handleFromSubmit()}
                    onChange={(val) => this.handleFromChange(val)}
                    onKeyPress={() => this.handleFromSubmit()}
                    />
                <TimeInput 
                    title={'to'}
                    value={this.state.toVal}
                    onBlur={() => this.handleToSubmit()}
                    onChange={(val) => this.handleToChange(val)}
                    onKeyPress={() => this.handleToSubmit()}
                />

                {/* <div className={s.timeBorder}>
                    <span>from</span>
                    <input 
                        className={s.input}
                        value={this.state.fromVal}
                        onFocus={(e) => e.target.select()}
                        onBlur={this.handleFromSubmit}
                        onChange={(e) => this.handleFromChange(e.target.value)}
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
                </div> */}
  
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