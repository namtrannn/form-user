import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LogoApps from '../assets/img/chu-meo-may-doreamon-dang-bay-hinh-anh-png-622.jpg'
import Image from 'react-bootstrap/Image';
import { NavLink,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { handelLogoutRedux } from '../Redux/Actions/userAction';
import {  useEffect } from 'react';

const Header = (props) => {


    const navigate = useNavigate()
    const user = useSelector(state => state.user.account)
    const dispatch = useDispatch()

    const handelLogout = () => {
        dispatch(handelLogoutRedux()  ) 
    }

    useEffect(() => {
        if(user && user.auth === false && window.location.pathname !== '/login' ) {
            navigate("/")
            toast.success("Logout success")
        }
    },[user])

    return (
        <Navbar expand="lg" className="bg-light">
        <Container>
            <Navbar.Brand href="#home"> 
                <Image  
                    src={LogoApps}
                    width="60"  
                    height="60"
                    className='d-inline-block'
                    alt="Logo doraemon"
                />
                <span>form-Users @.@</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                {((user && user.auth) || window.location.pathname === '/') &&
                    <>
                        <Nav className="me-auto">
                            <NavLink to="/" className="nav-link">Home</NavLink>
                            <NavLink to='/users' className="nav-link">Table User</NavLink>
                        </Nav>
                
                        <Nav>
                            {user && user.email && <span className='nav-link'>Welcome{user.email}</span>}
                            <NavDropdown title="Setting" id="basic-nav-dropdown">
                                {
                                    user && user.auth === true 
                                    ? <NavDropdown.Item onClick={() => handelLogout()}>Logout</NavDropdown.Item>
                                    : <NavLink to='/login' className="dropdown-item">Login</NavLink> 
                                }
                            </NavDropdown>  
                        </Nav>
                    </>
                }
            </Navbar.Collapse>  
        </Container>    
        </Navbar>
    )
}
export default Header;