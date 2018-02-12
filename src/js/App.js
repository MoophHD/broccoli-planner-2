import React, { Component } from 'react';
import {Provider} from 'react-redux';
import configureStore from './store';
import '../scss/app';
import Controller from './components/Controller';
import TimePanel from './components/TimePanel';
import ChunkContainer from './components/ChunkContainer';
import NotePanel from './components/NotePanel';
import ClearButton from './components/ClearButton';

import Cookies from 'js-cookie';
import styled from 'styled-components';

//grab cookies
const store = configureStore(
  {memory: 
    { lastValue: Cookies.get('lastValue'),
      lastNotes: Cookies.get('lastNotes'),
      lastFrom: Cookies.get('lastFrom'),
      lastTo: Cookies.get('lastTo'),} 
    }
);

const AppWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`
const MainSection = styled.section`
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
        <ClearButton />
        <NotePanel/>
        <MainSection>
          
          <ControllSection>
            <TimePanel />
            <Controller />
          </ControllSection>

          <ChunckSection>
            <ChunkContainer />
          </ChunckSection>
        </MainSection>
      </AppWrapper>
      </Provider>
    );
  }
  
}