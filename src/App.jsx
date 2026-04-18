
import './App.css'
import Navbar from './components/Navbar'
import Container from '@mui/material/Container';
import Dashboard from './pages/Dashboard';
function App() {
  

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
