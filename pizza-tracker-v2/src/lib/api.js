import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const getOptions = async () => {
  const { data } = await api.get('/api/options')
  return data
}

export const createOrder = async (orderData) => {
  const { data } = await api.post('/api/orders', orderData)
  return data
}

export const getOrder = async (orderId) => {
  const { data } = await api.get(`/api/orders/${orderId}`)
  return data
}

export const updateOrderStatus = async (orderId, status) => {
  const { data } = await api.patch(`/api/admin/orders/${orderId}/status`, { status })
  return data
}

export default api
