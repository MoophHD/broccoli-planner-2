import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as s from './chunckContainer.scss';
import Chunck from './Chunck';


const ChunckContainer = ({ ids }) => (
    <div className={s.container}>
        { ids.map((id, i) => (<Chunck id={id} key={`_chunck${id}${i}`}/>)) }
    </div>
)

function mapStateToProps(state) {
    return {
        ids: state.app.ids
    }
}

ChunckContainer.PropTypes = {
    ids: PropTypes.arrayOf(PropTypes.number)
};

export default connect(mapStateToProps, null)(ChunckContainer);