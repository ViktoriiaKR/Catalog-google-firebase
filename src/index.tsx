import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './modules/components/indexApp';
import firebase from "firebase";
import { firebaseConfig } from './const/fb-config';
import 'firebase/firestore';
import 'firebase/auth';
import './styles/index.scss';

export const app = firebase.initializeApp(
  firebaseConfig
);

export const Context = createContext<any|null>(null);
const auth = firebase.auth();
const firestore = firebase.firestore();

ReactDOM.render(
      <Context.Provider value={{
          firebase,
          auth,
          firestore
      }}>
          <App /> 
      </Context.Provider>,
  document.getElementById('root')
);