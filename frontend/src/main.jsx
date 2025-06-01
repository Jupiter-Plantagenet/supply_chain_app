import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Web3Provider } from './context/Web3Context'
import { ChakraProvider } from '@chakra-ui/react'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <StrictMode>
      <Web3Provider>
        <App />
      </Web3Provider>
    </StrictMode>
  </ChakraProvider>,
)
