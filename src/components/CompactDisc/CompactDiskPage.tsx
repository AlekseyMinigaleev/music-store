import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DiscCard from './DiscCard';

const CompactDiskPage: React.FC = () => {
  const { musicId } = useParams();
  const [compactDisk, setCompactDisk] = useState<any>({});

  useEffect(() => {
    const fetchCompactDisk = async () => {
      try {
        const response = await axios.get(`https://localhost:7204/api/CompactDisk/Get/${musicId}`);
        setCompactDisk(response.data);
      } catch (error) {
        console.error('Error fetching compact disk', error);
      }
    };

    fetchCompactDisk();
  }, [musicId]);

  return (
    <div className="compact-disk-page">
      <DiscCard disc={{
           id: compactDisk.id,
           name: compactDisk.name,
           creationDate: compactDisk.creationDate,
           retailPrice: compactDisk.retailPrice,
           whosalerPrice: compactDisk.whosalerPrice,
           manufacturingCompanyName: compactDisk.manufacturingCompanyName,
           musicId: compactDisk.musicId,
           countInStock: compactDisk.countInStock
        }}/>
    </div>
  );
};

export default CompactDiskPage;
