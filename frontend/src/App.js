import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import WorkoutContextProvider from './contexts/WorkoutContext';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <WorkoutContextProvider>
          <Navbar />
          <div className="pages">
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
            </Routes>
          </div>
        </WorkoutContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;