import React from 'react';
import {Link, useParams} from "react-router-dom";
import useRequest from "../hooks/useRequest";
import Loading from "../components/scripts/Loading";

function UserPage() {
    const {uid} = useParams()
    const {data, loading, error} = useRequest(`/api/users/${uid}`)

    return (
        <div>
            User {uid}
            <br/>
            <Link to='/'>Home</Link>
            <br/>
            <Link to='/users'>User list</Link>
            <br/>
            {loading ? (
                <Loading/>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    {data.first_name} {data.last_name}
                    <ul>
                        {data.stat.map((e,i) =>
                            <li key={i}>
                                {e.date} {e.page_views} {e.clicks}
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default UserPage;