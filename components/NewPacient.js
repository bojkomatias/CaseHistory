import React, { useState } from "react";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Input,
    FormControl,
    FormLabel,
    IconButton,
    InputGroup,
    InputLeftAddon,
    Radio,
    RadioGroup,
    useDisclosure,
    Box, Text, Stack, FormHelperText, useToast, Form
} from "@chakra-ui/react";
import { AddIcon, CloseIcon, CheckIcon, EditIcon } from "@chakra-ui/icons";


// Capaz usar un Store, storeando los patientes de una!

const NewPacient = ({ setLocalPatients, existingPatient }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef()

    const toast = useToast()

    const [patient, setPatient] = useState(existingPatient || {})

    async function createPatient() {
        onClose()
        await fetch(`/api/patients/add`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...patient })
        })
            .then(res => {
                res.json().then(d => console.log(d))
                if (res.status == 200) {
                    // Actualizar solo el paciente cambiado! >D
                    if (existingPatient == undefined) {
                        setLocalPatients(prevS => [...prevS, patient])
                    } else {
                        setLocalPatients(prevS => [...prevS.filter(p => p._id !== patient._id), patient])
                    }
                    toast({
                        title: "Paciente Guardado.",
                        description: "Se guardo correctamente el paciente.",
                        status: "success",
                        duration: 6000,
                        isClosable: true,
                    })
                } else {
                    toast({
                        title: "Error.",
                        description: "Ha habido un error al guardar el paciente.",
                        status: "error",
                        duration: 6000,
                        isClosable: true,
                    })
                }
            })
    }

    return (
        <>
            {existingPatient == undefined ? <IconButton
                onClick={onOpen}
                justifySelf='end'
                mx={[1]}
                variant="outline"
                colorScheme="teal"
                title='Crear Nuevo Paciente'
                w={[6, 8, 12]}
                h={[6, 8, 12]}
                icon={<AddIcon w={[4, 6]}
                    h={[4, 6]} />}
            /> : <IconButton
                onClick={onOpen}
                mx={[1]}
                variant="outline"
                colorScheme="teal"
                title='Editar Datos'
                w={[6, 8, 12]}
                h={[6, 8, 12]}
                icon={<EditIcon w={[4, 6]}
                    h={[4, 6]} />}
            />}
            <Drawer
                isOpen={isOpen}
                placement="right"
                size='md'
                onClose={onClose}
                initialFocusRef={firstField}

            >
                <form onSubmit={e => {
                    e.preventDefault()
                    createPatient()
                }}>

                    <DrawerOverlay>
                        <DrawerContent>
                            <DrawerCloseButton />
                            {existingPatient == undefined ? <DrawerHeader>Crear Nuevo Paciente</DrawerHeader> : <DrawerHeader>{existingPatient.nombre}</DrawerHeader>}

                            <DrawerBody>
                                <Stack spacing={1} fontSize='sm'>
                                    <FormControl isRequired>
                                        <FormLabel>Nombre</FormLabel>
                                        <Input value={patient.nombre} ref={firstField} onChange={e => setPatient({ ...patient, ...{ nombre: `${e.target.value}` } })} />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Apellido</FormLabel>
                                        <Input value={patient.apellido} onChange={e => setPatient({ ...patient, ...{ apellido: `${e.target.value}` } })} />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Nº Documento</FormLabel>
                                        <Input value={patient.dni} onChange={e => setPatient({ ...patient, ...{ dni: Number(e.target.value) } })} />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Fecha de Nacimiento</FormLabel>
                                        <FormHelperText> DD/MM/AAAA</FormHelperText>
                                        <Input value={patient.nacimiento} onChange={e => setPatient({ ...patient, ...{ nacimiento: `${e.target.value}` } })} />
                                    </FormControl>
                                    <FormControl >
                                        <FormLabel>Sexo</FormLabel>
                                        <RadioGroup pb={4} defaultValue={existingPatient == undefined ? null : existingPatient.sexo}>
                                            <Stack direction="row" justifyContent='space-around'>
                                                <Radio value="Masculino" onChange={e => setPatient({ ...patient, ...{ sexo: `${e.target.value}` } })}>Masculino</Radio>
                                                <Radio value="Femenino" onChange={e => setPatient({ ...patient, ...{ sexo: `${e.target.value}` } })}>Femenino</Radio>
                                            </Stack>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel> Estado Civil </FormLabel>
                                        <Input value={patient.estado_civil} onChange={e => setPatient({ ...patient, ...{ estado_civil: `${e.target.value}` } })} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel> Nacionalidad </FormLabel>
                                        <Input value={patient.nacionalidad} onChange={e => setPatient({ ...patient, ...{ nacionalidad: `${e.target.value}` } })} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel> Dirección </FormLabel>
                                        <Input value={patient.domicilio} onChange={e => setPatient({ ...patient, ...{ domicilio: `${e.target.value}` } })} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel> Telefono </FormLabel>
                                        <Input value={patient.telefono} onChange={e => setPatient({ ...patient, ...{ telefono: `${e.target.value}` } })} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel> Obra Social </FormLabel>
                                        <Input value={patient.obra_social} onChange={e => setPatient({ ...patient, ...{ obra_social: `${e.target.value}` } })} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel> Numero de Afiliado </FormLabel>
                                        <Input value={patient.afiliado} onChange={e => setPatient({ ...patient, ...{ afiliado: `${e.target.value}` } })} />
                                    </FormControl>
                                </Stack>
                            </DrawerBody>

                            <DrawerFooter justifyContent='space-around'>
                                <IconButton
                                    variant='outline'
                                    size='lg'
                                    colorScheme="red"
                                    aria-label="Call Sage"
                                    fontSize={20}
                                    icon={<CloseIcon />}
                                    onClick={onClose}
                                />
                                <IconButton
                                    variant='outline'
                                    size='lg'
                                    colorScheme="green"
                                    aria-label="Call Sage"
                                    fontSize={22}
                                    icon={<CheckIcon />}
                                    type='submit'


                                />
                            </DrawerFooter>

                        </DrawerContent>
                    </DrawerOverlay>
                </form>
            </Drawer>
        </>
    )
}

export default NewPacient;
