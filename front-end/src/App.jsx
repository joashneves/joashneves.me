import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Projetos from './pages/Projetos'
import Links from './pages/Links'
import PostContent from './pages/PostContent'
import Login from './pages/Admin/Login'
import Painel from './pages/Admin/Painel'
import Navbar from './components/Navbar'
import Footer from './components/footer/Footer'
import './App.css'
import Post from './pages/Post'
import ProtectedRoute from './components/Admin/ProtectedRoute'

function App() {
  return (
    <Router>
      <div className="App" style={{ display: 'flex', minHeight: '100vh' }}>
        <Navbar /> 
        
        <div style={{ flex: 1, marginLeft: '200px', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <main style={{ flex: 1, width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '1rem' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projetos" element={<Projetos />} />
              <Route path="/links" element={<Links />} />
              <Route path='/post' element={<Post />} />
              <Route path="/post/:slug" element={<PostContent />} />
              <Route path="/adm/logar" element={<Login />} />
              <Route
                path="/adm/painel"
                element={
                  <ProtectedRoute requiredRole="MASTER">
                    <Painel />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  )
}

export default App
