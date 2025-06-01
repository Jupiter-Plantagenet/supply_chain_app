import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const listProducts = async () => {
  const res = await axios.get(`${API_URL}/products`);
  return res.data;
};

export const addProduct = async (name, origin) => {
  const res = await axios.post(`${API_URL}/products`, { name, origin });
  return res.data;
};

export const getProduct = async (id) => {
  const res = await axios.get(`${API_URL}/products/${id}`);
  return res.data;
};

export const getHistory = async (id) => {
  const res = await axios.get(`${API_URL}/products/${id}/history`);
  return res.data;
};

export const updateStatus = async (id, status) => {
  const res = await axios.post(`${API_URL}/products/${id}/status`, { status });
  return res.data;
};

export const transferOwnership = async (id, newOwner) => {
  const res = await axios.post(`${API_URL}/products/${id}/transfer`, { newOwner });
  return res.data;
};
