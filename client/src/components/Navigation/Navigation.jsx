import './Navigation.css'
import { useContext } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'




const Navigation = () => {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext)

    return (
        <Navbar className='navbar' bg="light" variant='light' style={{ marginBottom: 30 }}>
            <Container>
                <NavLink to="/">
                    <img
                        alt="Logo"
                        src="/logo.png"
                        className="d-inline-block align-top"
                    />

                </NavLink>

                {
                    !isLoggedIn ?
                        <>
                            <NavLink to="/registro">
                                <Nav.Link as="span">Registro</Nav.Link>
                            </NavLink>
                            <NavLink to="/inicio-sesion">
                                <Nav.Link as="span">Iniciar sesión</Nav.Link>
                            </NavLink>
                        </>
                        :
                        <>
                            {/* <NavLink to="/usuario">
                                <Nav.Link >Perfil de {user?.username}</Nav.Link>
                            </NavLink> */}
                            <Nav.Link onClick={logOutUser}>Cerrar sesión</Nav.Link>
                        </>
                }
            </Container>
        </Navbar >
    )

}

export default Navigation