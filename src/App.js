import {BrowserRouter,Route,Redirect, Switch} from 'react-router-dom';
import {useState} from 'react';
import './App.css';
import Auth from './pages/Auth';
import Booking from './pages/Booking';
import Event from './pages/Event';
import Logout from './pages/Logout';
import MainNavigation from './components/main-navigation';


function App() {
  const [token, setToken] = useState(false);

  const addToken = (token) => {
    setToken(token);
    console.log("token added");
  }
  const logout = ()=>{
    setToken(null);
  }
  return (
    <div className="App">
      <BrowserRouter>
      <MainNavigation token={token}/>
      <Switch>
          { !token && <Redirect from = "/" to="/auth" exact/>}
          { !token && <Redirect from = "/event" to="/auth" exact/>}
          { !token && <Redirect from = "/bookings" to="/auth" exact/>}
          { !token && <Redirect from = "/logout" to="/auth" exact/>}
         { !token && <Route path="/auth" component={() =>(<Auth addToken={addToken}/>)}/>}
         { token && <Route path="/event" component={()=>(<Event token={token}/>)}/>}
         { token &&  <Route path="/bookings" component={Booking}/> }
         {token && <Route path="/logout" component={()=>(<Logout logout={logout}/>)}/>}
         { token && <Redirect from = "/auth" to="/event" exact/>}
        </Switch>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
