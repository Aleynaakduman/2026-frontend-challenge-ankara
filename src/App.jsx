import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Container from '@mui/material/Container';
import Dashboard from './pages/Dashboard';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Container>
          <Dashboard />
      </Container>



    </>
  )
}

export default App
