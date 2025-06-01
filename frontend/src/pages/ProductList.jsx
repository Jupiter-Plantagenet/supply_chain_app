import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { listProducts } from '../services/api';
import { Box, Heading, List, ListItem, Spinner, Text, Link } from '@chakra-ui/react';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      try {
        const data = await listProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  if (loading) return <Box p={4}><Spinner size="xl" /></Box>;
  if (!products.length) return <Box p={4}><Text>No products found.</Text></Box>;

  return (
    <Box p={4}>
      <Heading size="lg" mb={4}>Products</Heading>
      <List spacing={3}>
        {products.map(p => (
          <ListItem key={p.id}>
            <Link as={RouterLink} to={`/product/${p.id}`} color="teal.500">
              {p.name} (#{p.id})
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
