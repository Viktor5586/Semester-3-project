import './App.css';
import{Route, Routes, BrowserRouter as Router} from "react-router-dom";
import UsersPage from './pages/UsersPage.js';
import NavBar from './components/NavBar';


function App() {
  return (
    <div className="App">
      <Router>
      <NavBar>
        <Routes>
          <Route path="/" element={<UsersPage />} />
        </Routes>
        </NavBar>
      </Router>
    </div>
  );
}

export default App;

