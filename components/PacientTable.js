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
import { SearchIcon, AddIcon, EditIcon, CopyIcon, TriangleDownIcon, TriangleUpIcon, ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useSession } from 'next-auth/client'
import NewPacient from './NewPacient'
import { useRouter } from 'next/router'


// Capaz usar un Store, storeando los pacientes de una!


const PacientTable = ({ patients }) => {
    const [session, loading] = useSession()
    const router = useRouter()
    const [localPatients, setLocalPatients] = useState(patients)
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const handleChange = event => {
        setSearchTerm(event.target.value);
    };
    const [sortedField, setSortedField] = useState('createdAt');
    const [sortDirection, setSortDirection] = useState(true);

    useEffect(() => {
        if (localPatients !== undefined) {
            const results = localPatients.filter(person =>
                person.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                person.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
                String(person.dni).toLowerCase().includes(searchTerm.toLowerCase())
            );
            const resultsSort = [...results]
            resultsSort.sort((a, b) => {
                if (a[sortedField] < b[sortedField]) {
                    return sortDirection ? -1 : 1;
                }
                return 0;
            })
            setSearchResults(resultsSort);
        }
    }, [searchTerm, localPatients, sortedField, sortDirection]);
    return (
        <Flex h='100vh' justifyContent='center'>
            <Stack width={{ xl: '80%', lg: '90%', base: 'full' }} mt={20} >
                <Stack direction='row' alignItems='center'>
                    <InputGroup>
                        <InputLeftElement h={[8, 10, 12]}
                            pointerEvents="none"
                            children={<SearchIcon h={[3, 4, 4, 6]} w={[3, 4, 4, 6]} color="gray.600" />}
                        />
                        <Input textAlign='center' h={[8, 10, 12]} fontSize={{ xl: 'xl', lg: 'lg', md: 'sm' }} placeholder="Apellido, Nombre, DNI, ..." value={searchTerm} onChange={handleChange} />
                    </InputGroup>
                    <NewPacient setLocalPatients={setLocalPatients} />
                </Stack>
                <Table>
                    <Thead>
                        <Tr>
                            <Th cursor='pointer' onClick={() => {
                                setSortedField('apellido')
                                setSortDirection(prev => !prev)
                            }}> <Text fontStyle='italic'>Paciente {sortedField === 'apellido' ? sortDirection ? <ChevronDownIcon color='teal' fontSize='xl' /> : <ChevronUpIcon color='teal' fontSize='xl' /> : null}</Text></Th>
                            <Th cursor='pointer' onClick={() => {
                                setSortedField('dni')
                                setSortDirection(prev => !prev)
                            }}><Text fontStyle='italic' >DNI {sortedField === 'dni' ? sortDirection ? <ChevronDownIcon color='teal' fontSize='xl' /> : <ChevronUpIcon color='teal' fontSize='xl' /> : null}</Text></Th>
                            <Th hidden={window.screen.width < 460 ? true : false} cursor='pointer' onClick={() => {
                                setSortedField('createdAt')
                                setSortDirection(prev => !prev)
                            }}><Text fontStyle='italic'>Creado {sortedField === 'createdAt' ? sortDirection ? <ChevronDownIcon color='teal' fontSize='xl' /> : <ChevronUpIcon color='teal' fontSize='xl' /> : null}</Text></Th>
                            <Th isNumeric><Text fontStyle='italic'>Opciones</Text></Th>

                        </Tr>
                    </Thead>
                    <Tbody>
                        {searchResults.map(p =>
                            <Tr key={p._id}>
                                <Td>{p.apellido}, {p.nombre}</Td>
                                <Td>{p.dni}</Td>
                                <Td hidden={window.screen.width < 460 ? true : false}>{p.createdAt}</Td>
                                <Td isNumeric>
                                    <NewPacient setLocalPatients={setLocalPatients} existingPatient={p} />
                                    <IconButton
                                        mr={1}
                                        variant="outline"
                                        colorScheme="teal"
                                        title='Ver Historia Clinica'
                                        w={[4, 8, 12]}
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
