import React, { Component } from 'react';
import {Provider} from 'react-redux';
import configureStore from './store';

import '../scss/app';
import Controller from './components/Controller';
import TimePanel from './components/TimePanel';
import ChunkContainer from './components/ChunkContainer';
import Cookies from 'js-cookie';

//grab cookies
const store = configureStore(
  {memory: 
    { lastValue: Cookies.get('lastValue'),
      lastFrom: Cookies.get('lastFrom'),
      lastTo: Cookies.get('lastTo')} }
);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <div>
            <TimePanel />
            <Controller />
          </div>
            <ChunkContainer />
        </div>
      </Provider>
    );
  }
  
}