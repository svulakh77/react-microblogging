import { useEffect, useState } from "react"
import React from 'react'
import axios from 'axios'

function DataFetching({tweets, setTweets}) {
        async function fetchData (){
        try{
        const response = await axios.get('https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet')
        console.log(response)
        setTweets(response.tweets)
    }catch (error){
            console.log (error)
         }
          }
          useEffect(()=>{
          fetchData()
          },[])
  return (
    <div>
        <ul>
        {
        tweets.map(tweets=> <li key={tweets.id}>{tweets.title}</li>

        )}
  </ul>
    </div>
  )
}

export default DataFetching