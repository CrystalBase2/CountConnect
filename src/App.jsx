import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Route
import { QueryClient, QueryClientProvider } from 'react-query';
import store from './components/Features/Redux/store';
import { Provider } from 'react-redux'

import Login from './components/Login';
import Registration from './components/Registration';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import { AuthContextProvider } from './components/Features/auth/AuthContext';
import ProtectedRoutes from './components/Features/auth/ProtectedRoutes';

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/dashboard/*" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
            </Routes>
          </Router>
        </QueryClientProvider>
      </AuthContextProvider>
    </Provider>
  );
}

export default App;