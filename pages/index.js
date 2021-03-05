import Head from 'next/head'
import Header from "../components/Header"
import PacientTable from "../components/PacientTable"
import Footer from "../components/Footer"
import { Box, Center, useColorModeValue, Flex, Spacer, Spinner, Container, cookieStorageManager } from "@chakra-ui/react"
import { getSession, signIn, signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { addLocale } from 'next/dist/next-server/lib/router/router'



export default function Home({ pacc }) {
  const router = useRouter()
  const [session, loading] = useSession()

  useEffect(() => {
    if (!(session || loading)) {
      router.push('/login')
    }
  }, [session, loading])
  return (

    <Box h='100vh' bgGradient={useColorModeValue('radial(white,gray.100)', 'radial(gray.700,gray.800)')}>
      <Head>
        <title>Case History</title>
        <link rel="icon" href="/CaseHistory-Logo.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Header />
      <Container h='85vh' minW="100%" overflow='auto'>
        {!session || loading ? <Center><Spinner mt='36' size="xl" /></Center> : <PacientTable patients={pacc} />}
      </Container>
      <Spacer />
      <Footer />

    </Box>

  )
}
