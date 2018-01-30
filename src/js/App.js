import React, { Component } from 'react';
import {Provider} from 'react-redux';
import configureStore from './store';

import * as s from '../scss/app';
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
        <div className={s.container}>
          <div className={s.controll}>
            <TimePanel />
            <Controller />
          </div>
          <div className={s.chuncks}>
            <ChunkContainer />
          </div>
        </div>
      </Provider>
    );
  }
  
}