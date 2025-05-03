import React from 'react';
import PersonalityQuiz from './pages/PersonalityQuiz';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<PersonalityQuiz />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;