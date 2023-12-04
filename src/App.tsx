import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import MusicList from './components/musicCard/MusicList';
import DiscList from './components/CompactDisc/DiscList';
import PerformanceList from './components/Peroformance/PerformanceList';
import CompactDiskPage from './components/CompactDisc/CompactDiskPage'; // Добавляем новую страницу
import MusicCardPage from './components/musicCard/MusicCardPage';
import CreateMusicCardPage from './components/musicCard/CreateMusicCardPage';
import EditMusicCardPage from './components/musicCard/EditMusicCardpage';
import CreateCompactDiskPage from './components/musicCard/CreateCompactDiscPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/music" element={<MusicList />} />
          <Route path="/discs" element={<DiscList />} />
          <Route path="/performance/:musicId" element={<PerformanceList />} />
          <Route path="/compactDisk/:musicId" element={<CompactDiskPage />} />
          <Route path="/music/:musicId" element={<MusicCardPage />} />
          <Route path="/create-music-card" element={<CreateMusicCardPage />} />
          <Route path="/editMusicCard/:musicId" element={<EditMusicCardPage />} />
          <Route path="/createCompactDisk/:musicId" element={<CreateCompactDiskPage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
