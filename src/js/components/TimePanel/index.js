import React, { Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/app.action';
import * as memoryActions from '../../actions/memory.action';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as s from './timePanel.scss';
import TimeInput from './components/TimeInput';
import Spare from './components/Spare';

const format = 'h : mm A';
class TimePanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fromVal: props.lastCookiesFrom,
            toVal: props.lastCookiesTo
        }

        //stringified moments
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
 
        this.handleFromSubmit();
        this.handleToSubmit();
        
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

        let fixedhr = moment(`${hr} ${period}`, "h A").format('H');

        now.hour(fixedhr);
        now.minute(min);
        now.seconds(0);
        now.milliseconds(0);

        return now;
    }

    handleFromSubmit() {
        const { setFromTime } = this.props.actions;

        let from = this.state.fromVal;

        let momentFrom = this.buildMoment(from);
        
        if (JSON.stringify(momentFrom) == this.last.from) return;

        this.last.from = JSON.stringify(momentFrom);
        

        //format current time
        this.setState(() => ({ fromVal: momentFrom && momentFrom.format(format) }))

        setFromTime(momentFrom);

        //jump to the 'to' input
        if (this.to)  {
            this.to.input.focus();
        }
    }

    handleToSubmit() {
        const { setToTime } = this.props.actions;

        let to = this.state.toVal;


        let momentTo = this.buildMoment(to);

        if (JSON.stringify(momentTo) == this.last.to) return;
        
        this.last.to = JSON.stringify(momentTo);
        
        //format current time
        this.setState(() => ({ toVal: momentTo && momentTo.format(format) }))
        
        setToTime(momentTo);
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
                    ref={ el => this.to = el }
                    title={'to'}
                    value={this.state.toVal}
                    onBlur={() => this.handleToSubmit()}
                    onChange={(val) => this.handleToChange(val)}
                    onKeyPress={() => this.handleToSubmit()}
                />
                <Spare />
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