import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from "./components/layout/Navbar"


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={
          <div className='flex flex-col justify-between h-screen'>
            <Navbar />
            <main>Content</main>
          </div>
          }>
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
