import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LogoApps from '../assets/img/chu-meo-may-doreamon-dang-bay-hinh-anh-png-622.jpg'
import Image from 'react-bootstrap/Image';

const Header = (props) => {
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
                <span>NamTran_Apps @.@</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" activeKey={"/"}>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/users">Link</Nav.Link>
                <NavDropdown title="Setting" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                    <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                </NavDropdown>  
            </Nav>
            </Navbar.Collapse>  
        </Container>
        </Navbar>
    )
}
export default Header;