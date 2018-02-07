import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../../../../constants/colors';

const Field = styled.div`
    margin-right: 15px;
    position: relative;
    width: 150px;
    padding: 0 5px;
    padding-bottom: 2.5px;
`
const Input = styled.input`
    transition: border-color .25s ease-out;
    padding: 7.5px;
    width: 100%;
    background-color: inherit;

    border-left-width: 0;
    border-right-width: 0;
    border-top-width: 0;
    border-bottom-width: 2px;
    
    border-color: ${colors.grey};

    &:focus {
        outline: none;
        border-color: ${colors.yellow};
    }
`
const Title = styled.span`
    font-weight: bold;
`
class TimeInput extends Component {
    render(){
        const { onChange, value, title, onBlur, onKeyPress } = this.props;
        return(
            <Field>
                <Title>
                    {title}
                </Title>
                <Input
                    placeholder={title == 'From' ? 'e.g. 3.50am' : 'e.g. 4.50am'}
                    innerRef={ el => { if (el) this.input = el}} 
                    onChange={(e) => onChange(e.target.value)}
                    value={value}
                    onFocus={(e) => e.target.select()}
                    onBlur={onBlur}
                    onKeyPress={ (e) => { if (e.key == "Enter") onKeyPress()} }
                />
            </Field>
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