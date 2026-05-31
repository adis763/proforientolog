import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Expert from './components/Expert'
import Method from './components/Method'
import Services from './components/Services'
import Testimonials from './components/Testimonials'
import Quiz from './components/Quiz'
import Contacts from './components/Contacts'
import Materials from './components/Materials'
import Admin from './pages/Admin'

function Landing() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Expert />
        <Method />
        <Services />
        <Testimonials />
        <Quiz />
        <Contacts />
        <Materials />
      </main>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}
