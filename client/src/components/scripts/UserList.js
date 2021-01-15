import React, {useEffect} from 'react';
import '../styles/UserList.scss'
import {useHistory} from "react-router-dom";
import useQuery from "../../hooks/useQuery";
import Loading from "./Loading";
import Paginate from "./Paginate";
import useRequest from "../../hooks/useRequest";

function UserList({location}) {
    const page = +useQuery(location.search, 'page', 1)

    const {data, loading, error} = useRequest(`/api/users?page=${page}`)
    const history = useHistory();

    const handleClick = (uid) => {
        return () => {
            history.push(`/users/${uid}`)
        }
    }

    useEffect(() => {
        if (data.page && page !== data.page) {
            history.push(`/users?page=${data.page}`)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    return <>{loading ? (
        <Loading/>
    ) : error ? (
        <p>{error}</p>
    ) : (<>
            <table className='user_table'>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Email</th>
                    <th className='user_table--center'>Gender</th>
                    <th className='user_table--center'>IP address</th>
                    <th className='user_table--center'>Total clicks</th>
                    <th className='user_table--center'>Total page views</th>
                </tr>
                </thead>
                <tbody>
                {data.users.map((user, idx) =>
                    <tr onClick={handleClick(user.id)} key={user.id + idx}>
                        <td>{user.id}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.email}</td>
                        <td className='user_table--center'>{user.gender}</td>
                        <td className='user_table--center'>{user.ip_address}</td>
                        <td className='user_table--center'>{user.total_clicks}</td>
                        <td className='user_table--center'>{user.total_views}</td>
                    </tr>
                )}
                </tbody>
            </table>
            <Paginate toLink='/users?page='
                      page={data.page}
                      maxPage={data.maxPage}/>
        </>
    )}
    </>
}

export default UserList;