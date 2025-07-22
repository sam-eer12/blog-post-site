import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Layout from './pages/admin/layout'
import Dashboard from './pages/admin/dashboard'
import Addblog from './pages/admin/Addblog'
import Listblog from './pages/admin/Listblog'
import Comments from './pages/admin/Comments'
import Login from './components/admin/Login'
import 'quill/dist/quill.snow.css'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path='/admin' element={true? <Layout /> : <Login />} >
          <Route index element={<Dashboard />} />
          <Route path='addBlog' element={<Addblog />} />
          <Route path='listBlog' element={<Listblog />} />
          <Route path='comments' element={<Comments />} />

        </Route>
      </Routes>
    </div>
  )
}

export default App;
