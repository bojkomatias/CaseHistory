import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import { IconButton, Input, Button, Flex, Popover, Box, PopoverTrigger, Portal, PopoverBody, PopoverContent, PopoverFooter, PopoverCloseButton, PopoverHeader, Heading, Text, Table, Tr, Td, useToast, Code, FormControl, FormLabel, Tbody, Divider, Textarea, Stack, Center } from "@chakra-ui/react";
import { SearchIcon, AddIcon, EditIcon, CopyIcon } from "@chakra-ui/icons";
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { connectToDatabase } from '../../database'
import { ObjectId } from 'mongodb'


const History = ({ patient, history }) => {
  const router = useRouter()
  const { id } = router.query
  const [isOpen, setIsOpen] = useState(false)
  const toast = useToast()
  // const [patient, setPatient] = useState({})

  const [newEntry, setNewEntry] = useState({})

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

      <Flex h='100vh' width='100%' >

        <Box p='6' width='full'>
          <Center>
            <Stack direction='row' mt={10} alignItems='center'>
              <Heading as="h1" size="lg" >
                Historia Clínica de {`${patient.apellido}, ${patient.nombre}`}
              </Heading>
              {patient === undefined ? <></> :
                <DatosPaciente patient={patient} />}
            </Stack>
          </Center>
          <form onSubmit={e => {
            e.preventDefault()
            createEntry()
          }}>
            <FormControl isRequired>
              <FormLabel>General</FormLabel>
              <Textarea onChange={e => setNewEntry({ ...newEntry, ...{ general: `${e.target.value}` } })} />
            </FormControl>
            <Button type='submit'>Crear</Button>
          </form>
          <Divider py='2' />
          <Heading size='md' > Aca te mostraria las viejas entradas</Heading>

          {history === null || undefined ? <Text>Este paciente no tiene Entradas </Text> : history.map(h => <p key={h._id}>{h.general}</p>)}


        </Box>
      </Flex>
      <Footer />
    </Box >
  )
}

function DatosPaciente({ patient }) {
  return (
    <Popover closeOnBlur={false} placement="left-start" >
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger>
            <IconButton
              variant="ghost"
              colorScheme="teal"
              title='Ver Datos'
              w={[8]}
              h={[8]}
              icon={<SearchIcon w={[5]}
                h={[5]} />}
            />
          </PopoverTrigger>
          <Portal>
            <PopoverContent overflowY='auto'>
              <PopoverBody>
                <Table fontSize='sm' >
                  <Tbody>
                    {Object.entries(patient).map(p => {
                      if (!p[0].includes('idM') && !p[0].includes('_id') && !p[0].includes('At') && !p[0].includes('__v')) {
                        return (
                          <Tr key={p[0]}>
                            <Td textTransform='capitalize'>{p[0].replace('_', ' ')}</Td>
                            <Td>{p[1]}</Td>
                          </Tr>
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
  const patients = JSON.parse(JSON.stringify(res))

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
