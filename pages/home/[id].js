import Head from 'next/head'
import Header from "../../components/Header"
import PacientTable from "../../components/PacientTable"
import Footer from "../../components/Footer"
import { Box, Center, useColorModeValue, Flex, Spacer, Spinner, Container, cookieStorageManager } from "@chakra-ui/react"
import { getSession, signIn, signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { connectToDatabase } from '../../database'
import { ObjectId } from 'mongodb'





const Homepage = ({ patients }) => {

  return (

    <Box h='100vh' bgGradient={useColorModeValue('radial(white,gray.100)', 'radial(gray.700,gray.800)')}>
      <Head>
        <title>Case History</title>
        <link rel="icon" href="/CaseHistory-Logo.png" />
      </Head>
      <Header />
      <Container h='85vh' minW="100%" overflow='auto'>
        <PacientTable patients={patients} />
      </Container>
      <Spacer />
      <Footer />

    </Box>

  )
}

export default Homepage;


export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const db = await connectToDatabase();
  const res = await db.collection("users").find({}).toArray();
  const users = JSON.parse(JSON.stringify(res))

  // Get the paths we want to pre-render based on posts
  const paths = users.map((user) => ({
    params: { id: user._id },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {

  const db = await connectToDatabase();
  const collection = await db.collection("patients")

  //const id = session.user._id
  const res = await collection.find({ idMedico: ObjectId(params.id) }).toArray();
  const patients = JSON.parse(JSON.stringify(res))


  return {
    props: { patients: patients },
    revalidate: 1,
  }
}