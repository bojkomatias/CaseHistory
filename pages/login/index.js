import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Header from "../../components/Header"
import Login from "../../components/Login"
import Footer from "../../components/Footer"
import { Box, Container, useColorModeValue, Text, Center, Spinner } from "@chakra-ui/react"
import cookie from 'js-cookie'
import { signIn, signOut, useSession, providers } from 'next-auth/client'


export default function SignIn({ providers }) {
  const [session, loading] = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/')
    }
  }, [session])
  console.log(loading)

  return (

    <Box bgGradient={useColorModeValue('radial(white,gray.200)', 'radial(gray.600,gray.900)')}>
      <Head>
        <title>Case History</title>
        <link rel="icon" href="/CaseHistory-Logo.png" />
      </Head>
      <Header />
      <Container h='90vh' minW="100%" overflow='auto'>
      {!loading ? <Login loading={loading} /> : <Center><Spinner mt='36' size="xl" /></Center>}
      </Container>
      <Footer />
    </Box>
  )
}

SignIn.getInitialProps = async (context) => {
  return {
    providers: await providers(context)
  }
}