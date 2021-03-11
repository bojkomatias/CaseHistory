import Head from 'next/head'
import Header from "../components/Header"
import PacientTable from "../components/PacientTable"
import Footer from "../components/Footer"
import { Box, Center, useColorModeValue, Flex, Spacer, Spinner, Container, cookieStorageManager } from "@chakra-ui/react"
import { getSession, signIn, signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { addLocale } from 'next/dist/next-server/lib/router/router'
import { JsonWebTokenError } from 'jsonwebtoken'





export default function Home() {
  const router = useRouter()
  const [session, loading] = useSession()

  useEffect(() => {
    if (!(session || loading) || session === undefined || session === null) {
      router.push('/login')
    }
    else {
      router.push(`/home/${session.user._id}`)
    }
  }, [session, loading])
  return (

    <Box h='100vh' bgGradient={useColorModeValue('radial(white,gray.100)', 'radial(gray.700,gray.800)')}>

      <Header />
      <Container h='85vh' minW="100%" overflow='auto'>
        <Center><Spinner mt='36' size="xl" /></Center>
      </Container>
      <Spacer />
      <Footer />

    </Box>

  )
}

