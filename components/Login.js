import React, { useState } from 'react'
import { Box, Text, Container, Input, Stack, Divider, Center, Image, Heading } from "@chakra-ui/react";
import cookie from 'js-cookie'
import { signIn } from 'next-auth/client';


const Login = (loading) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Container pt='20' >
            <Center pb='12'><Image boxSize={[75]} src="/CaseHistory-Logo.png" />
                <Heading as="h1" size="lg" letterSpacing={"-.1rem"} bgGradient="linear(to-r,blue.400, teal.500)" bgClip="text" p={2} >
                    Case History
                    </Heading>
            </Center>
            <Stack spacing={8} direction="column" >
                <Input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" p="6" />
                <Input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" p="6" />
                <Box
                    as="button"

                    p={4}
                    color="white"
                    fontWeight="bold"
                    borderRadius="md"
                    bgGradient="linear(to-r, teal.500,green.500)"
                    _hover={{
                        bgGradient: "linear(to-r, red.500, yellow.500)",
                    }}
                >
                    Log-In
                    </Box>
                <Box
                    as="button"
                    onClick={(e) => {
                        e.preventDefault()
                        loading = true
                        signIn()
                    }}
                    p={4}
                    color="white"
                    fontWeight="bold"
                    borderRadius="md"
                    bgGradient="linear(to-r, teal.500,green.500)"
                    _hover={{
                        bgGradient: "linear(to-r, red.500, yellow.500)",
                    }}
                >
                    Log-In with Google
                    </Box>
            </Stack>
            <Divider my="4" />
            <Stack spacing={8} direction="column" >
                <Center><Text textColor="gray.500" fontSize={{ base: 'sm', md: 'lg' }}> ¿Todavía no tenes una cuenta? </Text></Center>
                <Box
                    as="button"
                    p={4}
                    color="white"
                    fontWeight="bold"
                    borderRadius="md"
                    bgGradient="linear(to-r, teal.500,green.500)"
                    _hover={{
                        bgGradient: "linear(to-r, red.500, yellow.500)",
                    }}
                >
                    Registrate
                    </Box>
            </Stack>
        </Container>
    );
};
export default Login;