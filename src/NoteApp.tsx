// NoteApp.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NoteList from './NoteList';
import AddNote from './AddNote';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import store from './store/index';
import { persistStore } from "redux-persist";

let persistor = persistStore(store);
const Stack = createStackNavigator();

const NoteApp: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="NoteList">
            <Stack.Screen name="NoteList" component={NoteList} options={{ title: 'Notes' }} />
            <Stack.Screen name="AddNote" component={AddNote} options={{ title: 'Add Note' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default NoteApp;
