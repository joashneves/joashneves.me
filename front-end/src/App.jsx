import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Projetos from './pages/Projetos'
import Links from './pages/Links'
import Post from './pages/Post'
import Login from './pages/Admin/Login'
import Painel from './pages/Admin/Painel'
import Navbar from './components/Navbar'
import Footer from './components/footer/Footer'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projetos" element={<Projetos />} />
            <Route path="/links" element={<Links />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/adm/logar" element={<Login />} />
            <Route path="/adm/painel" element={<Painel />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
