import './App.css';
import { createStore } from 'redux';
import { myAccountReducer } from './Reducer/MyAccountReducer';
import { Main } from './Main';
import { useNavigate } from 'react-router-dom';

export var store = createStore(myAccountReducer);

export default function App() {
  // let navigate = useNavigate();

  return (
    <Main>
    </Main>
  );
}