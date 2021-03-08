import React from "react";
import {
  Box, Heading, Flex, Text, Button, Spacer, useColorMode, Switch, Menu,
  MenuButton,
  MenuList,
  MenuItem,
  cookieStorageManager,
  useColorModeValue,
  Image,
  MenuDivider,
  Stack,
  Wrap, WrapItem, Avatar
} from "@chakra-ui/react";
import cookie from 'js-cookie'
import { ChevronDownIcon, ChevronUpIcon, LockIcon, SettingsIcon } from "@chakra-ui/icons";
import { useSession, signOut, signout } from "next-auth/client";
import { useRouter } from "next/router";

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

const SingedOut = () => {
  return (
    <Button bg="transparent" border="1px">
      About Us
    </Button>
  );
}

const SingedIn = () => {
  const [session, loading] = useSession()
  const router = useRouter()
  return (
    <Menu>
      {({ isOpen }) => (
        <Stack direction='row'>
          <Avatar size='sm' alignSelf='center' src={session.user.image} />
          <MenuButton alignSelf='center' p={[2, 4, 6]} as={Button} color='white' bgGradient='linear(to-l, teal.700, teal.600)' _hover={{
            bgGradient: "linear(to-r, yellow.500, orange.400)",
          }} _expanded={{
            bgGradient: "linear(to-r, yellow.400, orange.500)",
          }}>
            {session.user.name} {isOpen ? <ChevronDownIcon boxSize={5} /> : <ChevronUpIcon boxSize={5} />}
          </MenuButton>
          <MenuList>
            <MenuItem > <SettingsIcon mx='4' /> Settings </MenuItem>
            {/* onClick={() => router.push('/profile')}  */}
            <MenuDivider />
            <MenuItem onClick={(e) => {
              e.preventDefault()
              signOut({ callbackUrl: '/login' })
            }}
            ><LockIcon mx='4' /> LogOut</MenuItem>
          </MenuList>
        </Stack>
      )}
    </Menu>
  );
}
// Note: This code could be better, so I'd recommend you to understand how I solved and you could write yours better :)
const Header = props => {
  const [session, loading] = useSession()
  const router = useRouter()

  return (
    <Flex
      as="nav"
      zIndex='50'
      minWidth="100%"
      h='8vh'
      minH='20'
      align="center"
      justify="space-between"
      alignContent='center'
      wrap="wrap"
      padding="1rem"
      bg="teal.500"
      bgGradient="linear(to-t, teal.500, green.600)"
      {...props}
    >
      <Flex align="center" ml={[2, 4, 8]} cursor='pointer' onClick={() => router.push('/')}>
        <Image boxSize={[0, 50]} src="/CaseHistory-Logo.png" />
        <Heading as="h1" fontSize={{ lg: '2xl', base: 'xl', md: 'lg', sm: 'md' }} letterSpacing={"-.1rem"} bgGradient="linear(to-r,blue.700, teal.700)" bgClip="text" p={2} >
          Case History
        </Heading>
      </Flex>
      <Spacer />

      <Box>
        {!session ? <SingedOut /> : <SingedIn />}
      </Box>

    </Flex>
  );
};

export default Header;
