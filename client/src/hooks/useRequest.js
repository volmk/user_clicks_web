import {useEffect, useState} from 'react'
import axios from 'axios'

const useRequest = (initUrl) => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let ignore = false
        const fetchProduct = async () => {
            try {
                if (!ignore) {
                    setLoading(true)
                    const {data} = await axios(initUrl)
                    setData(data)
                }
            } catch (err) {
                setError(err)
            }
            setLoading(false)

        }
        fetchProduct()
        return (() => {
            ignore = true
        })
    }, [initUrl])

    return {data, loading, error}
}

export default useRequest