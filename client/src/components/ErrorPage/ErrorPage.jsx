import React, {useEffect} from 'react'
import {Link, useHistory } from 'react-router-dom'
import styles from './errorpage.module.css'

function ErrorPage() {
const history = useHistory()

  useEffect(()=>{
    setTimeout(()=>{
      history.push('/app')
    },5000)
  },[history]) 


  return (
    <div className={styles.errorPage}>
      <div className={styles.epTitle}><b>ERROR 404</b> PAGE NOT FOUND</div>
      <p>If you don't be redirect to the main page in the next 5 seconds <Link to='/app'>click here...</Link></p>
    </div>
  )
}

export default ErrorPage
