import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import WorkoutContextProvider from './contexts/WorkoutContext';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <WorkoutContextProvider>
          <Navbar />
          <div className="pages">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </div>
        </WorkoutContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;