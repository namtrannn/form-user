import { Routes, Route } from "react-router-dom";
import Home from '../components/Home';
import TableUser from '../components/TableUser';
import Login from '../components/Login';
import PrivateRoute from "./PrivaiteRoute";
import NotFoud from "../components/NotFoud";

const AppRoute = () => {
    return (
        <>
            <Routes >
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<Login />}/>
                <Route 
                    path="/users"
                    element= {
                        <PrivateRoute>
                            <TableUser />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<NotFoud />} />
            </Routes>
        </>
    )
}

export default AppRoute