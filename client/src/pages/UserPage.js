import React from 'react';
import {Link, useParams} from "react-router-dom";

function UserPage({match}) {
    const {uid} = useParams()
    console.log(uid)
    return (
        <div>
            User {uid}
            <br/>
            <Link to='/'>Home</Link>
            <br/>
            <Link to='/users'>User list</Link>
        </div>
    );
}

export default UserPage;