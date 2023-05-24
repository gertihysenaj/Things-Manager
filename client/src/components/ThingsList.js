import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ThingsList(props) {
    const { things, setThings, update, setUpdate } = props;
    const [recentThings, setRecentThings] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/things')
            .then(res => {
                setThings(res.data.things);
            })
            .catch(err => console.log(err));
    }, [update]);

    // useEffect(() => {
    //     axios.get('http://localhost:8000/api/things')
    //       .then(res => {
    //         let sortedThings = [...res.data.things];
    //         sortedThings.sort((a, b) => b.likes - a.likes);
    //         setThings(sortedThings);
    //       })
    //       .catch(err => console.log(err));
    //   }, [update]);
    

    // useEffect(() => {
    //     setRecentThings(things.slice(Math.max(things.length - 3, 0)));
    // }, [things]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/things/recent')
            .then(res => {
                console.log(res.data);
                setRecentThings(res.data.things);
            })
            .catch(err => console.log(err));
    }, [update]);


    function handleLike(id) {
        axios.put(`http://localhost:8000/api/things/${id}/like`)
            .then(res => {
                setUpdate(update => !update);
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Thing</th>
                                <th>Likes</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {things.map(thing => (
                                <tr key={thing._id}>
                                    <td>{thing.name}</td>
                                    <td>{thing.likes}</td>
                                    <td>
                                        <button className="btn btn-primary me-1" onClick={() => handleLike(thing._id)}>Like</button>
                                        <Link className="btn btn-secondary" to={`/edit/${thing._id}`}>Edit</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="col-lg-6">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Recent Thing</th>
                                <th>Likes</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentThings.map(thing => (
                                <tr key={thing._id}>
                                    <td>{thing.name}</td>
                                    <td>{thing.likes}</td>
                                    <td>
                                        <button className="btn btn-primary me-1" onClick={() => handleLike(thing._id)}>Like</button>
                                        <Link className="btn btn-secondary" to={`/edit/${thing._id}`}>Edit</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ThingsList;
