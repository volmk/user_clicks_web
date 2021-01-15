import React, {useEffect} from 'react'
import {Link, useHistory} from "react-router-dom"
import useRequest from "../hooks/useRequest";
import useQuery from "../hooks/useQuery";
import Loading from "../components/scripts/Loading";
import Paginate from "../components/scripts/Paginate";

function UserListPage({location}) {
    const page = useQuery(location.search, 'page', 1)

    const {data, loading, error} = useRequest(`/api/users?page=${page}`)
    const history = useHistory();

    useEffect(() => {
        if (data.page && page !== data.page) {
            history.push(`/users?page=${data.page}`)
        }
    }, [data, history, page])
    return (
        <div>
            <Link to='/'>Home</Link>
            {loading ? (
                <Loading/>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    {data.users.map((e, i) =>
                        <div key={i}>
                            <Link to={`users/${e.id}`}>{e.first_name}</Link>
                            <br/>
                        </div>
                    )}
                    <Paginate toLink='/users?page='
                              page={page}
                              maxPage={data.maxPage}/>
                </div>
            )}
        </div>
    );
}

export default UserListPage;