import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreateThing(props) {
    const {things , setThings, update, setUpdate} = props;
    const [thingName, setThingName] = useState("");  
    const [errorMessage, setErrorMessage] = useState('');
  
    const createThing = () => {
      axios.post('http://localhost:8000/api/things', { name: thingName, likes: 0 })
        .then(res => {
          setThings([...things, res.data]);
          setThingName('');
          setUpdate(update => !update);  
          setErrorMessage('');
        })
        .catch(err => {
          console.log(err.response.data);
          if (err.response && err.response.status === 400) {
              if (err.response.data.errors && err.response.data.errors.name) {
                  setErrorMessage(err.response.data.errors.name.message);
              } else if (err.response.data.message) {
                  setErrorMessage(err.response.data.message);
              } else {
                  setErrorMessage(err.response.data); 
              }
          } else {
              console.log(err);
          }
      });
      
      
      
      
      
};
    const handleSubmit = (event) => {
      event.preventDefault();
  
      // if (thingName.length < 3) {
      //   setErrorMessage('Thing name must be at least 3 characters long.');
      // } else if (things.some(thing => thing.name === thingName)) {
      //   setErrorMessage('Thing name must be unique.');
      // } else {
        createThing();
      // }
    };
  
    return (
      <div>
        <h3 className="ms-4 mt-4">Don't see what you like? Add your own!</h3>
        <form onSubmit={handleSubmit} className="ms-4 mt-3">
          <input type="text" value={thingName} onChange={(e) => setThingName(e.target.value)} />
          <button type="submit">Add Thing</button>
        </form>
        {errorMessage && <p  className="ms-4 mt-2 text-danger" >{errorMessage}</p>}
      </div>
    );
  }
  
  export default CreateThing;
  