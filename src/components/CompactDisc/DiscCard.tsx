import React from 'react';
import { useNavigate } from 'react-router-dom';

export interface DiscCardProps {
  disc: {
    id: string;
    name: string;
    creationDate: string;
    retailPrice: number;
    whosalerPrice: number;
    manufacturingCompanyName: string;
    countInStock:number;
    musicId: string;
  };
}

const DiscCard: React.FC<DiscCardProps> = ({ disc }) => {
   const navigate = useNavigate();

  const handleViewMusic = async () => {
    try {
      // Отправляем запрос на сервер для получения музыкального произведения по ID компакт-диска
      const response = await fetch(`https://localhost:7204/api/MusicCard/Get/${disc.musicId}`);
      const musicData = await response.json();

      // После успешного получения данных, переходим на страницу с музыкальным произведением
      navigate(`/music/${musicData.id}`);
    } catch (error) {
      console.error('Error fetching music data', error);
    }
  };

  return (
    <div className="disc-card">
      <h3>{disc.name}</h3>
      <p>Дата создания: {disc.creationDate}</p>
      <p>Розничная цена: {disc.retailPrice}$</p>
      <p>Оптовая цена: {disc.whosalerPrice}$</p>
      <p>Производитель: {disc.manufacturingCompanyName}</p>
      <p>Количество на складе: {disc.countInStock}</p>
      <button onClick={handleViewMusic}>Посмотреть музыкальное произведение</button>
    </div>
  );
};

export default DiscCard;
