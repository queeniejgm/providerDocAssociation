import './App.css';
import Login from './components/Login';
import Main from './components/Main';
import{Link, Routes, Route, Navigate} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/main' element={<Main/>}/>
      </Routes>
    </div>
  );
}

export default App;
