import React from "react";
import { Box, Heading, Flex, Text, Button, Spacer, useColorMode, Switch, useColorModeValue, Icon } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

function DarkMode() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Button p={4} onClick={toggleColorMode} size="md" bg="transparent" _hover="border" >
      {colorMode === "light" ? <MoonIcon boxSize={6} /> : <SunIcon boxSize={6} />}
    </Button>
  )
}
// Note: This code could be better, so I'd recommend you to understand how I solved and you could write yours better :)
const Footer = props => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Flex
      as="footer"
      minWidth="100%"
      flexGrow={1}
      position='fixed'
      bottom='0'
      minH="12px"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg='tranparent'
      // bgGradient={useColorModeValue("linear(to-b, gray.100, teal.500)","linear(to-b, gray.800, gray.500)")}
      {...props}
    >
      <Flex align="bottom" mr={10}>
      </Flex>
      <Spacer />
      <Box
        display={{ sm: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <DarkMode />
      </Box>
    </Flex>
  );
};

export default Footer;
