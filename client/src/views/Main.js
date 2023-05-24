import React from 'react';
import { useState, useEffect } from 'react';
import ThingsList from '../components/ThingsList';
import CreateThing from '../components/CreateThing';
import axios from 'axios';

function Main() {
  const [things, setThings] = useState([]);
  const [update, setUpdate] = useState(false);



  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
           <h1>Like Dashboard</h1>
        </div>
      </nav>
      <h4 className="ms-4 mt-4">Like these things!</h4>
      <ThingsList things={things} setThings={setThings} update={update} setUpdate={setUpdate} />
      <CreateThing update={update} setUpdate={setUpdate} things={things} setThings={setThings}/>
      
    </div>
  );
}

export default Main;
