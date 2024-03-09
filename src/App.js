import './App.scss';
import Header from './components/Header'; 
import Home from './components/Home';
import TableUser from './components/TableUser';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';
import { Routes, Route, Link } from "react-router-dom";


function App() {

  return (
    <>
      <div className="App-container">
        <Header />
        <Container>
            <Routes >
              <Route path="/" element={<Home />}/>
              <Route path="/users" element={<TableUser />}/>
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
