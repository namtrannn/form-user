import './App.scss';
import Header from './components/Header'; 
import Home from './components/Home';
import TableUser from './components/TableUser';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from "react-router-dom";
import Login from './components/Login';
import { useContext, useEffect } from 'react';
import { UserContext } from './Context/UserContext';

function App() {

  const { user,loginContext } = useContext(UserContext)

  useEffect(() => {
    if(localStorage.getItem("token"))
      loginContext(localStorage.getItem("token"),localStorage.getItem("email") )
  },[])

  return (
    <>
      <div className="App-container">
        <Header />
        <Container>
            <Routes >
              <Route path="/" element={<Home />}/>
              <Route path="/users" element={<TableUser />}/>
              <Route path="/login" element={<Login />}/>
            </Routes>
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
