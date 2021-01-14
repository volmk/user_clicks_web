import React from 'react';
import {Link} from "react-router-dom";

function UserPage({match}) {
    const uid = match.params.uid
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