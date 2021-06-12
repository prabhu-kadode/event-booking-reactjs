import {useEffect} from 'react';
const Logout = ({logout}) => {
 useEffect(() => {
    logout();
    
 }, [])
    return (
        <div>
            <h2>Logging out . Please wait...!</h2>
        </div>
    )
}
export default Logout;