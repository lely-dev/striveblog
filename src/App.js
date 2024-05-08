import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageHome } from './Components/PageStriveBlog/PageHome/PageHome';
import PageBlog from "./Components/PageStriveBlog/PageBlog/PageBlog.jsx"
import PageLogin from './Components/PageStriveBlog/PageLogin/PageLogin.jsx';


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route  path='/' element={<PageLogin />} />
      <Route  path='/home' element={<PageHome />} />
      <Route path='/blog/:id' exact element={<PageBlog />} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
