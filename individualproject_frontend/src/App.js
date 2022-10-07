import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import{Route, Routes, BrowserRouter as Router} from "react-router-dom";
import UsersPage from './pages/UsersPage.js';
import NavBar from './components/NavBar';
import InputUser from './components/InputUser';
/**
 return (
    <div className="App">
      <Router>
      <NavBar>
        <Routes>
          <Route path="/UsersPage" element={<UsersPage />} />
          <Route path="/Add user" element={<InputUser />} />
        </Routes>
        </NavBar>
        <UsersPage></UsersPage>
      </Router>
    </div>
  ); 
 */

function App() {
  return(
    <div className="App">
      <NavBar/>
      <UsersPage/>
    </div>
  )
}

export default App;

