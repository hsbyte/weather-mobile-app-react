import { useState, useEffect } from 'react'
import Axios from 'axios'

export const useHttp = url => {
    const [isReady, setIsReady] = useState(false)
    const [fetchedData, setFetchedData] = useState(null)

    useEffect(async url => {
        await Axios.get(url)
            .then(res => {
                setFetchedData(res.data)
                setIsReady(true)
            })
            .catch(error => {
                setFetchedData(error.response)
                setIsReady(true)
            })
    })
    return [isReady, fetchedData]
}