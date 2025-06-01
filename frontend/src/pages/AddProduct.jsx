import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../services/api';
import { Box, Heading, FormControl, FormLabel, Input, Button, VStack } from '@chakra-ui/react';

export default function AddProduct() {
  const [name, setName] = useState('');
  const [origin, setOrigin] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addProduct(name, origin);
      navigate('/');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={4} maxW="md" mx="auto">
      <Heading mb={4}>Add Product</Heading>
      <VStack as="form" onSubmit={handleSubmit} spacing={4} align="stretch">
        <FormControl id="name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <FormControl id="origin" isRequired>
          <FormLabel>Origin</FormLabel>
          <Input value={origin} onChange={(e) => setOrigin(e.target.value)} />
        </FormControl>
        <Button type="submit" colorScheme="teal" isLoading={loading}>
          {loading ? 'Adding...' : 'Add'}
        </Button>
      </VStack>
    </Box>
  );
}
