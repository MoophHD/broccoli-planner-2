import React, { Component } from 'react';
import {Provider} from 'react-redux';
import configureStore from './store';

import * as s from '../scss/app';
import Controller from './components/Controller';
import TimePanel from './components/TimePanel';
import ChunkContainer from './components/ChunkContainer';
import Cookies from 'js-cookie';
import styled from 'styled-components';

//grab cookies
const store = configureStore(
  {memory: 
    { lastValue: Cookies.get('lastValue'),
      lastFrom: Cookies.get('lastFrom'),
      lastTo: Cookies.get('lastTo')} }
);

const AppWrapper = styled.div`
  width: 980px;
  margin: auto;
  display: flex;
  flex-direction: row;
  height: 100%;
`

const ControllSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 350px;
`

const ChunckSection = styled.section`
  flex: 1;
`

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppWrapper>
          <ControllSection>
            <TimePanel />
            <Controller />
          </ControllSection>
          <ChunckSection>
            <ChunkContainer />
          </ChunckSection>
        </AppWrapper>
      </Provider>
    );
  }
  
}