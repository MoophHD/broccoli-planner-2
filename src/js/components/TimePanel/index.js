import React, { Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/app.action';
import PropTypes from 'prop-types';
import moment from 'moment';

class TimePanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fromVal: '',
            toVal: ''
        }

        this.last = {
            from: '',
            to: ''
        }

        this.handleFromSubmit = this.handleFromSubmit.bind(this);
        this.handleToSubmit = this.handleToSubmit.bind(this);
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
            <div>
                <div>
                    <span>from</span>
                    <input 
                        //select the text inside
                        onFocus={(e) => e.target.select()}
                        onBlur={this.handleFromSubmit}
                        onChange={(e) => this.handleFromChange(e.target.value)}
                        onKeyPress={(e) => this.checkInputKeyDown(e)}
                        onKeyPress={(e) => { if (e.key == "Enter") this.handleFromSubmit()}}></input>
                </div>              
                <div>
                    <span>to</span>
                    <input 
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
        
    }
}
  
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimePanel);