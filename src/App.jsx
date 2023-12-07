import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Route
import { QueryClient, QueryClientProvider } from 'react-query';
import store from './Features/Redux/store';
import { Provider } from 'react-redux'

import Login from './components/Login';
import Registration from './components/Registration';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import BusFeed from "./components//SubPages/BusFeed";


const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
