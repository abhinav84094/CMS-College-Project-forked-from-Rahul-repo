import { useState } from 'react'
import AuthProvider from './context/Auth_context.jsx'
import SideBar from './components/SideBar.jsx'
import {Routes, Route, Navigate} from 'react-router-dom';
import LogIn from './components/LogIn.jsx';
import SignUp from './components/SignUp.jsx';
import ViewContent from './components/ViewContent.jsx';
import AddContent from './components/AddContent.jsx';
import EditContent from './components/EditContent.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import ContentProvider from './context/Content_context.jsx';
import Comment from './components/Comment.jsx';
import ViewComment from './components/ViewComment.jsx';
import './App.css'





function App() {

  return (
    <AuthProvider>
      <ContentProvider>
        <div className='flex flex-col items-center justify-center'>
          <div className=''>
          <SideBar  />
          </div>
          <main className='flex flex-col justify-center items-center w-[100vw]'>
            <Routes>
              <Route path='/' element={<Navigate to="/login" replace />} />
              <Route path='/login' element={<LogIn />} />
              <Route path='/signUp' element={<SignUp />} />
              <Route path='/view/:me' element={<ViewContent />} />
              <Route path='/view' element={<ViewContent />} />

              <Route path='/add' element={<PrivateRoute>
                <AddContent />
              </PrivateRoute>} />
              <Route path='/edit/:id' element={<PrivateRoute>
                <EditContent />
              </PrivateRoute>} />

              <Route path='/comment/:commenter/:id' element={<PrivateRoute>
                <Comment />
              </PrivateRoute>} />

              <Route path='/viewComment/:id' element={<PrivateRoute>
                <ViewComment />
              </PrivateRoute>} />

            </Routes>
          </main>
        </div>
      </ContentProvider>
    </AuthProvider>
  )
}

export default App
