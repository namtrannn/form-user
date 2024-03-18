import './App.scss';
import Header from './components/Header'; 
import { ToastContainer } from 'react-toastify';
import Container from 'react-bootstrap/Container';
import AppRoute from './Routes/AppRoute';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {handelRefresh} from './Redux/Actions/userAction'

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    if(localStorage.getItem("token")) {
      dispatch(handelRefresh())
    }
  },[])

  return (
    <>
      <div className="App-container">
        <Header />
        <Container>
            <AppRoute />
        </Container>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
);
}

export default App;
