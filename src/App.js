import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageHome } from './Components/PageStriveBlog/PageHome/PageHome';
import PageBlog from "./Components/PageStriveBlog/PageBlog/PageBlog.jsx"
import PageLogin from './Components/PageStriveBlog/PageLogin/PageLogin.jsx';
import MePage from './Components/PageStriveBlog/MePage/MePage.jsx';
import NewBlog from './Components/PageStriveBlog/NewBlog/NewBlog.jsx';
import AuthUserProvider from './Context/AuthUserProvider.jsx';


function App() {
  return (
    <>
    <AuthUserProvider>
    <BrowserRouter>
    <Routes>
    <Route  path='/' element={<PageLogin />} />
      <Route  path='/home' element={<PageHome />} />
      <Route path='/blog/:id' element={<PageBlog />} />
      <Route path='/me' element={<MePage />} />
      <Route path='/new' element={<NewBlog />} />
    </Routes>
    </BrowserRouter>
    </AuthUserProvider>
    </>
  );
}

export default App;
