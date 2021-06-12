import "./create-event.css";
import EventList from './EventList';
import Loader from './Loader';
import {useRef,useState,useEffect}  from 'react';
const validateData = (title,description,price) => {
    if(title.trim().length===0 || description.trim().legnth===0 || price.trim().length===0) {
        return false;
    } 

  return {title,description,price};
}
const getFormData = (titleRef,descriptionRef,priceRef) => {
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const price = priceRef.current.value;
    const validatedData=  validateData(title,description,price);
    if(validatedData) {
        return validatedData;
    }  else {
        return false;
    }
}
    
  

const CreateEvent = ({token}) => {
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const priceRef = useRef(null);
    const [isFormValid,setFormValid] = useState(true);
    const [eventList,setEventList] = useState([]);
    const [isLoader,setLoader] = useState(false);
    
    useEffect(()=>{
        setLoader(true);
        let requestBody = {
            query: `
            query {
                events {
                  title,
                  description,
                  id
                  price
                  creator {
                    email
                  }
                }
              }
            `
        }
        fetch("http://localhost:3000/graphql",{
          method:"POST",
          body:JSON.stringify(requestBody),
          headers: {
              "Content-Type":'application/json',
          }
      }).then(res => {
          return res.json()
      }).then(eventList=>{
        setEventList(eventList.data.events);
        setLoader(false);
      }).catch(error=>{
          console.log(error);
      })

    },[]);
  
    const submitForm  = () => {
       const {title,description,price} = getFormData(titleRef,descriptionRef,priceRef);
       if(!title && !description && !price) {
           setFormValid(false);
        return
       }
       setFormValid(true);
       let requetBody = {
           query:`
           mutation {
            createEvent(eventInput:{title:"${title}",description:"${description}",price:${price}}){
              title
              description,
              id,
              price
            }
          }
           `
       }
       setLoader(true);
      fetch("http://localhost:3000/graphql",{
          method:"POST",
          body:JSON.stringify(requetBody),
          headers: {
              "Content-Type":'application/json',
              "Authorization":`bearer ${token.login.token}`
          }
      }).then(res => {
          return res.json()
      }).then(createdEvent=>{
       
        const event = createdEvent.data.createEvent;
        console.log(event);
        setEventList(previusEventList => [event,...previusEventList]);
        setLoader(false);
      }).catch(error=>{
          console.log(error);
      })
    }
   
    return (
        <div className="create-event" >
              {isLoader && <Loader/>}
            <h1>Create Event</h1>
            {!isFormValid && <h2>Form is invalid</h2>}
            <div className ="create-event-form">
                <div className="form-group">
                    <label><b>Title</b></label>
                    <input type="text" placeholder="title" ref={titleRef}></input>
                </div>
                <div className="form-group">
                    <label><b>Description</b></label>
                    <input type="text" placeholder="description" ref= {descriptionRef}></input>
                </div>
                <div className="form-group">
                    <label><b>Price</b></label>
                    <input type="text" placeholder="price" ref={priceRef}></input>
                </div>
                <div className="form-group">
                   <button onClick={()=>submitForm()} id="submitButtom">Create Event</button>
                </div>
            </div>
           
            {eventList.map(event => {
                 return <EventList event={event} token = {token}/>
            })}
           
        </div>
    )
}
export default CreateEvent;
