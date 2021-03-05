import React, { useState } from "react";
import { Button, Text, Container, Input, Stack, Heading, Box } from "@chakra-ui/react";
import { signIn, signOut, useSession } from 'next-auth/client'
import Header from '../components/Header'
import Footer from '../components/Footer'


const Profile = () => {
    const [session, loading] = useSession()

    return (
        <Box h='100vh'>
            <Header />

            <Container p='36' minW='80%'>
                {Object.entries(session.user).map(k => (
                    <Stack direction='row'>
                        <Text fontSize='xl'> {k[0]}: {k[1]}</Text>
                    </Stack>
                )
                )}

                <Heading pt='36'> Esta página esta en construccion por el momento...</Heading>
                <Heading py='8'>... pero hay mucho potencial, si tenes alguna idea, mencionamela personalmente.</Heading>
                <p> Gracias por tu aporte! Mati :) </p>
            </Container>
            <Footer />
        </Box>
    )
}

export default Profile;