import React, { Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/app.action';
import PropTypes from 'prop-types';

class TimePanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fromVal: '',
            toVal: ''
        }

        this.handleFromSubmit = this.handleFromSubmit.bind(this);
        this.handleToSubmit = this.handleToSubmit.bind(this);
    }

    buildMoment(buildFrom) {
        // REBUILD IT
        return buildFrom;
    }

    handleFromSubmit() {
        const { setFromTime } = this.props.actions;

        //DISALLOW DISPATCH IF STATE VARIANT IS THE SAME
        setFromTime( this.buildMoment(this.state.fromVal) );
    }

    handleToSubmit() {
        const { setToTime } = this.props.actions;
        
        setToTime( this.buildMoment(this.state.toVal) );
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