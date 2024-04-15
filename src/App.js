import { Router } from './Router/Router';
import './App.scss';
import { store, persistor } from "./Redux/Store"
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import i18n from './i18n';
import { Suspense, useState, useEffect } from 'react';

function App() {
  

  return (
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <PersistGate loading={null} persistor={persistor}>
          <Router />
        </PersistGate>
      </Suspense>
    </Provider>
  );
}

export default App;
