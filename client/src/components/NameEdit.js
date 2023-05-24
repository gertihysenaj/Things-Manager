import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function NameEdit () {
    const {id} = useParams();
    const [thing, setThing] = useState(null);
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8000/api/things/${id}`)
            .then(response => {
                setThing(response.data);
                setName(response.data.name);
            })
    }, [id]);

function handleNameSubmit(event) {
    event.preventDefault();

    axios.put(`http://localhost:8000/api/things/${id}`, {
        name
    })
    .then(response => {
        setName(response.data.name); 
        navigate(`/edit/${id}`);
    })
    .catch(err => {
        console.log(err.response.data);
        if (err.response && err.response.status === 400) {
            if (err.response.data.errors && err.response.data.errors.name) {
                setErrorMessage(err.response.data.errors.name.message);
            } else if (err.response.data.message) {
                setErrorMessage(err.response.data.message);
            } else {
                setErrorMessage('Something went wrong. Please try again.');
            }
        } else {
            console.log(err);
        }
    });
}


    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <h1>Like Dashboard</h1>
                    <Link to="/">Go Home</Link>
                </div>
            </nav>
            <div className="container mt-5 ">
                <h2 >Edit "{thing ? thing.name : "Loading..."}"</h2>
                <form onSubmit={handleNameSubmit}>
                    <div>
                        <label className="form-label mt-3 me-2">Name: </label>
                        <input  type="text"  value={name} onChange={e => setName(e.target.value)}/>
                    </div>
                <button className="btn btn-primary mt-3">Update Name</button>
                </form>
                {errorMessage && <p  className="text-danger">{errorMessage}</p>}
                </div>
            </div>
        );
};

export default NameEdit;

