import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios';


export default function Home() {

  axios.get('http://localhost:5000/users/').then( res => console.log(res))

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
 HOLA!

    </div>
  )
}
