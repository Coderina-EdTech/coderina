import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Navbar from './Pages/Home/components/Navbar'
import AboutUs from './Pages/About/AboutUs'
function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<AboutUs />} />
      </Routes>
    </Router>
  )
}

export default App
