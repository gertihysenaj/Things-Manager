import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

function EditThing () {
    const {id} = useParams();
    const [thing, setThing] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/things/${id}`)
            .then(response => {
                setThing(response.data);
            })
    }, []);


    // function handleAddLike() {
    //     axios.put(`http://localhost:8000/api/things/${id}`, {
    //         likes: thing.likes + 1
    //     })
    //     .then(response => {
    //         setThing(response.data);
    //         navigate("/");
    //     })
    //     .catch(console.log);
    // }
    function handleLike() {
        axios.put(`http://localhost:8000/api/things/${id}/like`)
            .then(res => {
                navigate("/");
            })
            .catch(err => console.log(err));
    }


    function handleDelete(event) {
        event.preventDefault();
    
        axios.delete(`http://localhost:8000/api/things/${id}`)
        .then(() => navigate("/"))
        .catch(console.log);
    }
    
    function handleResetLikes(event) {
        event.preventDefault();
    
        axios.put(`http://localhost:8000/api/things/${id}`, {
            likes: 0
        })
        .then(response => {
            setThing(response.data);
            navigate("/")
        })
        .catch(console.log);
    }
    
    function handleChangeName(event) {
        event.preventDefault();
        navigate(`/edit/${id}/name`);
    }
    

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <h1>Like Dashboard</h1>
                    <Link to="/">Go Home</Link>
                </div>
            </nav>
            <div className="container mt-5">
                <h2>"{thing ? thing.name : 'Loading...'}"</h2>
                <h3>Likes: {thing ? thing.likes : 'Loading...'}</h3>

                <div className="d-grid gap-2 d-md-flex justify-content-md-start mt-4">
                    <button className="btn btn-primary me-md-1" onClick={handleLike}>Like!</button>
                    <button className="btn btn-danger me-md-1" onClick={handleDelete}>Delete this Thing</button>
                    <button className="btn btn-secondary me-md-1" onClick={handleResetLikes}>Reset Likes</button>
                    <button className="btn btn-warning" onClick={handleChangeName}>Change Name</button>
                </div>
            </div>
        </div>
    );
};

export default EditThing;

