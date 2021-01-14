import React from 'react';
import {Link} from "react-router-dom";

function UserListPage(props) {
    return (
        <div>
            <Link to='/'>Home</Link>
            <br/>
            <Link to='/users/1'>User 1</Link>
            <br/>
            <Link to='/users/2'>User 2</Link>
        </div>
    );
}

export default UserListPage;