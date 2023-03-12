
import React from 'react'
import { makeRequest } from '../request'

export default function useFetch(url){
    const [loading,setLoading] = React.useState(false)
    const [error,setError] = React.useState(false)
    const [valueX,setValue] = React.useState(null)

    React.useEffect(()=>{
        async function getItem(){
            try{
                setLoading(true) 
                const res = await makeRequest(url)
                setValue(res.data.data)
                
            }catch(e){
                setError(true)
                console.log(e)
            }
            setLoading(false)
        }
        getItem()
    },[url])
    return {valueX,loading,error}
}