import {NavLink} from 'react-router-dom';
import  './Mainnav.css';
const MainNavigation = ({token}) =>{
    return(
        <header>
            <nav>
                <ul>
                    <li>
                        {!token && <NavLink to="/auth">Authentication</NavLink> }
                       { token && <NavLink to="/event">Event</NavLink> }
                        { token && <NavLink to="/bookings">Bookings</NavLink> }
                        { token && <NavLink to="/logout">Logout</NavLink> }
                    </li>
                </ul>
            </nav>
        </header>
    )
}
export default MainNavigation