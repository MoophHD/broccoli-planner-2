import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

class Chunk extends Component {
    render() {
        const { name, comment, value } = this.props;
        let { from, to } = this.props;

        from = from.format('h:mm A');
        to = to.format('h:mm A');;
        
        return(
            <div>
                <div>{value}</div>
                <div>{name}</div>
                <div>{comment}</div>
                <div>{from}</div>
                <div>{to}</div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    let self = state.app.byid[ownProps.id];
    return {
        from: self.from,
        to: self.to,
        name: self.name,
        comment: self.comment,
        value: self.value
    }
}

Chunk.PropTypes = {
    id: PropTypes.number,
    from: PropTypes.object,
    to: PropTypes.object,
    comment: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string
};

export default connect(mapStateToProps, null)(Chunk);