import HomeSection from '../components/home/index.jsx'
import About from '../components/about/index.jsx'
import Projects from '../components/projects/index.jsx'
import Services from '../components/services/index.jsx'
import Contact from '../components/contact/index.jsx'
import Footer from '../components/footer/index.jsx'

export default function Home() {
  return (
    <>
      <HomeSection />
      <About />
      <Projects />
      <Services />
      <Contact />
      <Footer />
    </>
  )
}