import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import { Container, Input, Button, Flex, Popover, Box, PopoverTrigger, Portal, PopoverBody, PopoverContent, PopoverFooter, PopoverCloseButton, PopoverHeader, Heading, Text, Table, Tr, Td, useToast, Code, FormControl, FormLabel, Tbody } from "@chakra-ui/react";
import { motion } from "framer-motion"
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { connectToDatabase } from '../../database'
import { ObjectId } from 'mongodb'




const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" }
}

const History = ({ patient, history }) => {
  const router = useRouter()
  const { id } = router.query

  const [isOpen, setIsOpen] = useState(false)
  const toast = useToast()
  // const [patient, setPatient] = useState({})

  const [newEntry, setNewEntry] = useState({})

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await fetch(`/api/pacients/${id}`, {
  //       method: 'GET',
  //       headers: {
  //         'Accept': 'application/json',
  //       },
  //     })
  //       .then(res => res.json())
  //       .then(data => setPatient(data.patient))
  //   }
  //   fetchData()
  // }, [id]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await fetch(`/api/entries/get`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json',
  //       },
  //       body: JSON.stringify(patient)
  //     })
  //       .then(res => res.json())
  //       .then(data => setHistory(data.entries))
  //   }
  //   fetchData()
  // }, [history])

  async function createEntry() {

    await fetch(`/api/entries/add`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...newEntry, patientId: patient._id, createdAt: Date.UTC() })
    })
      .then(res => {
        setNewEntry({})
        if (res.status == 200) {

          toast({
            title: "Nueva Entrada Guardada.",
            description: "Se cargo correctamente un nueva entrada.",
            status: "success",
            duration: 6000,
            isClosable: true,
          })

        } else {
          toast({
            title: "Error.",
            description: "Ha habido un error al crear una nueva entrada.",
            status: "error",
            duration: 6000,
            isClosable: true,
          })
        }
      })
  }

  return (
    <Box h='100vh'>
      <Header />

      <Flex h='100vh' width='100%' overflowY='auto' >
        {patient === undefined ? <></> :
          <DatosPaciente patient={patient} />}
        <Container boxShadow="dark-lg" p="6" >

          <Heading as="h1" size="xl" p='8' >
            Historia Clínica
          </Heading>
          <form onSubmit={e => {
            e.preventDefault()
            createEntry()
          }}>
            <FormControl isRequired>
              <FormLabel>General</FormLabel>
              <Input onChange={e => setNewEntry({ ...newEntry, ...{ general: `${e.target.value}` } })} />
            </FormControl>
            <Button type='submit'>Crear</Button>
          </form>

          <Heading> Aca te mostraria las viejas entradas</Heading>

          {history.map(h => <p key={h._id}>{h.general}</p>)}


        </Container>
      </Flex>
      <Footer />
    </Box >
  )
}

function DatosPaciente({ patient }) {
  return (
    <Popover closeOnBlur={false} placement="right" >
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger>
            <Button alignSelf='center' justifySelf='right' fontWeight='bold' fontSize='2xl'>{patient.apellido}, {patient.nombre}</Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverHeader><Text fontSize='lg' fontWeight='semibold' ml='12'>{`${patient.apellido}, ${patient.nombre}`}</Text></PopoverHeader>
              <PopoverBody>
                <Table>
                  <Tbody>
                    {Object.entries(patient).map(p => {
                      if (!p[0].includes('idM') && !p[0].includes('_id') && !p[0].includes('At') && !p[0].includes('__v')) {
                        return (
                          <div key={p._id}>
                            <Tr>
                              <Td textTransform='capitalize'>{p[0].replace('_', ' ')}</Td>
                              <Td>{p[1]}</Td>
                            </Tr>
                          </div>
                        )
                      }
                    })}
                  </Tbody>
                </Table>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  )
}

export default History;

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const db = await connectToDatabase();
  const res = await db.collection("patients").find({}).toArray();
  const patients = await JSON.parse(JSON.stringify(res))

  // Get the paths we want to pre-render based on posts
  const paths = patients.map((patient) => ({
    params: { id: patient._id },
  }))

  console.log(paths)

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
  const db = await connectToDatabase();

  const res = await db.collection("patients").findOne({ _id: ObjectId(params.id) });
  const patient = JSON.parse(JSON.stringify(res))


  const resEntries = await db.collection("entries").find({ patientId: ObjectId(params.id) }).toArray();
  const entries = JSON.parse(JSON.stringify(resEntries))

  return {
    props: { patient: patient, history: entries },
    revalidate: 10,
  }
}
