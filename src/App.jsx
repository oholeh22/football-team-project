import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Team from './components/Team/Team';
import './App.css'; 

export default function App() {
  return (
    <Router>
      <Header />

      <main>
        <Routes>
          <Route path="/team" element={<Team />} />
        </Routes>
      </main>
    </Router>
  );
}
