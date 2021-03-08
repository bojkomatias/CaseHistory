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


const PacientTable = ({ patients }) => {
    const [session, loading] = useSession()
    const router = useRouter()
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
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
    }, [searchTerm]);

    return (
        <Flex h='100vh' width='100%'>
            <Stack width='full' mt={20} >
                <Stack direction='row' alignItems='baseline'>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents="none"
                            children={<SearchIcon color="gray.600" />}
                        />
                        <Input placeholder="Buscar pacientes..." value={searchTerm} onChange={handleChange} />
                    </InputGroup>
                    <NewPacient />
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
                                <Td>{p.nombre} {p.apellido}</Td>
                                <Td>{p.dni}</Td>
                                <Td isNumeric>
                                    <IconButton
                                        mx={1}
                                        variant="outline"
                                        colorScheme="teal"
                                        title='Editar Datos'
                                        w={[6, 8, 12]}
                                        h={[6, 8, 12]}
                                        icon={<EditIcon w={[4, 6]}
                                            h={[4, 6]} />}
                                    />

                                    <IconButton
                                        mx={1}
                                        variant="outline"
                                        colorScheme="teal"
                                        title='Ver Historia Clinica'
                                        w={[6, 8, 12]}
                                        h={[6, 8, 12]}
                                        icon={<CopyIcon w={[4, 6]}
                                            h={[4, 6]} />}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            router.push(`../history/${p._id}`)
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
