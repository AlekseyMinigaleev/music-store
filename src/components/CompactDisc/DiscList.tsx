// src/components/DiscList.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DiscCard from './DiscCard';

interface Disc {
  id: string;
  name: string;
  creationDate: string;
  retailPrice: number;
  whosalerPrice: number;
  manufacturingCompanyName: string;
  countInStock:number;
  musicId: string;
}

function DiscList() {
  const [discList, setDiscList] = useState<Disc[]>([]);

  useEffect(() => {
    const fetchDiscList = async () => {
      try {
        const response = await axios.get('https://localhost:7204/api/CompactDisk/List');
        setDiscList(response.data);
      } catch (error) {
        console.error('Error fetching disc list', error);
      }
    };

    fetchDiscList();
  }, []);

  return (
    <div>
      <h2>Компакт-диски</h2>
      <div className="disc-card">
        {discList.map((disc) => (
          <DiscCard key={disc.id} disc={disc} />
        ))}
      </div>
    </div>
  );
}

export default DiscList;
