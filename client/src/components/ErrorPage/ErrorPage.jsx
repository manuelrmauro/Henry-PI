import React, {useEffect} from 'react'
import {Link, useHistory } from 'react-router-dom'

function ErrorPage() {
const history = useHistory()

  useEffect(()=>{
    setTimeout(()=>{
      history.push('/app')
    },5000)
  },[history])


  return (
    <div>
      <h1>ERROR 404 PAGE NOT FOUND</h1>
      <p>If you don't be redirect to the main page in the next 5 seconds <Link to='/app'>click here...</Link></p>
    </div>
  )
}

export default ErrorPage
