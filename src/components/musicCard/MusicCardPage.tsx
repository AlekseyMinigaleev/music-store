import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import MusicCard from './MusicCard';

interface MusicCardPageProps {}

const MusicCardPage: React.FC<MusicCardPageProps> = () => {
  const { musicId } = useParams();
  const [music, setMusic] = useState({
    id: '',
    musicName: '',
    genre: '',
    author: '',
    performanceCount: 0,
  });

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const response = await axios.get(`https://localhost:7204/api/MusicCard/Get/${musicId}`);
        setMusic(response.data);
      } catch (error) {
        console.error('Error fetching music data', error);
      }
    };

    fetchMusic();
  }, [musicId]);

  return (
   <div>
      <MusicCard music={{
           id: music.id,
           musicName: music.musicName,
           genre: music.genre,
           author: music.author,
           performanceCount:music.performanceCount
        }}/>
   </div>
  );
};

export default MusicCardPage;
