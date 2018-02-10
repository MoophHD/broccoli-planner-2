import React, { Component } from 'react';
import { bindActionCreators } from 'redux' 
import { connect } from 'react-redux'
import * as actions from '../../actions/app.action';
import * as memoryActions from '../../actions/memory.action';
import PropTypes from 'prop-types';
import * as s from './controller.scss';
import styled from 'styled-components';
import Lock from './components/Lock';

import colors from '../../constants/colors';
const Wrapper = styled.div`
    flex: 1;
    position: relative;
`
const InputArea = styled.textarea`
    background-color: ${colors.lightestgrey};
    font-size: 1.2em;
    line-height: 1.2;
    font-weight: 300;
    border: none;
    height: 100%;
    width: 100%;
    padding: 5px 10px;
    resize: none;
    border-radius: 2px;
    transition: all ease .15s;
    &:focus {
        box-shadow: 0 0 0px 1.5px ${colors.yellow};
    }
`
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
            value: props.lastValue || '',
            locked: false
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

        let isHidden;

        let line;
        for ( let i = 0; i < value.length; i++) {
            line = value[i];

            //line must contain 3 or more spaces ( name dur value description)
            //must contain all the elemenets of the pattern ^
            if (line.match(/\ /g) && line.match(/\ /g).length > 2){
                // check if commented
                if (line[0] == '/') {
                    isHidden = true;
                    //remove comment slash
                    line = line.slice(1)
                } else {
                    isHidden = false;
                }

                line = line.split(' ');
                
                let name = line[0].match(reg.name);
                let dur = line[1].match(reg.dur);
                let chunckValue = line[2].match(reg.value);
                let comment = line.slice(3).join(' ');
                if (!name
                || !dur
                || !chunckValue
                ) continue;

                ids.push(tempId);
                byid[tempId] = {
                    name: name[0],
                    dur: dur[0],
                    value: chunckValue[0],
                    comment: comment,
                    _hidden: isHidden
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

    handleComment(e) {
        let shift = 0;
        let start = this.input.selectionStart;
        let finish = this.input.selectionEnd;
        let value = this.state.value;

        let linesToComment = this.getLines(value, start, finish);

        value = value.split('\n').map((line, order) => {
                //if is in the list
            if (linesToComment.indexOf(order) != -1) {
                    //toggle comment
                if (line[0] == '/') {
                    line = line.slice(1)
                    shift--;
                }
                else {
                    shift++;
                    line = '/' + line
                }
            }

            return line;
        })

        value = value.join("\n");
        
        this.setState(() => ({ value }), () => {
            this.checkValue(); 
            this.resetCursor(shift + start, shift + finish)});
    }

    resetCursor(start, finish) {
        this.input.setSelectionRange(start, finish);
    }

    //returns array
    getLines(str, start, finish) {
        let lineBreak = /\n/g;
        let endOfLine = /.$/gm;
        let result = [];
        
        let preStart = str.slice(0, start);
        let preStartLines = lineBreak.test(preStart) ? preStart.match(lineBreak).length : 0;
        
        let contentLines;
        //one no letter select
        if (start == finish) {
            contentLines = 1;
        } else {
            contentLines = str.slice(start, finish).match(endOfLine).length;
        }
        
        return Array.from(Array(contentLines).keys()).map((num) => (num + preStartLines))
    }

    toggleLock() {
        this.setState(() => ({locked: !this.state.locked}))
    }

    render(){
        const { locked, value } = this.state;
        return(
            <Wrapper>
                <Lock 
                    onClick={() => this.toggleLock()}
                    isLocked={locked}/>
                <InputArea 
                    readOnly={locked}
                    innerRef={ el => this.input = el}
                    placeholder="e.g. unity 0.5 3 code stuff..."
                    value={value}
                    onChange={(e) => this.handleChange(e.target.value)}
                    onKeyDown={(e) => { if (e.ctrlKey && e.key == "/") this.handleComment(e)}}
                    />
            </Wrapper>
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