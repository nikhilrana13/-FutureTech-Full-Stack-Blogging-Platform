import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import { Toaster } from 'react-hot-toast'
import VerifyEmailOtp from './components/VerifyEmailOtp.jsx'
import VerifyLoginUserEmail from './components/VerifyLoginUserEmail.jsx'
import BlogAddForm from './components/BlogAddForm.jsx'
import EditBlog from './components/EditBlog.jsx'
import EachBlogDetail from './components/EachBlogDetail.jsx'
import News from './pages/News.jsx'
import ProtecedRoute from './middleware/ProtecedRoute.jsx'



function App() {


  return (
    <div className="app">
      <Routes>
        {/* authentication routes */}
        <Route path="/" element={<Home />} />
        <Route path='/news'element={<News />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/verifyemail' element={<VerifyEmailOtp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/verifylogin' element={<VerifyLoginUserEmail />} />

        {/* blog routes */}
        <Route path='/addblog' element={<ProtecedRoute><BlogAddForm /></ProtecedRoute>} />
         <Route path='/blog/:id' element={<EachBlogDetail />} />
        <Route path='/editblog/:id' element={<EditBlog />} />
       
      </Routes>
      <Toaster />

    </div>
  )
}

export default App
