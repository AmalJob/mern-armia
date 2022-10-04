
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/login/Login';
import SignUp from './components/SignUp';
function App() {
  
  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Header/>} ></Route>
      <Route path='/login' element={<Login/>} ></Route>
      <Route path='/register' element={<SignUp/>} ></Route>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
