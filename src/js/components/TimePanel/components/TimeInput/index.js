import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Input = styled.input`
    width: 150px;
`
class TimeInput extends Component {
    render(){
        const { onChange, value, title, onBlur, onKeyPress } = this.props;

        return(
            <div>
                <span>{title}</span>
                <Input 
                    onChange={(e) => onChange(e.target.value)}
                    value={value}
                    onFocus={(e) => e.target.select()}
                    onBlur={onBlur}
                    onKeyPress={ (e) => { if (e.key == "Enter") onKeyPress()} }
                />
            </div>
        )
    }
}

TimeInput.PropTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    title: PropTypes.string,
    onBlur: PropTypes.func,
    onKeyPress: PropTypes.func
}

export default TimeInput;