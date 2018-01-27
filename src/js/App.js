import React, { Component } from 'react';
import {Provider} from 'react-redux';
import configureStore from './store';

import '../scss/app';
import Controller from './components/Controller';
import TimePanel from './components/TimePanel';

const store = configureStore({});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <TimePanel />
          <Controller />
        </div>
      </Provider>
    );
  }
  
}