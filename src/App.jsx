import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar/Navbar.jsx'
import Home from './pages/Home.jsx'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  )
}

export default App