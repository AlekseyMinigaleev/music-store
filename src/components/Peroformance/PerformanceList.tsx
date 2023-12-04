import React, { useEffect, useState } from 'react';
import Performance from './Performance';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';


const PerformanceList: React.FC = () => {
  const { musicId } = useParams(); // Получение параметра из URL
  const [performances, setPerformances] = useState<any[]>([]);

  useEffect(() => {
    const fetchPerformances = async () => {
      try {
        const response = await axios.get(`https://localhost:7204/api/Performance/GetList/${musicId}`);
        setPerformances(response.data);
      } catch (error) {
        console.error('Error fetching performances', error);
      }
    };

    fetchPerformances();
  }, [musicId]);

  return (
    <div className="performance-list">
      <h2>Варианты исполнения</h2>
      {performances.map((performance) => (
        <Performance key={performance.id} performance={performance} />
      ))}
      <Link to="/music">Вернуться назад</Link>
    </div>
  );
};

export default PerformanceList;
