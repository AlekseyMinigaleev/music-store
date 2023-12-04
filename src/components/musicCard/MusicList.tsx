import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MusicCard from './MusicCard';

interface Music {
  id: string;
  musicName: string;
  genre: string;
  author: string;
  performanceCount: number;
}



function MusicList() {
  const [musicList, setMusicList] = useState<Music[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [musicResponse] = await Promise.all([
          axios.get('https://localhost:7204/api/MusicCard/list'),
        ]);

        setMusicList(musicResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Музыкальные произведения</h2>
      <div className="music-cards">
        {musicList.map((music) => (
          <MusicCard key={music.id} music={music} />
        ))}
      </div>
    </div>
  );
}

export default MusicList;
