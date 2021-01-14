import {Link} from "react-router-dom";
import React from "react";

const MainPage = () => {
    return <div>
        Home
        <br/>
        <Link to='/users'>Users</Link>
    </div>
}

export default MainPage