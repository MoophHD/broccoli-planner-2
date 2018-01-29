import React, { Component } from 'react';
import { bindActionCreators } from 'redux' 
import { connect } from 'react-redux'
import * as actions from '../../actions/app.action';
import * as memoryActions from '../../actions/memory.action';
import PropTypes from 'prop-types';
import * as s from './controller.scss';

const initialId = 0;
const reg = {
    name: /.+/,
    dur: /\d{1,2}(\.\d{1,2})?/g,
    value: /\d{1}/
}

class Controller extends Component {
    constructor(props) {
        super(props);

        // last cookies
        this.state = {
            value: props.lastValue
        }

        this.oldByid = {}; 
    }

    componentDidMount() {
        // update last cookies
        window.addEventListener('beforeunload', () => this.props.memoryActions.setValue(this.state.value));
        // build chuncks from cookies value
        this.checkValue();
    }

    checkValue() {
        let rebuildChuncks = this.props.actions.rebuildChuncks;
        let value = this.state.value.slice();

        // let chuncks = {};
        let tempId = 0;
        let ids = [];
        let byid = {};

        value = value.split('\n');


        let line;
        for ( let i = 0; i < value.length; i++) {
            line = value[i];

            //line must contain 3 or more spaces ( name dur value description)
            //must contain all the elemenets of the pattern ^
            if (line.match(/\ /g) && line.match(/\ /g).length > 2){

                line = line.split(' ');
                
                let name = line[0].match(reg.name);
                let dur = line[1].match(reg.dur);
                let chunckValue = line[2].match(reg.value);
                let comment = line.slice(3).join('');
                if (!name
                || !dur
                || !chunckValue
                ) continue;

                ids.push(tempId);
                byid[tempId] = {
                    name: name[0],
                    dur: dur[0],
                    value: chunckValue[0],
                    comment: comment
                }

                tempId++;
            }
        }
        
        // diff checker
        if (JSON.stringify(this.oldByid) == JSON.stringify(byid)) {
            return;
        }
        this.oldByid = byid;

        rebuildChuncks(ids, byid);
    }

    handleChange(value) {
        this.setState(() => ({value}), this.checkValue)
    }

    render(){
        return(
            <div>
                <textarea 
                    value={this.state.value}
                    onChange={(e) => this.handleChange(e.target.value)} 
                    className={s.input}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        lastValue: state.memory.lastValue
    }
}
  
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
        memoryActions: bindActionCreators(memoryActions, dispatch),
    }
}
  
Controller.PropTypes = {
    lastValue: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(Controller);