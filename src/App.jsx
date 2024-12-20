import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Navbar from './Pages/Home/components/Navbar'
import AboutUs from './Pages/About/AboutUs'
import WhatWedo from './Pages/What we do/WhatWedo'
import Events from './Pages/Events/Events'
import Media from './Pages/Media/Media'
import FirstLego from './Pages/FirstLego/FirstLego'
import Couch from './Pages/Couch/Couch'
import Register from './Pages/Form/Register'
function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<AboutUs />} />
        <Route exact path="/what we do" element={<WhatWedo />} />
        <Route exact path="/events" element={<Events />} />
        <Route exact path="/media" element={<Media />} />
        <Route exact path="/first lego" element={<FirstLego />} />
        <Route exact path="/couch" element={<Couch />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
