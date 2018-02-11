import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as memoryActions from '../../actions/memory.action';
import colors from '../../constants/colors';

const Wrapper = styled.div`
    display: ${props => props.active ? 'flex' : 'none'};
    position: absolute;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;

`
const Input = styled.textarea`
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    border: none;
    resize: none;
    font-size: 1.15em;
    color: #333;
    line-height: 1.2;
    padding: 5px 10px;
    background-color: #FAFAFA;
    z-index: 10;
    width: 500px;
    height: 500px;
    box-shadow: 4px 4px 0px 2px rgba(0, 0, 0, 0.15);
    border-top: 3px solid ${colors.yellow};
`

class NotePanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.lastNotes || '',
            active: false,
            focus: false
        }
    }

    componentDidMount() {
        // update last cookies
        window.addEventListener('beforeunload', () => this.props.memoryActions.setNotes(this.state.value));
        
        //look for space press
        window.addEventListener('keydown', (e) => {
            //already active
            if (this.state.active) return;
            //any other input is active
            if (document.body.querySelector('textarea:focus')||
                document.body.querySelector('input:focus')
                ) return;
            if (e.code == "Space")  {
                this.toggleActive()
            } else if (e.code == "Tab") {
                this.handleChange(this.state.value + '    ');
            }

        });

        window.addEventListener('keyup', (e) => {
            // not active
            if (!this.state.active) return;
            // not space
            if (e.code != "Space") return;

            this.toggleActive();
        });
    }

    toggleActive() {
        this.setState(() => ({active: !this.state.active}));
    }

    toggleFocus() {
        this.setState(() => ({focus: !this.state.focus}));
    }

    handleChange(value) {
        this.setState(() => ({value}));
    }

    handleTab(e) {
        if (e.key == "Tab") {
            e.preventDefault();
            let cursorPos = e.target.selectionStart;
            let value = this.state.value.slice();
            this.handleChange(`${value.slice(0, cursorPos)}\t${value.slice(cursorPos, value.length)}`);
        }
    }

    render() {
        const { active, focus } = this.state;
        let pragmaticActive = active || focus;
        return(
            <Wrapper
                active={pragmaticActive}
                //click outside of the input
                onClick={() => this.toggleActive()}
                >
                <Input 
                    onKeyDown={(e) => this.handleTab(e)}
                    onFocus={() => this.toggleFocus()}
                    onBlur={() => this.toggleFocus()}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => this.handleChange(e.target.value)}
                    value={this.state.value}/>
            </Wrapper>
        )
    }
}

function mapStateToProps(state) {
    return {
        lastNotes: state.memory.lastNotes
    }
}
  
function mapDispatchToProps(dispatch) {
    return {
        memoryActions: bindActionCreators(memoryActions, dispatch),
    }
}
  
NotePanel.PropTypes = {
    lastValue: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(NotePanel);
