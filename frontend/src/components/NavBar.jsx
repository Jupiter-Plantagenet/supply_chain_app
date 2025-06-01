import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useContext } from 'react';
import { Web3Context } from '../context/Web3Context';
import { Box, Flex, Heading, HStack, Button, Link } from '@chakra-ui/react';

export default function NavBar() {
  const { account, connectWallet } = useContext(Web3Context);

  return (
    <Box bg="blue.800" color="white" px={4} py={2}>
      <Flex align="center" justify="space-between">
        <Heading size="md">Supply Chain Tracker</Heading>
        <HStack spacing={6} align="center">
          <HStack as="nav" spacing={4}>
            <Link as={RouterLink} to="/">Home</Link>
            <Link as={RouterLink} to="/add">Add Product</Link>
          </HStack>
          <Button colorScheme="teal" variant="outline" size="sm" onClick={connectWallet}>
            {account ? `${account.slice(0,6)}...${account.slice(-4)}` : 'Connect Wallet'}
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}
