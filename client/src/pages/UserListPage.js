import React from 'react'
import Navbar from "../components/scripts/Navbar";
import Breadcrumb from "../components/scripts/Breadcrumb";
import Footer from "../components/scripts/Footer";
import UserList from "../components/scripts/UserList";
import './UserListPage.scss'

function UserListPage({location}) {
    const links = [
        {title: 'Main page', link: '/'},
        {title: 'User statistics', link: '/users'}
    ]

    return <>
        <Navbar/>
        <div className="list_page">
            <Breadcrumb links={links}/>
            <h1 className="list_page__title">Users statistics</h1>
            <UserList location={location}/>
        </div>
        <Footer/>
    </>
}

export default UserListPage;