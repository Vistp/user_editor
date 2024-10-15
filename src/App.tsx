import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import MainPage from "./pages/MainPage";
import UserProfilePage from "./pages/UserProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/profile/:id' element={<UserProfilePage />} />
      </Routes>
    </Router>
  )
}

export default App;
