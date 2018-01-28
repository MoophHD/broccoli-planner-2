import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Chunk extends Component {
    render() {
        return(
            <div>
                {this.props.id}
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    let self = state.app.byid[ownProps.id];
    return {
        // from: 
    }
}

Chunk.PropTypes = {
    id: PropTypes.number
};

export default connect(mapStateToProps, null)(Chunk);