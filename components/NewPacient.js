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
import { AddIcon, CloseIcon, CheckIcon } from "@chakra-ui/icons";


// Capaz usar un Store, storeando los pacientes de una!

const NewPacient = ({ setPatients, patients }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef()

    const toast = useToast()

    const [pacient, setPacient] = useState()

    async function createPatient() {
        onClose()
        await fetch(`/api/pacients/add`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pacient)
        })
            .then(res => {
                if (res.status == 200) {
                    setPatients()
                    toast({
                        title: "Paciente Guardado.",
                        description: "Se cargo correctamente un nuevo paciente.",
                        status: "success",
                        duration: 6000,
                        isClosable: true,
                    })

                } else {
                    toast({
                        title: "Error.",
                        description: "Ha habido un error al crear un nuevo paciente.",
                        status: "error",
                        duration: 6000,
                        isClosable: true,
                    })
                }
            })

    }

    return (
        <>
            <Button

                p='2'
                onClick={onOpen}
                color="white"
                fontWeight="bold"
                borderRadius="md"
                bgGradient="linear(to-l, teal.500, teal.700)"
                _hover={{
                    bgGradient: "linear(to-r, red.500, yellow.500)",
                }}
            >
                <AddIcon ml="4" />
                <Text m='2' fontSize='md'>NuevoPaciente</Text>
            </Button>
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
                            <DrawerHeader>Crear Nuevo Paciente</DrawerHeader>

                            <DrawerBody>
                                <Stack spacing={1}>

                                    <FormControl isRequired>
                                        <FormLabel>Nombre</FormLabel>
                                        <Input ref={firstField} onChange={e => setPacient({ ...pacient, ...{ nombre: `${e.target.value}` } })} />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Apellido</FormLabel>
                                        <Input onChange={e => setPacient({ ...pacient, ...{ apellido: `${e.target.value}` } })} />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Nº Documento</FormLabel>
                                        <Input onChange={e => setPacient({ ...pacient, ...{ dni: `${e.target.value}` } })} />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Fecha de Nacimiento</FormLabel>
                                        <FormHelperText> DD/MM/AAAA</FormHelperText>
                                        <Input onChange={e => setPacient({ ...pacient, ...{ nacimiento: `${e.target.value}` } })} />
                                    </FormControl>
                                    <FormControl >
                                        <FormLabel>Sexo</FormLabel>
                                        <RadioGroup pb={4}>
                                            <Stack direction="row" justifyContent='space-around'>
                                                <Radio value="Masculino" onChange={e => setPacient({ ...pacient, ...{ sexo: `${e.target.value}` } })}>Masculino</Radio>
                                                <Radio value="Femenino" onChange={e => setPacient({ ...pacient, ...{ sexo: `${e.target.value}` } })}>Femenino</Radio>
                                                <Radio value="Prefiero no decirlo" onChange={e => setPacient({ ...pacient, ...{ sexo: `${e.target.value}` } })}>Prefiero no decirlo</Radio>
                                            </Stack>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel> Estado Civil </FormLabel>
                                        <Input onChange={e => setPacient({ ...pacient, ...{ estado_civil: `${e.target.value}` } })} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel> Nacionalidad </FormLabel>
                                        <Input onChange={e => setPacient({ ...pacient, ...{ nacionalidad: `${e.target.value}` } })} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel> Dirección </FormLabel>
                                        <Input onChange={e => setPacient({ ...pacient, ...{ domicilio: `${e.target.value}` } })} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel> Telefono </FormLabel>
                                        <Input onChange={e => setPacient({ ...pacient, ...{ telefono: `${e.target.value}` } })} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel> Obra Social </FormLabel>
                                        <Input onChange={e => setPacient({ ...pacient, ...{ obra_social: `${e.target.value}` } })} />
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
