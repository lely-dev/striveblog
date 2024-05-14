import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageHome } from './Components/PageStriveBlog/PageHome/PageHome';
import PageBlog from "./Components/PageStriveBlog/PageBlog/PageBlog.jsx"
import PageLogin from './Components/PageStriveBlog/PageLogin/PageLogin.jsx';
import MePage from './Components/PageStriveBlog/MePage/MePage.jsx';
import NewBlog from './Components/PageStriveBlog/NewBlog/NewBlog.jsx';
import AuthUserProvider from './Context/AuthUserProvider.jsx';
import GetBlogProvider from './Context/GetBlogProvider.jsx';
import GetAuthorsProvider from './Context/GetAuthorsProvider.jsx';


function App() {
  return (
    <>
    <AuthUserProvider>
      <GetAuthorsProvider>
        <GetBlogProvider>
    <BrowserRouter>
    <Routes>
    <Route  path='/' element={<PageLogin />} />
      <Route  path='/home' element={<PageHome />} />
      <Route path='/blog/:id' element={<PageBlog />} />
      <Route path='/me' element={<MePage />} />
      <Route path='/new' element={<NewBlog />} />
    </Routes>
    </BrowserRouter>
    </GetBlogProvider>
    </GetAuthorsProvider>
    </AuthUserProvider>
    </>
  );
}

export default App;
