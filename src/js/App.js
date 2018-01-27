import React, { Component } from 'react';
import {Provider} from 'react-redux';
import configureStore from './store';

import '../scss/app';
import Controller from './components/Controller';

const store = configureStore({});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Controller />
      </Provider>
    );
  }
  
}