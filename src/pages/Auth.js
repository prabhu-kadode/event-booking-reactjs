import React, { useRef,useState } from "react";
import  './auth.css'
const Auth = ({addToken}) => {
    const [isLogin, setIsLogin] = useState(true);
 const emailRef = useRef(null);
 const passwordRef = useRef(null); 
 const submitInputValues = () => {
    const emailValue = emailRef.current.value; 
    const password = passwordRef.current.value;
    if(emailValue.trim().length===0 || password.trim().length===0) {
        return
    }
    let requetBody = {
        query: `
            query {
                login(email:"${emailValue}",password:"${password}") {
                    userId
                    token
                    email
                }
            }
        `
    }
    fetch("http://localhost:3000/graphql",{
        method:"POST",
        body:JSON.stringify(requetBody),
        headers: {
            "Content-Type":'application/json'
        }
    })
    .then(res => {
        return res.json()
    })
    .then(result=>{
    console.log(result);
    addToken(result.data);
    })
    .catch(error => {
        console.log(error);
    })  
      
    
 }
 const signUp = () => {
     isLogin ? setIsLogin(false) : setIsLogin(true);
 }
    return (
        <div className="auth">
          
         <div className="login-form">
            <h2>Welcome to app</h2>
            <p>{isLogin ? "Sign In" : "Sign Up"}</p>
                <div className="email">
                    <label><b>Email</b></label>
                    <input type="text" placeholder="Email" ref={emailRef}/>
                </div>
                <div className="password">
                    <label><b>Password</b></label>
                    <input type="text" placeholder="Password" ref={passwordRef}/>
                </div>
                <div className="buttons-group">
                <button onClick={()=>submitInputValues()}>Submit</button>
                <button onClick={()=>signUp()}>{isLogin ? 'Switch to Sign Up' :'Switch To Sign In'}</button>
                </div>
            </div>
        </div>
    )
}
 export default Auth;