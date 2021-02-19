import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from "../components/Header"
import { Switch, useColorMode, Button} from "@chakra-ui/react"


export default function Home() {

  function DarkMode() {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Switch onChange={toggleColorMode} size="lg">
          Toggle {colorMode === "light" ? "Dark" : "Light"}
        </Switch>
    )
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <DarkMode/>
    </div>
  )
}
