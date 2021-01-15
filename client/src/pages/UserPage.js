import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Loading from "../components/scripts/Loading";
import Breadcrumb from "../components/scripts/Breadcrumb";
import Navbar from "../components/scripts/Navbar";
import Footer from "../components/scripts/Footer";
import './UserPage.scss'
import Plot from "../components/scripts/Plot";
import DateInput from "../components/scripts/DateInput";
import useRequest from "../hooks/useRequest";

const generateStat = () => {
    const randomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min))
    return Array.from({length: 10}).map((_, idx) => {
        return {
            date: '2019-10-' + (idx + 1).toString().padStart(2, '0'),
            page_views: randomInteger(0, 999),
            clicks: randomInteger(0, 999)
        }
    })
}

const getKey = (array, key) => {
    const res = [['date', key]]
    for (const item of array) {
        res.push([item['date'], item[key]])
    }
    return res
}

function UserPage() {
    const [minVal, setMinVal] = useState('2019-09-10')
    const [maxVal, setMaxVal] = useState('2019-11-10')
    const [title, setTitle] = useState('User')
    const [links, setLinks] = useState([
        {title: 'Main page', link: '/'},
        {title: 'User statistics', link: '/users'},
        {title: 'User', link: `/users`},
    ])

    const {uid} = useParams()
    const {data, loading, error} = useRequest(`/api/users/${uid}?dateFrom=${minVal}&dateTo=${maxVal}`)

    useEffect(() => {
        const username = data.first_name + ' ' + data.last_name
        setTitle(username)
        setLinks([
            {title: 'Main page', link: '/'},
            {title: 'User statistics', link: '/users'},
            {title: username, link: `/users/${uid}`},
        ])
    }, [uid, data])

    const makeRequest = (fromVal, toVal) => {
        setMinVal(fromVal)
        setMaxVal(toVal)
    }

    return <>
        <Navbar/>
        <div className="user_page">
            <Breadcrumb links={links}/>
            <h1 className="user_page__title">{title}</h1>
            <DateInput
                makeRequest={makeRequest}
                minInit={minVal}
                maxInit={maxVal}
            />
            {loading ? (
                <Loading/>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <Plot
                        min={minVal}
                        max={maxVal}
                        data={getKey(data.stat, 'clicks')}
                        label='Clicks'
                    />
                    <Plot
                        min={minVal}
                        max={maxVal}
                        data={getKey(data.stat, 'page_views')}
                        label='Views'
                    />
                </>
            )}
        </div>
        <Footer/>
    </>
}

export default UserPage;