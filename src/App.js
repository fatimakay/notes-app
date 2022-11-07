import './App.css';
import { Route, Routes, BrowserRouter, HashRouter } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
  

function App() {
  return (
    <div className="App">
      <HashRouter>
    <Routes>
      <Route  path="/" element={<Login/>}></Route>
      <Route  path="/register" element={<Register/>}></Route>
      <Route  path="/home" element={<Home/>}></Route>
    </Routes>
    </HashRouter>
    </div>
  );
}

export default App;
