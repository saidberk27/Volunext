import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import MapPage from './pages/MapPage';
import LeaderboardPage from './pages/LeaderboardPage';
import AlgorithmsPage from './pages/AlgorithmsPage';
import TopSupportersPage from './pages/TopSupportersPage';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/app" element={<Layout />}>
          <Route index element={<Navigate to="/app/home" replace />} />
          <Route path="home" element={<HomePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="map" element={<MapPage />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
          <Route path="algorithms" element={<AlgorithmsPage />} />
          <Route path="supporters" element={<TopSupportersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
