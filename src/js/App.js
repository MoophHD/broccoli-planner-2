import React, { Component } from 'react';
import {Provider} from 'react-redux';
import store from './store';

import '../scss/app';
import Controller from './components/Controller';


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Controller />
      </Provider>
    );
  }
  
}