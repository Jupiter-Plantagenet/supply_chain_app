import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct, getHistory, updateStatus, transferOwnership } from '../services/api';
import { Box, Heading, Text, Spinner, FormControl, FormLabel, Input, Button, VStack, List, ListItem } from '@chakra-ui/react';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [history, setHistory] = useState([]);
  const [status, setStatus] = useState('');
  const [newOwner, setNewOwner] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const p = await getProduct(id);
        setProduct(p);
        const hist = await getHistory(id);
        setHistory(hist);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const handleStatus = async (e) => {
    e.preventDefault();
    try {
      await updateStatus(id, Number(status));
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    try {
      await transferOwnership(id, newOwner);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Box p={4}><Spinner size="xl" /></Box>;
  if (!product) return <Box p={4}><Text>Product not found.</Text></Box>;

  return (
    <Box p={4} maxW="lg" mx="auto">
      <Heading mb={4}>Product Detail - #{product.id}</Heading>
      <Text><strong>Name:</strong> {product.name}</Text>
      <Text><strong>Origin:</strong> {product.origin}</Text>
      <Text><strong>Owner:</strong> {product.owner}</Text>
      <Text><strong>Status:</strong> {product.status}</Text>
      <Text><strong>Timestamp:</strong> {new Date(product.timestamp * 1000).toLocaleString()}</Text>

      <Heading size="md" mt={6} mb={2}>Update Status</Heading>
      <VStack as="form" onSubmit={handleStatus} spacing={3} align="flex-start">
        <FormControl id="status" isRequired>
          <FormLabel>Status</FormLabel>
          <Input type="number" value={status} onChange={(e) => setStatus(e.target.value)} />
        </FormControl>
        <Button type="submit" colorScheme="teal" size="sm">Update</Button>
      </VStack>

      <Heading size="md" mt={6} mb={2}>Transfer Ownership</Heading>
      <VStack as="form" onSubmit={handleTransfer} spacing={3} align="flex-start">
        <FormControl id="newOwner" isRequired>
          <FormLabel>New Owner</FormLabel>
          <Input placeholder="New owner address" value={newOwner} onChange={(e) => setNewOwner(e.target.value)} />
        </FormControl>
        <Button type="submit" colorScheme="teal" size="sm">Transfer</Button>
      </VStack>

      <Heading size="md" mt={6} mb={2}>History</Heading>
      <List spacing={2}>
        {history.map((h, idx) => (
          <ListItem key={idx}>
            <Text>#{h.id} | Status: {h.status} | Owner: {h.owner} | Time: {new Date(h.timestamp * 1000).toLocaleString()}</Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
