import React, { useState, useEffect } from "react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Text,
    Center,
    Spinner,
    Button,
    Stack,
    InputGroup,
    Flex,
    Input,
    IconButton,
    InputLeftElement,
    useDisclosure,
    Box
} from "@chakra-ui/react";
import { SearchIcon, AddIcon, EditIcon, CopyIcon } from "@chakra-ui/icons";
import { useSession } from 'next-auth/client'
import NewPacient from './NewPacient'
import { useRouter } from 'next/router'


// Capaz usar un Store, storeando los pacientes de una!


const PacientTable = () => {
    const [session, loading] = useSession()

    const router = useRouter()

    const [patients, setPatients] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            await fetch(`/api/pacients`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idMedico: session.user._id })
            })
                .then(res => res.json())
                .then(data => setPatients(data.pacients))
        }
        fetchData()
    }, [patients]);

    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState(patients);
    const handleChange = event => {
        setSearchTerm(event.target.value);
    };
    useEffect(() => {
        if (patients !== undefined) {
            const results = patients.filter(person =>
                person.nombre.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchResults(results);
        }
    }, [searchTerm, patients]);

    return (
        <Flex as='main' direction='column' align='center'>
            <Stack pt="20" pb="8" spacing={8} width='70%'>

                <Stack direction="row">
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents="none"
                            children={<SearchIcon color="gray.300" />}
                        />
                        <Input placeholder="Buscar pacientes..." value={searchTerm} onChange={handleChange} />
                    </InputGroup>
                    <NewPacient setPatients={() => setPatients()} patients={patients} />
                </Stack>

                <Table>
                    <Thead>
                        <Tr>
                            <Th><Text fontStyle='italic' fontSize='sm'>Paciente</Text></Th>
                            <Th><Text fontStyle='italic' fontSize='sm'>DNI</Text></Th>
                            <Th isNumeric><Text fontStyle='italic' fontSize='sm'>Opciones</Text></Th>

                        </Tr>
                    </Thead>
                    <Tbody>
                        {searchResults.map(p =>
                            <Tr key={p._id}>
                                <Td><Text fontWeight='bold' fontSize='lg'>{p.nombre} {p.apellido}</Text></Td>
                                <Td><Text fontWeight='bold' fontSize='lg'>{p.dni}</Text></Td>
                                <Td isNumeric>
                                    <IconButton
                                        mx={1}
                                        variant="outline"
                                        colorScheme="teal"
                                        title='Editar Datos'
                                        size="lg"
                                        icon={<EditIcon />}
                                    />

                                    <IconButton
                                        mx={1}
                                        variant="outline"
                                        colorScheme="teal"
                                        title='Ver Historia Clinica'
                                        size="lg"
                                        icon={<CopyIcon />}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            router.push(`history/${p._id}`)
                                        }}
                                    />
                                </Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </Stack>
        </Flex>
    );
};
export default PacientTable;
